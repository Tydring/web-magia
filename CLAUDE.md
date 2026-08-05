# Rafael Gorrochotegui — Website Project

## Project Overview

Single-page website for Rafael Gorrochotegui, professional magician and mentalist based in Caracas, Venezuela.

- **Deliverable**: One `index.html` file — embedded CSS and JS, no frameworks, no build tools, no backend
- **Language**: Spanish only
- **Responsive**: Desktop-first, works down to 375px mobile
- **Full plan reference**: `C:\Users\Christian\.gemini\antigravity\brain\e87fabfe-e1b0-4de7-baa3-6a4cc054da58\website-plan-rafael-gorrochotegui.md.resolved`

---

## Design System

| Token | Value |
|-------|-------|
| Font | Montserrat (Google Fonts) — weights 300, 400, 600, 700, 800, 900 |
| Background | `#080808`, `#111111`, `#1a1a1a`, `#141414` |
| Off-white | `#f0ece4` |
| Gold primary | `#c9a84c` |
| Gold bright | `#e8c96a` |
| Gold dim | `#a07830` |

**Shape rule (strict):** All buttons, nav, tags, single-line inputs, badges → `border-radius: 999px`. Cards → `border-radius: 24px`. Textareas → `border-radius: 16px`. No sharp corners anywhere.

---

## Image Assets & Assignments

### Folder 1 — `FOTOS RAFA 2026-20260223T224134Z-1-001/FOTOS RAFA 2026/`
Teal/smoke composite studio shots, all color.

| File | Description |
|------|-------------|
| `CH.jpg` | Front-facing, "energy orb" hands, full blue smoke composite — **HERO** |
| `DSC_1035.jpg` | Hand reaching toward camera, teal bg — Clases gallery #4 |
| `DSC_1040.jpg` | Dramatic side profile, clean teal — Clases gallery #5 |

### Folder 2 — `Press Kit-20260223T224133Z-1-001/Press Kit/`
Black bg B&W formal shots + grey bg color professional shots.

| File | Description |
|------|-------------|
| `DSC_0281.jpg` | Color, grey bg, full-body 3-piece suit — **Shows biography photo** |
| `DSC_0295.jpg` | Color, grey bg, hand raised near ear (mentalist) — Clases gallery #1 |
| `DSC_0306.jpg` | Color, grey bg, seated on stool, hand at temple — Clases gallery #2 + **Clases biography photo** |
| `DSC_0309.jpg` | Color, grey bg, seated, direct gaze — Clases gallery #3 |

### Folder 3 — `Fotos show/`
Real show photos — intimate library venue, warm ambient lighting.

| File | Description |
|------|-------------|
| `showmagiarafa-3-of-18-1.jpg` | Rafael close-up, gesturing to audience, bookshelf bg — **Shows gallery #1** (tall hero slot) |
| `showmagiarafa-17-of-18-1.jpg` | Rafael side profile, library setting, hands gesturing — Shows gallery #2 |
| `showmagiarafa-3-of-35-1.jpg` | Rafael dramatic dark lighting, holding colorful props — Shows gallery #3 |
| `showmagiarafa-1-of-18-1.jpg` | Wide room shot, full audience seated, Rafael performing — Shows gallery #4 |
| `showmagiarafa-2-of-35-1-1.jpg` | Rafael on stage with bookshelf bg, colorful items — Shows gallery #5 |
| `showmagiarafa-13-of-18-1.jpg` | Audience reaction shot, man holding purple fabric — Shows gallery #6 |

### Image Assignment Summary
- **Hero**: `FOTOS RAFA 2026.../CH.jpg`
- **Shows gallery** (6): all from `Fotos show/` — showmagiarafa-3-of-18-1, -17-of-18-1, -3-of-35-1, -1-of-18-1, -2-of-35-1-1, -13-of-18-1
- **Shows bio portrait**: `Press Kit.../DSC_0281.jpg`
- **Clases gallery** (5): DSC_0295, DSC_0306, DSC_0309, DSC_1035, DSC_1040
- **Clases bio portrait**: `Press Kit.../DSC_0306.jpg`

> All paths are relative from `index.html` at the project root.

---

## Site Structure

