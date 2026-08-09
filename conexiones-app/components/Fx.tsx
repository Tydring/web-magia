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
const CLEAR = 6; // px de aire alrededor de cada elemento

function contentBoxes() {
  const sel =
    "main h1, main h2, main h3, main p, main dl, main a, main img, main blockquote, main iframe, footer p, footer nav";
  const out: { t: number; b: number }[] = [];
  document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    // El fondo del hero es decorativo: el hilo puede pasar por delante.
    if (el.tagName === "IMG" && el.closest("#hero")) return;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    out.push({ t: r.top + window.scrollY - CLEAR, b: r.bottom + window.scrollY + CLEAR });
  });
  return out;
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

function buildPath(): string | null {
  const H = document.documentElement.scrollHeight;
  if (!H) return null;
  const hero = document.getElementById("hero");
  const footer = document.querySelector("footer");
  const fromY = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
  const toY = footer ? footer.getBoundingClientRect().top + window.scrollY : H;

  const wins = freeWindows(fromY, toY, contentBoxes());
  if (wins.length < 2) return null;

  const u = (px: number) => +((px / H) * 1000).toFixed(1);

  // Arranque: nace en el centro, bajo el hero, y se va al margen derecho.
  const [fa, fb] = wins[0];
  const startY = fa + Math.min(20, (fb - fa) * 0.35);
  const settleY = Math.min(fb - 2, startY + 26);
  let x = MARGIN_R;
  let d = `M 50 ${u(startY)} C 72 ${u(startY + 5)}, ${x} ${u(startY + 11)}, ${x} ${u(settleY)}`;
  let lastY = settleY;

  // Cruces: uno por hueco, siempre contenidos dentro del hueco.
  const minGap = H * 0.1;
  let lastCross = lastY;
  for (const [a, b] of wins.slice(1, -1)) {
    const yc = (a + b) / 2;
    if (yc - lastCross < minGap) continue;
    const k = Math.min((b - a) / 2 - 4, 70);
    if (k < 12) continue;
    const nx = x === MARGIN_R ? MARGIN_L : MARGIN_R;
    d += ` L ${x} ${u(yc - k)} C ${x} ${u(yc)}, ${nx} ${u(yc)}, ${nx} ${u(yc + k)}`;
    x = nx;
    lastCross = yc;
    lastY = yc + k;
  }

  // Cola: baja y se recoge al centro dentro del ultimo hueco.
  const [la, lb] = wins[wins.length - 1];
  const endY = Math.min(lb - 4, toY - 4);
  const curlY = Math.max(lastY + 8, Math.min(la + 6, endY - 24));
  d += ` L ${x} ${u(curlY)} C ${x} ${u(endY - 8)}, 70 ${u(endY)}, 50 ${u(endY)}`;
  return d;
}

let lastD = "";

/** Devuelve true si la ruta cambio. */
function applyPath() {
  const d = buildPath();
  if (!d || d === lastD) return false;
  lastD = d;
  document.querySelectorAll<SVGPathElement>("path.hilo-main").forEach((p) => {
    p.setAttribute("d", d);
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
      gsap.set(".hilo-punto", { opacity: 0.35 });
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
      let mainTweens: gsap.core.Tween[] = [];
      drawMain = () => {
        mainTweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
        mainTweens = [];
        document.querySelectorAll<SVGPathElement>(".hilo-main").forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          mainTweens.push(
            gsap.to(p, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: "#hero",
                start: "bottom 90%",
                endTrigger: "#cierre",
                end: "top 40%",
                scrub: 0.8,
              },
            })
          );
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
        opacity: 0.35,
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
