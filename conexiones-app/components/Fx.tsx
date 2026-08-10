"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  All motion lives here. One signature animation: el hilo.
  Everything else is the quiet layer: masked title lines, 24px rises, image settles.
  With prefers-reduced-motion the thread renders fully drawn and every state is instant.

  Ley del hilo. Es un hilo colgando, no una cañeria: solo curvas largas, ni una
  esquina. Dos reglas lo garantizan a cualquier ancho:
    1. Cada desvio lateral se resuelve en SWEEP px de caida por px de
       desplazamiento, con un minimo de MIN_SWEEP. Nada de codos.
    2. Las manijas de cada curva miden 0.45 del tramo, menos de la mitad, asi
       que los puntos de control nunca se cruzan y la linea no se dobla sobre
       si misma.
  Y cuando el camino cruza un elemento, el hilo ni lo esquiva ni lo tapa: se
  corta a CUT_PAD del elemento y reaparece al otro lado, como si pasara por
  detras de la pagina. Cortarlo es mas bonito que retorcerlo.
*/

const CLEAR = 10; // px de aire para decidir por donde cuelga
/*
  El hilo se corta a esta distancia del elemento que cruza. Tiene que ser menor
  que el aire que deja la banda al colgar (CLEAR), o en un movil, donde el
  margen de pagina es de 24px, la propia bajada por el costado se cortaria
  entera y el hilo desapareceria durante secciones completas.
*/
const CUT_PAD = 8;
const MIN_RUN = 30; // px: un trozo mas corto que esto es mugre, no se dibuja
const SAMPLE = 6; // px entre muestras al calcular los cortes
const SWEEP = 1.9; // px de caida por cada px de desplazamiento lateral
const MIN_SWEEP = 96; // ninguna curva lateral se resuelve en menos que esto
// Cuanto se separa el hilo del borde de la pantalla. En un movil el margen
// lateral es de 24px, asi que ahi tiene que ser mucho menor que en escritorio.
const edgeInset = (W: number) => Math.max(8, Math.min(26, W * 0.018));

type Box = { t: number; b: number; l: number; r: number };
type Pt = { x: number; y: number };

/*
  Sitio final del elemento, no el que ocupa mientras se revela. Los bloques con
  data-rc entran desplazados 24px y las imagenes con data-zoom empiezan un 5%
  mas grandes: midiendo eso creeriamos que hay texto donde habra un hueco, o
  que la foto llega mas al borde de lo que va a llegar. Se deshace el
  desplazamiento y la escala del ancestro animado, y queda la caja de reposo.
*/
function settledBounds(el: HTMLElement): Box {
  const r = el.getBoundingClientRect();
  const box = { t: r.top + window.scrollY, b: r.bottom + window.scrollY, l: r.left, r: r.right };
  const moved = el.closest<HTMLElement>("[data-rc], [data-line-inner], [data-zoom]");
  if (!moved) return box;
  const tr = getComputedStyle(moved).transform;
  if (!tr || tr === "none") return box;
  let m: DOMMatrixReadOnly;
  try {
    m = new DOMMatrixReadOnly(tr);
  } catch {
    return box;
  }
  // La escala tiene su origen en el centro del elemento animado, ya sin mover.
  const mr = moved.getBoundingClientRect();
  const cx = mr.left + mr.width / 2 - m.e;
  const cy = mr.top + window.scrollY + mr.height / 2 - m.f;
  const undo = (v: number, c: number, k: number) => (Math.abs(k) < 0.001 ? v : c + (v - c) / k);
  return {
    t: undo(box.t - m.f, cy, m.d),
    b: undo(box.b - m.f, cy, m.d),
    l: undo(box.l - m.e, cx, m.a),
    r: undo(box.r - m.e, cx, m.a),
  };
}

function contentBoxes(): Box[] {
  const sel =
    "main h1, main h2, main h3, main p, main dl, main a, main img, main blockquote, main iframe, footer p, footer nav";
  const out: Box[] = [];
  document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    // El fondo del hero es decorativo: el hilo puede pasar por delante.
    if (el.tagName === "IMG" && el.closest("#hero")) return;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    out.push(settledBounds(el));
  });
  return out;
}

const inflate = (b: Box, p: number): Box => ({ t: b.t - p, b: b.b + p, l: b.l - p, r: b.r + p });

/** Puntos por donde el hilo debe pasar: el canal de LA EXPERIENCIA. */
function nodePoints(): Pt[] {
  const out: Pt[] = [];
  document.querySelectorAll<HTMLElement>("[data-hilo-node]").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 && rect.height < 1) return;
    const b = settledBounds(el);
    out.push({ x: (b.l + b.r) / 2, y: (b.t + b.b) / 2 });
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