```
index.html (single scrollable page)
│
├── Loader Screen               — gold progress bar, fades out
├── Sticky Pill Nav             — id="navbar", fixed top center
│
├── Hero                        — id="hero", 100dvh
│
├── ══ SHOWS BLOCK ══
│   ├── Shows Header            — id="shows"
│   ├── Shows Gallery           — id="shows-gallery"  (6 photos, asymmetric grid)
│   ├── Shows Services          — id="shows-services" (6 cards)
│   ├── Shows Biography         — id="shows-bio"      (60/40 split, portrait left)
│   ├── Shows Logo Marquee      — id="shows-logos"    (scrolls left)
│   ├── Shows Contact Form      — id="shows-contact"
│   └── Shows Social Links      — id="shows-social"
│
├── Gold Divider                — ✦ centered ornament
│
└── ══ CLASES BLOCK ══
    ├── Clases Header           — id="clases"
    ├── Clases Gallery          — id="clases-gallery" (5 photos, same grid pattern)
    ├── Clases Tiers            — id="clases-tiers"   (2 cards: Niños + Jóvenes)
    ├── Clases Biography        — id="clases-bio"     (40/60 split, portrait right — flipped)
    ├── Clases Logo Marquee     — id="clases-logos"   (scrolls right — opposite direction)
    ├── Clases Contact Form     — id="clases-contact"
    ├── Clases Social Links     — id="clases-social"
    └── Footer                  — id="footer"
```

---

## Content

### Shows Section
- **Tag**: `— SHOWS —`
- **H2**: `Magia en Vivo`
- **Subtitle**: *"Experiencias únicas diseñadas para cada ocasión. Desde reuniones íntimas hasta grandes escenarios."*

**6 Service Cards:**
| # | Title | Description |
|---|-------|-------------|
| 01 | Shows Privados | Momentos íntimos y personalizados para cumpleaños, aniversarios y reuniones entre amigos. Magia a centímetros de tus manos. |
| 02 | Shows Corporativos | Potencia tus eventos de empresa con una experiencia mágica que rompe el hielo y genera conexiones reales entre equipos. |
| 03 | Grandes Shows | Producciones de escenario completo para teatros, auditorios y eventos masivos. Ilusionismo a gran escala. |
| 04 | Performances | Actos de close-up y mentalismo para ferias, inauguraciones, galerías y espacios creativos. Arte en movimiento. |
| 05 | Bodas | El día más especial merece un momento mágico. Un show elegante y memorable que tus invitados nunca olvidarán. |
| 06 | Consultoría Mágica | Asesoría profesional para producciones de TV, cine, teatro o publicidad que requieran autenticidad mágica. |

**Biography text:** *"Rafael Gorrochotegui tiene más de diez años creando magia para miles de personas en diferentes rincones del mundo. Su show ha llegado a Guatemala, Chile, Colombia, Países Bajos y España, dejando audiencias asombradas con una propuesta que fusiona ilusionismo de alta clase con el arte del mentalismo."*

**Stats:** 10+ Años de Experiencia · 5+ Países · Miles de Espectadores

**Contact form fields:** Nombre (text) · Email (email) · Tipo de Show (select) · Mensaje (textarea)
**Select options:** Shows Privados · Shows Corporativos · Grandes Shows / Teatro · Performances · Bodas · Consultoría Mágica
**CTA:** `✦ Solicitar Show`

### Clases Section
- **Tag**: `— CLASES —`
- **H2**: `Aprende el Arte de la Magia`
- **Subtitle**: *"Programas diseñados para niños y jóvenes que quieren descubrir el fascinante mundo del ilusionismo."*

**2 Tier Cards:**
| Level | Title | Ages | Description |
|-------|-------|------|-------------|
| 01 | Niños | 6–11 años | Introduce tu hijo al mundo de la magia con juegos y trucos diseñados para su edad. Desarrolla concentración, creatividad y confianza en sí mismo. |
| 02 | Jóvenes | 12–17 años | Programa intermedio-avanzado para jóvenes listos para aprender técnicas reales de close-up, mentalismo básico y presentación escénica. |

