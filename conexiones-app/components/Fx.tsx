"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  All motion lives here. One signature animation: el hilo.
  Everything else is the quiet layer: masked title lines, 24px rises, image settles.
  With prefers-reduced-motion the thread renders fully drawn and every state is instant.

  El hilo nunca pasa por encima de ningun elemento. En vez de una curva fija,
  la ruta se calcula midiendo la pagina: el hilo baja por los margenes
  exteriores y solo cruza por los huecos reales entre secciones. Asi es
  correcto en cualquier ancho de pantalla, no solo en los que probamos.
*/

const MARGIN_L = 2;
const MARGIN_R = 98;
const CLEAR = 10; // px de aire alrededor de cada elemento

/*
  Posicion final del elemento, no la que tiene mientras se revela.
  Los bloques con data-rc entran desplazados 24px; si midieramos eso,
  creeriamos que hay un hueco donde en realidad va a haber texto.
*/
function settledBounds(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  let dy = 0;
  const moved = el.closest<HTMLElement>("[data-rc], [data-line-inner]");
  if (moved) {
    const tr = getComputedStyle(moved).transform;
    if (tr && tr !== "none") {
      try {
        dy = new DOMMatrixReadOnly(tr).f;
      } catch {
        dy = 0;
      }
    }
  }
  return { top: r.top + window.scrollY - dy, bottom: r.bottom + window.scrollY - dy };
}

type Box = { t: number; b: number; l: number; r: number };

function contentBoxes(): Box[] {
  const sel =
    "main h1, main h2, main h3, main p, main dl, main a, main img, main blockquote, main iframe, footer p, footer nav";
  const out: Box[] = [];
  document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    // El fondo del hero es decorativo: el hilo puede pasar por delante.
    if (el.tagName === "IMG" && el.closest("#hero")) return;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    const b = settledBounds(el);
    out.push({ t: b.top - CLEAR, b: b.bottom + CLEAR, l: r.left - CLEAR, r: r.right + CLEAR });
  });
  return out;
}

/** ¿Puede el hilo bajar en vertical por x entre y1 e y2 sin tocar nada? */
function corridorClear(xPx: number, y1: number, y2: number, boxes: Box[]) {
  return !boxes.some((b) => b.b > y1 && b.t < y2 && b.l < xPx && b.r > xPx);
}

/** Franjas horizontales donde no hay ningun elemento: por ahi puede cruzar. */
function freeWindows(fromY: number, toY: number, boxes: { t: number; b: number }[]) {
  const step = 4;
  const wins: [number, number][] = [];
  let start: number | null = null;
  for (let y = fromY; y < toY; y += step) {
    const busy = boxes.some((b) => b.b > y && b.t < y + step);
    if (!busy) {
      if (start === null) start = y;
    } else if (start !== null) {
      wins.push([start, y]);
      start = null;
    }
  }
  if (start !== null) wins.push([start, toY]);
  return wins.filter(([a, b]) => b - a >= 36);
}

/** Puntos por donde el hilo debe pasar: el canal de LA EXPERIENCIA. */
function nodePoints() {
  const out: { x: number; y: number }[] = [];
  document.querySelectorAll<HTMLElement>("[data-hilo-node]").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 && rect.height < 1) return;
    const b = settledBounds(el);
    out.push({ x: rect.left + rect.width / 2, y: (b.top + b.bottom) / 2 });
  });
  return out.sort((a, b) => a.y - b.y);
}

/** Redondeo corto para que la ruta no sea una cadena enorme. */
const r = (n: number) => Math.round(n * 10) / 10;

