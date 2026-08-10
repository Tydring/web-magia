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
// Cuanto se separa el hilo del borde de la pantalla. En un movil el margen
// lateral es de 24px, asi que ahi tiene que ser mucho menor que en escritorio.
const edgeInset = (W: number) => Math.max(8, Math.min(26, W * 0.018));

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

/*
  Bandas de aire libre a cada lado del contenido, para un tramo vertical dado.
  El hilo cuelga dentro de la banda, no pegado al borde de la pantalla: pegado
  al borde parece un marco de la interfaz, no un hilo.
*/
function bandRight(y1: number, y2: number, boxes: Box[], W: number): [number, number] {
  let maxR = 0;
  for (const b of boxes) if (b.b > y1 && b.t < y2) maxR = Math.max(maxR, b.r);
  const edge = edgeInset(W);
  const hi = W - edge;
  const lo = Math.min(maxR + 2, hi);
  return lo < hi ? [lo, hi] : [hi, hi];
}

function bandLeft(y1: number, y2: number, boxes: Box[], W: number): [number, number] {
  let minL = W;
  for (const b of boxes) if (b.b > y1 && b.t < y2) minL = Math.min(minL, b.l);
  const lo = edgeInset(W);
  const hi = Math.max(minL - 2, lo);
  return lo < hi ? [lo, hi] : [lo, lo];
}

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
  if (!wins.length) return null;

  const mid = W / 2;
  const nodes = nodePoints();

  let cx = mid;
  let cy = 0;
  let d = "";

  /*
    Tramo vertical con una ondulacion lenta dentro de la banda libre. Un hilo
    colgando nunca es una recta perfecta; la amplitud se limita al aire que
    haya, asi que en movil casi no se mece y en escritorio se nota.
  */
  /*
    Donde cuelga el hilo en un tramo: dentro de la banda libre de TODO el
    tramo, lo mas cerca posible de su destino. Se decide antes de bajar, para
    que la linea no tenga que corregirse por el camino.
  */
  const hangSpot = (y1: number, y2: number, side: "R" | "L", toward: number) => {
    const [lo, hi] = side === "R" ? bandRight(y1, y2, boxes, W) : bandLeft(y1, y2, boxes, W);
    const amp = Math.min(9, Math.max(0, (hi - lo) / 2 - 2));
    const base = Math.min(Math.max(toward, lo + amp), hi - amp);
    return { base, amp };
  };

  /** Tramo vertical: una sola x, con un temblor minimo. */
  const hangTo = (yEnd: number, baseX: number, amp: number) => {
    const span = yEnd - cy;
    if (span <= 24) return;
    const segs = Math.max(1, Math.round(span / 560));
    const step = span / segs;
    for (let i = 1; i <= segs; i++) {
      const yN = cy + step;
      const xN = i === segs ? baseX : baseX + (i % 2 === 1 ? amp : -amp);
      d += ` C ${r(cx)} ${r(cy + step * 0.5)}, ${r(xN)} ${r(yN - step * 0.5)}, ${r(xN)} ${r(yN)}`;
      cx = xN;
      cy = yN;
    }
  };

  /** Traslado lateral suave, usando todo el hueco disponible. */
  const glideTo = (xEnd: number, y1: number, y2: number) => {
    if (y1 > cy) d += ` L ${r(cx)} ${r(y1)}`;
    const dy = Math.max(24, y2 - y1);
    d += ` C ${r(cx)} ${r(y1 + dy * 0.55)}, ${r(xEnd)} ${r(y2 - dy * 0.55)}, ${r(xEnd)} ${r(y2)}`;
    cx = xEnd;
    cy = y2;
  };

  // Huecos para entrar y salir del canal de LA EXPERIENCIA.
  let entryWin: [number, number] | null = null;
  let exitWin: [number, number] | null = null;
  const probeY = wins[0][0];
  if (nodes.length) {
    const chan = nodes[0].x;
    const firstY = nodes[0].y;
    const lastNodeY = nodes[nodes.length - 1].y;
    for (const w of wins) {
      if (w[1] > firstY || w[0] < probeY - 1) continue;
      if (corridorClear(chan, w[1] - 2, firstY, boxes)) {
        entryWin = w;
        break;
      }
    }
    for (const w of wins) {
      if (w[0] < lastNodeY) continue;
      if (!corridorClear(chan, lastNodeY, w[0] + 2, boxes)) break;
      exitWin = w;
    }
    if (!entryWin || !exitWin) {
      entryWin = null;
      exitWin = null;
    }
  }

  const chanX = nodes.length ? nodes[0].x : mid;
  const tailY = toY - 40;

  // Arranque
  const [fa, fb] = wins[0];
  const startY = fa + Math.min(18, (fb - fa) * 0.3);
  const settleY = Math.min(fb - 4, startY + Math.max(60, (fb - startY) * 0.7));
  cy = startY;
  d = `M ${r(mid)} ${r(startY)}`;

  // El lado del tramo previo se decide por cercania al canal, y la x se
  // calcula sobre TODO el tramo, no sobre el hueco donde empieza.
  const descentEnd = entryWin ? entryWin[0] + 6 : tailY;
  const spotL = hangSpot(settleY, descentEnd, "L", chanX);
  const spotR = hangSpot(settleY, descentEnd, "R", chanX);
  const spotA =
    Math.abs(spotL.base - chanX) <= Math.abs(spotR.base - chanX) ? spotL : spotR;

  glideTo(spotA.base, startY, settleY);
  hangTo(descentEnd, spotA.base, spotA.amp);

  if (entryWin && exitWin) {
    const chan = nodes[0].x;
    // Entra al canal aprovechando el hueco entero
    glideTo(chan, Math.max(cy, entryWin[0] + 4), entryWin[1] - 4);
    // Enhebra los nudos: aqui si es una recta tensa, es un hilo con nudos
    for (const n of nodes) d += ` L ${r(n.x)} ${r(n.y)}`;
    cx = nodes[nodes.length - 1].x;
    cy = nodes[nodes.length - 1].y;
    // Sale del canal y sigue colgando por el lado mas cercano
    const outL = hangSpot(exitWin[1], tailY, "L", chan);
    const outR = hangSpot(exitWin[1], tailY, "R", chan);
    const spotB = Math.abs(outL.base - chan) <= Math.abs(outR.base - chan) ? outL : outR;
    glideTo(spotB.base, Math.max(cy + 6, exitWin[0] + 4), exitWin[1] - 4);
    hangTo(tailY, spotB.base, spotB.amp);
  }

  // Final: se recoge un poco hacia dentro y termina, como una punta suelta.
  const inward = cx < mid ? cx + W * 0.05 : cx - W * 0.05;
  d += ` C ${r(cx)} ${r(cy + 24)}, ${r(inward)} ${r(toY - 16)}, ${r(inward)} ${r(toY - 6)}`;
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