**Biography text:** *"Como maestro, Rafael cree que la magia es una herramienta poderosa para el desarrollo personal. A través de sus clases, transmite no solo técnicas y trucos, sino también habilidades de comunicación, presencia escénica y autoconfianza que los alumnos llevan consigo toda la vida."*

**Stats:** 10+ Años Enseñando · 2 Niveles · Niños y Jóvenes

**Contact form fields:** Nombre del tutor (text) · Email (email) · Edad del alumno (select: 6–17) · Mensaje (textarea)
**CTA:** `✦ Solicitar Clase`

### Logo Marquee (both sections)
Text-based names — no image files available:
**Hard Rock Cafe · CAVEP · Farmatodo · Teatrex**

### Social Links (both sections)
- Instagram: `https://instagram.com/rafaelgmagia`
- TikTok: `https://tiktok.com/@rafaelgmagia`
- WhatsApp: `https://wa.me/58XXXXXXXXX` ← number pending from client
- Email: `rafaelgmagia@gmail.com`

### Footer
- Name, location (Caracas, Venezuela), email, copyright 2025

---

## Build Progress

### ✅ Completed

**Step 1 — Base structure**
- DOCTYPE, lang="es", meta description, viewport, full title
- Google Fonts import (Montserrat 300–900 + italic)
- All CSS custom properties (full color palette, radii, timing tokens)
- Full CSS reset
- Global utility classes: `.container`, `.section-tag`, `.section-title`, `.section-subtitle`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-lg`, `.gold-divider`, `.fade-up`
- Custom scrollbar, gold text selection

**Step 2 — Loader + Nav**
- Loader: full-screen overlay, animated name, gold progress bar (0→100% in 1.2s), fades out after 1.8s, sets `body.loaded`
- Nav: fixed pill, glass blur, gold border, `.scrolled` state on scroll
- Nav: desktop links (Shows · Clases · Contacto) with pill active state
- Nav: mobile hamburger → animated X → pill drawer dropdown
- JS: loader sequence, custom gold cursor (dot + lerp ring), nav scroll/hamburger/active-link IntersectionObserver, global fade-up IntersectionObserver + MutationObserver

**Step 3 — Hero section**
- `#hero`: 100dvh, `CH.jpg` background at `brightness(0.35)`, radial + linear gradient overlay
- Parallax: `--hero-parallax` CSS variable updated via scroll + rAF (ticking pattern)
- Canvas particles: 60 gold `rgba(201,168,76,α)` dots, slow upward drift, shimmer opacity, reinitialize at bottom
- Content: eyebrow pill tag → H1 `Rafael / Gorrochotegui` (gold span) → italic slogan → 2 CTAs (primary + outline) → scroll indicator
- Stagger reveal after loader: eyebrow(0ms) → name(150ms) → slogan(300ms) → CTAs(450ms) → scroll(600ms), triggered at 1850ms
- Mobile: CTAs stack vertically at < 480px

**Step 4 — Shows section** (1633 lines total)
- `#shows`: centered header — pill tag + H2 "Magia en Vivo" + subtitle, fade-up stagger
- `#shows-gallery`: 12-col CSS Grid (300px/220px/200px rows). Item 1 spans cols 1–7, rows 1–2 (tall portrait); items 2–3 stack right; items 4–6 bottom row of 3. Hover: scale + brightness + bottom gradient overlay
- `#shows-services`: 6 cards (3-col), watermark numbers (opacity 0.07→0.13 hover), unicode icons, hover lift + gold glow + border reveal
- `#shows-bio`: 42/58 grid split, DSC_0281 portrait left, bio text + 3 stats (10+ años · 5+ países · Miles). Portrait zoom on hover
- `#shows-logos`: CSS `marqueeLeft` animation (22s), duplicate `.marquee-items` for seamless loop, hover pauses
- `#shows-contact`: 2-col name+email row, tipo select (custom SVG chevron), textarea, `✦ Solicitar Show` CTA
- `#shows-social`: Instagram · TikTok · WhatsApp · Email — pill outline buttons with inline SVGs
- Responsive: 2-col cards at 1024px → 1-col at 768px; gallery resets to 2-col; bio stacks vertically at 768px

**Shows gallery updated**: replaced all 6 gallery images with real show photos from `Fotos show/` folder (intimate library venue shots)