function buildPath(): { d: string; w: number; h: number } | null {
  const H = document.documentElement.scrollHeight;
  const W = document.documentElement.clientWidth;
  if (!H || !W) return null;
  const hero = document.getElementById("hero");
  const footer = document.querySelector("footer");
  const fromY = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
  const toY = footer ? footer.getBoundingClientRect().top + window.scrollY : H;

  const boxes = contentBoxes();
  const wins = freeWindows(fromY, toY, boxes);
  if (wins.length < 2) return null;

  const ML = W * 0.02;
  const MR = W * 0.98;
  const mid = W / 2;
  const nodes = nodePoints();

  const [fa, fb] = wins[0];
  const startY = fa + Math.min(20, (fb - fa) * 0.35);
  const settleY = Math.min(fb - 2, startY + 26);
  let x = MR;
  let d = `M ${mid} ${r(startY)} C ${r(mid + W * 0.15)} ${r(startY + 5)}, ${r(x)} ${r(startY + 11)}, ${r(x)} ${r(settleY)}`;
  let lastY = settleY;
  let lastCross = lastY;

  /*
    Huecos por donde entra y sale del canal. Se elige el mas lejano posible en
    cada sentido (mientras la bajada vertical por el canal siga libre), para
    que el giro sea un trazo largo y no un codo apretado.
  */
  let entryWin: [number, number] | null = null;
  let exitWin: [number, number] | null = null;
  if (nodes.length) {
    const cx = nodes[0].x;
    const firstY = nodes[0].y;
    const lastNodeY = nodes[nodes.length - 1].y;
    for (const w of wins) {
      if (w[1] > firstY || w[0] < lastY - 1) continue;
      if (corridorClear(cx, w[1] - 2, firstY, boxes)) {
        entryWin = w;
        break;
      }
    }
    for (const w of wins.slice(0, -1)) {
      if (w[0] < lastNodeY) continue;
      if (!corridorClear(cx, lastNodeY, w[0] + 2, boxes)) break;
      exitWin = w;
    }
    if (!entryWin || !exitWin) {
      entryWin = null;
      exitWin = null;
    }
  }

  const minGap = H * 0.1;
  const crossAt = ([a, b]: [number, number]) => {
    const yc = (a + b) / 2;
    if (yc - lastCross < minGap) return;
    const k = Math.min((b - a) / 2 - 4, 70);
    if (k < 12) return;
    const nx = x === MR ? ML : MR;
    d += ` L ${r(x)} ${r(yc - k)} C ${r(x)} ${r(yc)}, ${r(nx)} ${r(yc)}, ${r(nx)} ${r(yc + k)}`;
    x = nx;
    lastCross = yc;
    lastY = yc + k;
  };

  const middle = wins.slice(1, -1);

  if (entryWin && exitWin) {
    for (const w of middle) {
      if (w[0] >= entryWin[0]) break;
      crossAt(w);
    }

    // Entra al canal
    const cx = nodes[0].x;
    const [ea, eb] = entryWin;
    const y1 = Math.max(lastY + 6, ea + Math.min(12, (eb - ea) * 0.25));
    const y2 = Math.min(eb - 3, y1 + Math.max(16, (eb - y1) * 0.6));
    d += ` L ${r(x)} ${r(y1)} C ${r(x)} ${r((y1 + y2) / 2)}, ${r(cx)} ${r((y1 + y2) / 2)}, ${r(cx)} ${r(y2)}`;

    // Enhebra los nudos
    for (const n of nodes) d += ` L ${r(n.x)} ${r(n.y)}`;

    // Sale del canal hacia el margen izquierdo
    const lx = nodes[nodes.length - 1].x;
    const [xa, xb] = exitWin;
    const y3 = Math.max(nodes[nodes.length - 1].y + 6, xa + 4);
    const y4 = Math.min(xb - 3, y3 + Math.max(16, (xb - y3) * 0.5));
    d += ` L ${r(lx)} ${r(y3)} C ${r(lx)} ${r((y3 + y4) / 2)}, ${r(ML)} ${r((y3 + y4) / 2)}, ${r(ML)} ${r(y4)}`;
    x = ML;
    lastY = y4;
    lastCross = y4;

    for (const w of middle) {
      if (w[0] <= exitWin[0]) continue;
      crossAt(w);
    }
  } else {
    for (const w of middle) crossAt(w);
  }

  const [la, lb] = wins[wins.length - 1];
  const endY = Math.min(lb - 4, toY - 4);
  const curlY = Math.max(lastY + 8, Math.min(la + 6, endY - 24));
  d += ` L ${r(x)} ${r(curlY)} C ${r(x)} ${r(endY - 8)}, ${r(mid + W * 0.14)} ${r(endY)}, ${r(mid)} ${r(endY)}`;
  return { d, w: W, h: H };
}

/*
  El SVG del hilo usa un viewBox 1:1 con la pagina, asi que una unidad del
  trazado es un pixel y el eje Y del trazado es directamente la altura de
  pagina. Eso hace que el patron de guiones sea exacto y que se pueda dibujar
  el hilo "hasta donde va leyendo el visitante".
*/
type Lut = { ys: number[]; ss: number[]; total: number };

function buildLut(p: SVGPathElement): Lut | null {
  const total = p.getTotalLength();
  if (!total) return null;
  const steps = 400;
  const ys: number[] = [];
  const ss: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const s = (total * i) / steps;
    ys.push(p.getPointAtLength(s).y);
    ss.push(s);
  }
  return { ys, ss, total };
}

function lenAtY(lut: Lut, y: number) {
  const { ys, ss } = lut;
  if (y <= ys[0]) return 0;
  for (let i = 1; i < ys.length; i++) {
    if (ys[i] >= y) {
      const span = ys[i] - ys[i - 1];
      const t = span > 0.001 ? (y - ys[i - 1]) / span : 0;
      return ss[i - 1] + (ss[i] - ss[i - 1]) * t;
    }
  }
  return lut.total;
}

let lastD = "";

