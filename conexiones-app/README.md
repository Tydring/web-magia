# Conexiones, landing

Landing de una sola ruta para "Conexiones", el espectáculo de Rafael Gorrochotegui.
Next.js App Router + Tailwind 4 + GSAP ScrollTrigger. Salida 100% estática.

## Comandos

```bash
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción (estático)
npm start        # servir el build
```

## Deploy en Netlify

Sitio nuevo apuntando a este directorio (`conexiones-app/`):

- Build command: `npm run build`
- Netlify detecta Next.js e instala su runtime automáticamente. La página es
  estática (prerender completo), no requiere funciones.

## Diseño

- Ley de diseño: `../london.derrenbrown.co.uk.md` (archivo taste) + estética del
  show por pedido del cliente: acento rojo del flyer, tipografía condensada
  (Anton) para títulos.
- Tokens en `app/globals.css` (@theme): stage `#000000`, ivory `#f0ece4`,
  accent `#dd4a3e`, accent-bright `#f2543f`, accent-deep `#c1272d` (CTA),
  accent-dim `#8a2620`. Rojos muestreados del flyer oficial.
- Si llega el PNG oficial del lockup del título, guardarlo como
  `public/img/titulo-conexiones.png` y sustituir el h1 del hero.
- Una sola animación protagonista: el hilo (SVG, GSAP). Todo lo demás es capa
  silenciosa. `prefers-reduced-motion` deja el hilo dibujado y estático.
- Ley del hilo, medida en `components/Fx.tsx` sobre la página real: cuelga en
  curvas largas y nunca hace esquinas (cada desvío lateral cae 1.9 px por cada
  px que se mueve de lado, y las manijas de cada bézier miden 0.45 del tramo,
  así que los controles no se cruzan). Cuando su camino cruza un elemento no lo
  esquiva ni lo tapa: se corta y reaparece al otro lado. Los cortes son un
  patrón de guiones, no otra ruta, para que la curva siga siendo cuatro béziers
  y repintarla en cada scroll salga barato en un teléfono. El avance con el
  scroll lo hace un recorte (`#hilo-clip-rect`), no el desfase de los guiones.

## Pendientes antes del lanzamiento

- Copy marcado con `DRAFT COPY: Rafael reviews before launch`. Rafael revisa.
  La sinopsis de EL SHOW es copy del cliente, tomado de rafaelgmagia.com/conexiones.
- Slot de video en el hero comentado en `app/page.tsx`. Colocar
  `public/video/conexiones-teaser.mp4` y descomentar si se quiere video.
- La sección VOCES se omitió: no existen testimonios reales en el proyecto.
  Si llegan citas verificadas, agregarla entre EL REEL y CIERRE.
- El reel de Instagram usa el embed oficial (`components/InstagramReel.tsx`,
  carga diferida). Si el deploy usa una CSP estricta, permitir
  `www.instagram.com` en script-src y frame-src, igual que en el
  netlify.toml del sitio principal.