**Step 5 — Clases section** (1876 lines total)
- Gold divider `✦` ornament between Shows and Clases blocks (`.gold-divider`)
- `#clases`: centered header — tag "— Clases —" + H2 "Aprende el Arte de la Magia" + subtitle, fade-up stagger
- `#clases-gallery`: same 12-col grid, 5 photos (DSC_0295, DSC_0306, DSC_0309, DSC_1035, DSC_1040)
- `#clases-tiers`: 2 tier cards side-by-side (max-width 820px) — Niños (6–11) + Jóvenes (12–17), `.card-num`, `.card-age`, `.card-desc`
- `#clases-bio`: 58/42 split FLIPPED — DSC_0306 portrait right (`bio-portrait-right`), bio text left, 3 individual `fade-up` stats
- `#clases-logos`: same marquee with `.marquee-rtl` → `marqueeRight` animation (scrolls right, opposite direction)
- `#clases-contact`: tutor name · email · edad del alumno (select 6–17, each year as option) · mensaje · `✦ Solicitar Clase`
- `#clases-social`: same 4 social buttons (Instagram · TikTok · WhatsApp · Email)
- `#footer`: name, "Caracas, Venezuela", email, copyright 2025

**Step 6 — Scroll animations**
- Verified 40/40 `.fade-up` elements fire `.visible` correctly on scroll (programmatic full-page scroll test passed)
- Added `fade-up` + staggered `data-delay` (100/200/300ms) to Shows bio stats (was missing, now matches Clases)
- Added `fade-up` to both `.social-row` divs (Shows + Clases)
- Added `fade-up` to the gold divider

---

**Steps 7–9 — Polish pass (2026-07-21)**
- All page images now served from `img/` as web-sized copies (~3.3MB total vs ~45MB of camera originals). Originals untouched in their folders; regenerate with `sips` if photos change.
- Clases gallery placeholders ("Próximamente / Coming Soon") replaced with the five assigned studio photos (clases-1 through clases-5).
- Fixed Shows gallery grid: items were placed into rows 4–5 with no defined height; added `grid-auto-rows`. Deduplicated showmagiarafa-2-of-35 (slot 8 now uses the wide room shot, showmagiarafa-1-of-18).
- Service card unicode icons (✦ ◆ ▲ ● ✿ ✧) replaced with inline stroke SVG icons (wand, briefcase, star, spade, rings, eye).
- Removed the ✦ prefix from CTA buttons; the motif stays in the divider and card backs.
- Section tags no longer carry literal "— X —" dashes; pill border does the framing.
- Added `prefers-reduced-motion` support (fade-ups visible, marquee/particles/parallax off).
- Hero image preloaded; verified desktop 1440px and mobile 375px via Playwright, zero broken images.
- On mobile the 8th Shows photo spans full width instead of sitting orphaned at half width.

**Step 10 — /conexiones show page (2026-08-03)**
- New nested page `conexiones/index.html` served at `rafaelgmagia.com/conexiones/` — standalone file with embedded CSS/JS duplicated+trimmed from the main page (tokens, reset, utilities, cursor, pill nav, social buttons, footer; no loader, no hero effects). Keep design tokens in sync with `index.html`.
- Content: compact page hero ("Conexiones" + hook line), flyer (`img/conexiones-flyer.jpg`, portrait 960×1280) + synopsis 2-col grid, event-details card (Sáb 29 de agosto · Teatro Ocho, Las Mercedes · puertas 6 PM / show 7 PM · 12+), Ticketplate CTA (`https://bp.ticketplate.com/checkout/conexiones-202607311900/select/Gold`, "Entradas desde Ref. 10 + fee"), gold divider, Instagram reels section (1 official embed live: reel DYm2tfcuRST; embed.js lazy-injected via IntersectionObserver), final CTA band, footer.
- All paths on the subpage are absolute from root (`/img/...`, `/#shows`). OG/Twitter meta with `img/conexiones-og.jpg` (1080×1080). Flyer sources live in `flyer-conexiones/`.
- Main page: added "Conexiones" link to `.nav-links` + `#navDrawer` (nav-only; no homepage section, per Rafael).
- `netlify.toml` CSP loosened for Instagram embeds only: `script-src`/`connect-src` +`www.instagram.com`, new `frame-src https://www.instagram.com`, `img-src` +instagram/cdninstagram.