/** Devuelve true si la ruta cambio. */
function applyPath() {
  const res = buildPath();
  if (!res || res.d === lastD) return false;
  lastD = res.d;
  const svg = document.getElementById("hilo-svg");
  if (svg) svg.setAttribute("viewBox", `0 0 ${res.w} ${res.h}`);
  document.querySelectorAll<SVGPathElement>("path.hilo-main").forEach((p) => {
    p.setAttribute("d", res.d);
    // Con el viewBox 1:1 sobra, y ademas enturbia las unidades del guion.
    p.removeAttribute("vector-effect");
  });
  return true;
}

export default function Fx() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // La ruta se mide siempre, tambien sin animacion, para que nunca tape nada.
    applyPath();

    if (reduced) {
      gsap.set("[data-line-inner]", { yPercent: 0, opacity: 1 });
      gsap.set("[data-rc]", { opacity: 1, y: 0 });
      gsap.set(".hilo-punto", { opacity: 1 });
      const onStatic = () => applyPath();
      window.addEventListener("resize", onStatic);
      window.addEventListener("load", onStatic);
      const ro = new ResizeObserver(onStatic);
      ro.observe(document.body);
      return () => {
        window.removeEventListener("resize", onStatic);
        window.removeEventListener("load", onStatic);
        ro.disconnect();
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    let drawMain = () => {};

    const ctx = gsap.context(() => {
      // Hero title: lines mask upward, 80ms stagger, expo out
      gsap.set("[data-line-inner]", { yPercent: 110 });
      gsap.to("[data-line-inner]", {
        yPercent: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.15,
      });

      // El hilo, beat 1: draws itself beneath the title after the title settles
      const heroPath = document.querySelector<SVGPathElement>("#hilo-hero-path");
      if (heroPath) {
        const len = heroPath.getTotalLength();
        gsap.set(heroPath, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(heroPath, { strokeDashoffset: 0, duration: 2, ease: "expo.inOut", delay: 1.15 });
      }

      // El hilo, beat 2: continues down the whole page, scrubbed.
      // Se rehace cada vez que la ruta cambia (imagenes, embed, ancho).
      let mainST: ScrollTrigger | null = null;
      drawMain = () => {
        mainST?.kill();
        mainST = null;
        const paths = [...document.querySelectorAll<SVGPathElement>(".hilo-main")];
        if (!paths.length) return;
        const lut = buildLut(paths[0]);
        if (!lut) return;
        paths.forEach((p) =>
          gsap.set(p, { strokeDasharray: lut.total, strokeDashoffset: lut.total })
        );
        const setters = paths.map((p) =>
          gsap.quickTo(p, "strokeDashoffset", { duration: 0.45, ease: "power2.out" })
        );
        // La punta del hilo va justo por delante de la lectura.
        const update = () => {
          const target = window.scrollY + window.innerHeight * 0.62;
          const drawn = lenAtY(lut, target);
          setters.forEach((set) => set(lut.total - drawn));
        };
        update();
        mainST = ScrollTrigger.create({
          trigger: document.documentElement,
          start: 0,
          end: "max",
          onUpdate: update,
          onRefresh: update,
        });
      };
      drawMain();

      // El hilo, beat 3: branches into a constellation of people, then rejoins
      document.querySelectorAll<SVGPathElement>(".hilo-rama").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#experiencia",
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.8,
          },
        });
      });
      gsap.set(".hilo-punto", { opacity: 0 });
      gsap.to(".hilo-punto", {
        opacity: 1,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: "#experiencia",
          start: "top 65%",
          end: "center 55%",
          scrub: 0.8,
        },
      });

      // Quiet layer: section reveals, children staggered 60ms, play once
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((sec) => {
        const kids = sec.querySelectorAll("[data-rc]");
        if (!kids.length) return;
        gsap.set(kids, { opacity: 0, y: 24 });
        gsap.to(kids, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: sec, start: "top 70%", once: true },
        });
      });

      // Quiet layer: images settle from 1.05 and drift a maximum of 16px
      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.05 },
          {
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: img, start: "top 80%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { y: -16 },
          {
            y: 16,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });

    /*
      La maquetacion se mueve despues del montaje: fuentes, imagenes y el
      embed de Instagram cambian las alturas. Cada vez que eso pasa se
      recalcula la ruta y se rehace el trazo, para que el hilo nunca quede
      encima de un elemento que se movio.
    */
    let t: ReturnType<typeof setTimeout>;
    const recompute = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (applyPath()) {
          drawMain();
          ScrollTrigger.refresh();
        }
      }, 150);
    };

    window.addEventListener("resize", recompute);
    window.addEventListener("load", recompute);
    const ro = new ResizeObserver(recompute);
    ro.observe(document.body);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recompute);
      window.removeEventListener("load", recompute);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
}
