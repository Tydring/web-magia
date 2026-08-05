"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/*
  Embed oficial de Instagram, cargado de forma diferida: el script embed.js
  solo se inyecta cuando el bloque se acerca al viewport. Sin JS queda un
  enlace directo al reel.
*/
export default function InstagramReel({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, [visible]);

  return (
    <div ref={ref} className="mx-auto w-full max-w-[420px]" style={{ minHeight: 600 }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#000", border: 0, margin: "0 auto", maxWidth: 540, minWidth: 280, width: "100%" }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="block py-10 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-accent hover:text-accent-bright"
        >
          Ver el reel en Instagram
        </a>
      </blockquote>
    </div>
  );
}