**Step 11 — /conexiones design overhaul "La cartelera" (2026-08-03)**
- Full redesign of `conexiones/index.html` (client rejected the generic first pass): flyer-first cinematic opening — sticky 195vh act, flyer spotlit alone (gold radial light pools) that recedes/dims via scroll-progress CSS var `--ap` while the hook "¿Es posible leer lo que no se dice?" emerges; then gold event-data ticker (marquesina), giant display heading + italic lede, flyer+synopsis grid, **full-width perforated theater-ticket band** (2×2 data stubs + notched CTA half), reel embed, closing "¿Estás listo para conectar?".
- No eyebrow/kicker pills on this page; headings self-carry. Cursor hidden until first mousemove. Reduced-motion collapses the opening to a static lit composition.
- Impeccable artifacts: `PRODUCT.md` (product truth), `.impeccable/surfaces/conexiones-index-html.md` (surface brief), direction contract as first body comment in the page. `DESIGN.md` written by documenter from the built world.
- Homepage audit findings queued for future overhaul (from detect.mjs): marquee animation, bounce easing (`--ease-spring` in keyframe animations), gold zero-offset glows, nav `transition: width`.

**Step 12 — /conexiones v2 "El escenario": WebGL 3D opening act (2026-08-04)**
- Client rejected the flat v1 opening as too generic (wanted real 3D, near award-site level). Rebuilt the opening act as a WebGL theater stage using **self-hosted three.js r149 UMD at `js/three.min.js`** (MIT; CSP untouched — script-src stays 'self').
- Scene: fog-black stage, flyer as floating textured plane (mouse tilt + idle float), fresnel-shader gold spotlight cone (soft edges), feathered gold floor pool with a live mirrored reflection of the flyer, gold halo behind the flyer, procedural canvas textures only (no asset files): drifting smoke billboards, fine pale dust in the beam, sparse large gold embers.
- Choreography: sticky 260vh act; scroll `--ap` drives an aspect-aware camera dolly (flyer ≤76% of view width at any aspect, baseZ→2.6 through the poster), light dims to black as the hook line emerges, canvas fades and rendering pauses off-screen/hidden tab. Mobile: lower DPR, fewer particles, autonomous camera sway.
- Curtain loader ("CONEXIONES" + gold sweep), lifts on flyer-texture ready, 3.5s failsafe, JS-gated.
- Progressive enhancement: DOM `<img>` flyer + CSS light pools are the default; `body.stage-3d` swaps in the canvas only on successful WebGL init. Reduced-motion: no scene, static lit composition.
- Content sections below the act unchanged from v1.1 (ticker, synopsis grid, ticket band, reel, close).

### 🔲 Remaining before launch
- Contact forms submit via `mailto:` (opens the visitor's mail app). Wire Formspree or EmailJS for real delivery.
- Logos 4–6 in the marquee still have generic `alt="Logo"`; get real names from Rafael.
- Conexiones: reels 2 y 3 pendientes — two commented `.ig-embed-card` slots in `conexiones/index.html` (grep `TODO-PENDIENTE`).
- Conexiones date note: client confirmed Sáb 29 de agosto is correct; the Ticketplate slug (`…202607311900`) is the ticketing site's own misnaming — link verified as the right event.

---

## Key Technical Decisions

- **Single file**: All HTML, CSS, JS in `index.html`. No external files.
- **Relative paths**: Images referenced from project root without moving files.
- **No frameworks**: Vanilla JS, native CSS, no build step.
- **Forms**: UI-only, `action=""` placeholder. Future: EmailJS / Formspree.
- **WhatsApp number**: placeholder `58XXXXXXXXX` — needs real number from client.
- **Logos**: Text-only marquee (Hard Rock Cafe · CAVEP · Farmatodo · Teatrex) — no SVG files available.
- **Particles**: Canvas API, 60 gold particles, upward drift, reinitialize at bottom.
- **Cursor**: Desktop only (`pointer: fine` media query). Dot + lerp ring with 0.12 easing factor.
