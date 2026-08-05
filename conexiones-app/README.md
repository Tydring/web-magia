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

- Ley de diseño: `../london.derrenbrown.co.uk.md` (archivo taste), con desviación
  cálida aprobada: eje dorado en vez de teal.
- Tokens en `app/globals.css` (@theme): stage `#000000`, ivory `#f0ece4`,
  gold `#c9a84c`, gold-bright `#e8c96a`, gold-dim `#a07830`.
- Una sola animación protagonista: el hilo (SVG, GSAP). Todo lo demás es capa
  silenciosa. `prefers-reduced-motion` deja el hilo dibujado y estático.

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
