"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  All motion lives here. One signature animation: el hilo.
  Everything else is the quiet layer: masked title lines, 24px rises, image settles.
  With prefers-reduced-motion the thread renders fully drawn and every state is instant.
*/
export default function Fx() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-line-inner]", { yPercent: 0, opacity: 1 });
      gsap.set("[data-rc]", { opacity: 1, y: 0 });
      gsap.set(".hilo-punto", { opacity: 0.35 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

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

      // El hilo, beat 2: continues down the whole page, scrubbed
      document.querySelectorAll<SVGPathElement>(".hilo-main").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
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
        });
      });

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

    return () => ctx.revert();
  }, []);

  return null;
}