/*
  Caida minima que necesita un desvio lateral. Es la regla que impide los
  codos: cuanto mas se mueve el hilo de lado, mas tiene que caer para hacerlo.
*/
const sweep = (dx: number) => Math.max(MIN_SWEEP, Math.abs(dx) * SWEEP);

/*
  De puntos a curva. Cada tramo entra y sale en vertical, y las manijas miden
  0.45 del alto, menos de la mitad: los controles no se cruzan nunca, asi que
  la linea no puede hacer un gancho ni doblarse sobre si misma.
*/
function smooth(pts: Pt[]): string {
  let d = `M ${r(pts[0].x)} ${r(pts[0].y)}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    if (Math.abs(b.x - a.x) < 0.4) {
      d += ` L ${r(b.x)} ${r(b.y)}`;
      continue;
    }
    const h = (b.y - a.y) * 0.45;
    d += ` C ${r(a.x)} ${r(a.y + h)}, ${r(b.x)} ${r(b.y - h)}, ${r(b.x)} ${r(b.y)}`;
  }
  return d;
}

function buildPath(): { d: string; cuts: Box[]; w: number; h: number } | null {
  const H = document.documentElement.scrollHeight;
  const W = document.documentElement.clientWidth;
  if (!H || !W) return null;
  const hero = document.getElementById("hero");
  const footer = document.querySelector("footer");
  const fromY = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
  const toY = footer ? footer.getBoundingClientRect().top + window.scrollY : H;

  const raw = contentBoxes();
  const boxes = raw.map((b) => inflate(b, CLEAR));
  const nodes = nodePoints();
  const mid = W / 2;
  const startY = fromY + 28;
  const endY = toY - 8;
  if (endY - startY < 240) return null;

  /*
    Donde cuelga el hilo en un tramo: dentro de la banda de aire libre de TODO
    el tramo, lo mas cerca posible de su destino. Se decide antes de bajar,
    para que la linea no tenga que corregirse por el camino.
  */
  const hangSpot = (y1: number, y2: number, side: "R" | "L", toward: number) => {
    const [lo, hi] = side === "R" ? bandRight(y1, y2, boxes, W) : bandLeft(y1, y2, boxes, W);
    const amp = Math.min(9, Math.max(0, (hi - lo) / 2 - 2));
    const base = Math.min(Math.max(toward, lo + amp), hi - amp);
    return { base, amp };
  };

  /** El lado con la banda mas cercana al sitio al que va el hilo. */
  const pickSide = (y1: number, y2: number, toward: number) => {
    const l = hangSpot(y1, y2, "L", toward);
    const rr = hangSpot(y1, y2, "R", toward);
    return Math.abs(l.base - toward) <= Math.abs(rr.base - toward) ? l : rr;
  };

  const pts: Pt[] = [{ x: mid, y: startY }];
  const at = () => pts[pts.length - 1];
  const push = (x: number, y: number) => pts.push({ x, y: Math.max(y, at().y + 8) });

  /** Tramo colgado: una sola x, con un mecido lento y larguisimo. */
  const hangTo = (yEnd: number, x: number, amp: number) => {
    const span = yEnd - at().y;
    if (span <= 24) return;
    const segs = Math.max(1, Math.round(span / 620));
    const step = span / segs;
    const from = at().y;
    for (let i = 1; i <= segs; i++) {
      push(i === segs ? x : x + (i % 2 === 1 ? amp : -amp), from + step * i);
    }
  };

  // La punta suelta del final se recoge hacia dentro, y esa curva tambien
  // necesita su caida: se reserva antes de decidir hasta donde cuelga el hilo.
  const inwardDx = W * 0.06;
  const tailY = endY - sweep(inwardDx);

  const chanX = nodes.length ? nodes[0].x : mid;
  const knotTop = nodes.length ? nodes[0].y : 0;
  const knotBottom = nodes.length ? nodes[nodes.length - 1].y : 0;
  // Solo se enhebra si hay sitio para entrar y salir del canal en curva.
  const threading =
    nodes.length > 0 &&
    knotTop - startY > sweep(chanX - mid) &&
    tailY - knotBottom > MIN_SWEEP;

  if (threading) {
    /*
      Del centro del hero al canal de LA EXPERIENCIA en una sola curva larga.
      Nada de bajar antes por el costado y volver: ese rodeo es el que no cabe
      en pantalla ancha y obligaba a resolverlo a codazos. Dentro del canal el
      hilo baja tenso y sin mecerse, porque va a enhebrar tres nudos.
    */
    push(chanX, startY + sweep(chanX - mid));
    hangTo(knotTop, chanX, 0);
    for (const n of nodes) push(n.x, n.y);
    // Pasados los nudos vuelve a colgar suelto por el costado con mas aire.
    const spot = pickSide(knotBottom, tailY, chanX);
    push(spot.base, knotBottom + sweep(spot.base - chanX));
    hangTo(tailY, spot.base, spot.amp);
  } else {
    const spot = pickSide(startY, tailY, mid);
    push(spot.base, startY + sweep(spot.base - mid));
    hangTo(tailY, spot.base, spot.amp);
  }

  push(at().x < mid ? at().x + inwardDx : at().x - inwardDx, endY);
  return { d: smooth(pts), cuts: raw.map((b) => inflate(b, CUT_PAD)), w: W, h: H };
}

/*
  Los cortes. Se recorre la ruta y se anota que trozos caen encima de un
  elemento: ahi el hilo desaparece y vuelve al otro lado. El resultado no es
  otra ruta sino un patron de guiones, para que la curva siga siendo cuatro
  bezier y no setecientos segmentos: el hilo se repinta en cada scroll y una
  polilinea larga bajo el desenfoque le cuesta cara a un telefono.
*/
function cutPattern(path: SVGPathElement, cuts: Box[]): { dash: string; offset: number } {
  const none = { dash: "none", offset: 0 };
  const total = path.getTotalLength();
  if (!total) return none;
  const vis: [number, number][] = [];
  let start: number | null = 0;
  for (let s = 0; s <= total; s += SAMPLE) {
    const p = path.getPointAtLength(s);
    const covered = cuts.some((b) => p.y > b.t && p.y < b.b && p.x > b.l && p.x < b.r);
    if (covered) {
      if (start !== null) vis.push([start, s]);
      start = null;
    } else if (start === null) {
      start = s;
    }
  }
  if (start !== null) vis.push([start, total]);

  const keep = vis.filter(([a, b]) => b - a >= MIN_RUN);
  const drawn = keep.reduce((n, [a, b]) => n + (b - a), 0);
  // Si la pagina se come casi todo el hilo, mejor entero que un rastro de migajas.
  if (!keep.length || drawn < total * 0.3) return none;

  const parts: number[] = [];
  keep.forEach(([a, b], i) => {
    if (i > 0) parts.push(a - keep[i - 1][1]); // el hueco
    parts.push(b - a); // el trozo que se ve
  });
  // Una ultima separacion mas larga que el hilo entero: el patron no se repite.
  parts.push(total);
  // El desfase negativo arranca el patron donde empieza el primer trozo.
  return { dash: parts.map(r).join(" "), offset: -keep[0][0] };
}

/*
  El SVG del hilo usa un viewBox 1:1 con la pagina, asi que una unidad del
  trazado es un pixel y el eje Y del trazado es directamente la altura de
  pagina. Por eso el hilo se dibuja "hasta donde va leyendo el visitante" con
  un recorte: basta una franja desde arriba hasta esa altura. Los guiones
  quedan libres para lo que de verdad los necesita, que son los cortes.
*/

let lastD = "";

/** Devuelve true si la ruta cambio. */
function applyPath() {
  const res = buildPath();
  const svg = document.getElementById("hilo-svg") as SVGSVGElement | null;
  if (!res || !svg) return false;
  if (res.d === lastD) return false;
  lastD = res.d;
  svg.setAttribute("viewBox", `0 0 ${res.w} ${res.h}`);
  const paths = [...document.querySelectorAll<SVGPathElement>("path.hilo-main")];
  paths.forEach((p) => {
    p.setAttribute("d", res.d);
    // Con el viewBox 1:1 sobra, y ademas enturbia las unidades del guion.
    p.removeAttribute("vector-effect");
  });
  const pat = paths.length ? cutPattern(paths[0], res.cuts) : { dash: "none", offset: 0 };
  paths.forEach((p) => {
    p.setAttribute("stroke-dasharray", pat.dash);
    p.setAttribute("stroke-dashoffset", String(r(pat.offset)));
  });
  // Sin animacion el hilo se ve entero; el recorte solo lo tapa al hacer scroll.
  const clip = document.getElementById("hilo-clip-rect");
  if (clip) {
    clip.setAttribute("width", String(res.w));
    clip.setAttribute("height", String(res.h));
  }
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
        const clip = document.getElementById("hilo-clip-rect");
        if (!clip) return;
        clip.setAttribute("height", "0");
        // La punta del hilo va justo por delante de la lectura.
        const head = { y: 0 };
        const setY = gsap.quickTo(head, "y", {
          duration: 0.45,
          ease: "power2.out",
          onUpdate: () => clip.setAttribute("height", String(Math.max(0, Math.round(head.y)))),
        });
        const update = () => setY(window.scrollY + window.innerHeight * 0.62);
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
