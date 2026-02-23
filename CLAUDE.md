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
| `DSC_1018.jpg` | Same pose, clean teal background, no smoke — Shows gallery #6 |
| `DSC_1018.png` | Duplicate of above — **skip** |
| `DSC_1035.jpg` | Hand reaching toward camera, teal bg — Clases gallery #4 |
| `DSC_1035CH.jpg` | Same + blue smoke composite — Shows gallery #1 |
| `DSC_1040.jpg` | Dramatic side profile, clean teal — Clases gallery #5 |
| `DSC_1040CH.jpg` | Same profile + blue smoke — Shows gallery #2 |

### Folder 2 — `Press Kit-20260223T224133Z-1-001/Press Kit/`
Black bg B&W formal shots + grey bg color professional shots.

| File | Description |
|------|-------------|
| `Copy of RAFAEL ALTA-12.jpg` | B&W, tuxedo + bow tie, magic wand — Shows gallery #3 |
| `Copy of RAFAEL ALTA-18.jpg` | B&W, tuxedo + bow tie, linked metal rings — Shows gallery #4 |
| `Copy of RAFAEL ALTA-19.jpg` | B&W, tuxedo + bow tie, coins in hand — Shows gallery #5 |
| `DSC_0281.jpg` | Color, grey bg, full-body 3-piece suit — **Shows biography photo** |
| `DSC_0295.jpg` | Color, grey bg, hand raised near ear (mentalist) — Clases gallery #1 |
| `DSC_0306.jpg` | Color, grey bg, seated on stool, hand at temple — Clases gallery #2 + **Clases biography photo** |
| `DSC_0309.jpg` | Color, grey bg, seated, direct gaze — Clases gallery #3 |

### Image Assignment Summary
- **Hero**: `FOTOS RAFA 2026.../CH.jpg`
- **Shows gallery** (6): DSC_1035CH, DSC_1040CH, RAFAEL ALTA-12, RAFAEL ALTA-18, RAFAEL ALTA-19, DSC_1018
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

**Step 1 — Base structure** (committed to file)
- DOCTYPE, lang="es", meta description, viewport, full title
- Google Fonts import (Montserrat 300–900 + italic)
- All CSS custom properties (full color palette, radii, timing tokens)
- Full CSS reset
- Global utility classes: `.container`, `.section-tag`, `.section-title`, `.section-subtitle`, `.btn`, `.btn-primary`, `.btn-outline`, `.btn-lg`, `.gold-divider`, `.fade-up`
- Custom scrollbar, gold text selection

**Step 2 — Loader + Nav** (committed to file)
- Loader: full-screen overlay, animated name, gold progress bar (0→100% in 1.2s), fades out after 1.8s, sets `body.loaded`
- Nav: fixed pill, glass blur, gold border, `.scrolled` state on scroll
- Nav: desktop links (Shows · Clases · Contacto) with pill active state
- Nav: mobile hamburger → animated X → pill drawer dropdown
- JS: loader sequence, custom gold cursor (dot + lerp ring), nav scroll/hamburger/active-link IntersectionObserver, global fade-up IntersectionObserver + MutationObserver

---

### 🔲 Still to Build

**Step 3 — Hero section**
- Full-screen 100dvh, CH.jpg background with brightness(0.35) filter
- Parallax: `translateY(scroll * 0.4)` via CSS variable + rAF
- Canvas particle layer (60 gold particles, slow upward drift)
- Radial gradient overlay
- Content: eyebrow tag · H1 name · slogan · two CTA buttons (primary + outline) · scroll indicator arrow
- Staggered fade-in after loader: eyebrow → name → slogan → CTAs → arrow (0/150/300/450/600ms delays)

**Step 4 — Shows section**
- Section header (centered: tag + H2 + subtitle)
- Asymmetric photo gallery grid (12-column CSS Grid, 6 photos, exact nth-child placement from plan)
- 6 service cards (3-col grid, watermark number, icon, hover lift + gold glow)
- Biography block (60/40 split, DSC_0281 portrait, bio text, 3 stats)
- Logo marquee (left-scrolling, text names, pause on hover)
- Contact form (name · email · select · textarea · submit CTA)
- Social links row (Instagram · TikTok · WhatsApp — pill outline buttons)

**Step 5 — Clases section**
- Gold divider (✦) between Shows and Clases
- Section header
- Photo gallery grid (same structure, 5 photos from Clases set)
- 2 tier cards (Niños + Jóvenes, side-by-side, max-width 800px)
- Biography block (40/60 split — FLIPPED, DSC_0306 portrait on right)
- Logo marquee (right-scrolling — opposite direction)
- Contact form (tutor name · email · age select 6–17 · textarea · submit CTA)
- Social links row
- Footer

**Step 6 — Scroll animations**
- Wire up `data-delay` attributes on all gallery items, service cards, stats
- Staggered card entrance delays
- Verify all `.fade-up` elements are correctly observed

**Step 7 — Visual effects**
- Floating particle canvas (already planned in hero, extracted to global background layer)
- Custom gold cursor hover states (already initialized, needs interactive element hookup)
- Button shimmer sweep on hover (already in CSS via `::after`)
- Gallery hover: scale image + fade overlay

**Step 8 — Mobile responsiveness**
- Breakpoints: 1024px (tablet), 768px (mobile L), 480px (mobile S)
- Gallery grid: 2-col tablet → 1-col mobile
- Service cards: 3-col → 2-col → 1-col
- Bio: 2-col → stacked
- Hero text sizing with clamp()
- CTAs: stacked on mobile
- Nav: hamburger already done

**Step 9 — Final polish**
- Spacing consistency pass
- Transition smoothness check
- Typography hierarchy review
- Cross-section consistency (both sections look like siblings)
- Lazy loading on all images except hero
- `will-change` cleanup

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
