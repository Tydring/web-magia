# Design Map

Source: https://london.derrenbrown.co.uk — "Derren Brown: Only Human Live" (Apollo Theatre, West End)

## Spacing Scale
- No mathematical base unit — optical/poster composition
- Component level: 5px (×88), 10px (×34), 17.5px (form grid gap)
- Block level: 28px (×13), 42px (×5), 56px (×3)
- Deliberate negative overlaps: −11px margins ×20 (collage layering)

## Font Hierarchy
- Display: **image assets** — no live h1–h6 anywhere; title lockup is a 2000×955 webp
- Lede: 23.8px / 700 / line-height 1.7 — `brother-1816`
- Editorial: 21px / 500 — `brother-1816`
- Date band (footer): 42px / 500 — `asap-condensed`
- Nav: 14px / 500 — uppercase, wide tracking
- CTA (BOOK NOW): 10px / 600 — uppercase (smallest text on the page)
- Form labels: 9.8–11.2px / 500 — uppercase, tracked

## Color Palette
- `#000000` — stage background, 66.8% of painted area
- `#FFFFFF` — primary text
- `#B2D1D1` — ice-teal chrome: secondary text, borders, glow shadows, social buttons
- `#05F2DB` — electric cyan: interactive states ONLY (links, hover)
- Atmosphere: teal/cyan photographic gradient field (delivered as imagery, not CSS)
- Zero pure grays — every neutral is teal-tinted

## Image Ratios
- Hero composite: 0.85:1 (2000×2360, portrait)
- Title lockup: 2.09:1
- Video poster: 16:9
- Gallery stills: 1.50–1.62:1 (3-col, ~390px wide)
- Map band: 2.48:1

## Component Tokens
- Radius: 0px (photos/media) · 5px (CTA) · ~6px (video frame) · 14px (panel) · 1400px (pill form fields) — nothing in the 8–20px "friendly card" middle band
- Shadows (glow system):
  - `#B2D1D1 0 0 10px 1px` + `#000 0 0 70px 2.8px inset` (glow + vignette)
  - `rgba(178,209,209,.486) 0 0 12.8px 1.1px, rgba(178,209,209,.22) 0 0 32.8px 4.6px` + black inset (double halo)
  - `rgba(0,0,0,.19) 0 10px 20px, rgba(0,0,0,.23) 0 6px 6px` — BOOK NOW only, the sole offset shadow on the page
- Grid: no max-width (full-bleed); 3-col gallery ~390px / ~30px gutters; 2-col form 262px + 17.5px gap
- Motion: single token — 0.3s `cubic-bezier(0.4, 0, 0.2, 1)` on opacity/transform/color/`text-shadow`/`box-shadow`/border-color/filter; `prefers-reduced-motion` and `:focus-visible` both present

---

# Taste DNA

### The Poster Is the Website
- **Trigger**: When the show's chromatic-aberration title treatment had to survive the trip from print campaign to browser…
- **Decision**: Shipped all headline typography as image assets (2000×955 webp lockup, 2000×2360 hero composite) with **zero** live HTML headings, over rebuilding the lockup in webfonts + CSS effects.
- **Reason**: A theatergoer who saw the tube poster must land on a page that is *the same object* — any webfont approximation of the glitch-RGB "ONLY HUMAN" would register as a knockoff of the thing it's advertising.
- **Evidence**: `headings: {}` in extraction; title lockup delivered as 2000×955 webp; the only live display type is the footer date band in `asap-condensed`.

### Depth Comes From Light, Not Gravity
- **Trigger**: When components needed separation from a pure-black stage where a conventional dark drop shadow would be invisible…
- **Decision**: Built elevation from emitted light — zero-offset `#B2D1D1` glows (10–33px blur, 1–3 layers) paired with black *inset* vignettes — over borders, surface-color steps, or offset shadows; reserved the page's only offset black shadow for the BOOK NOW button.
- **Reason**: In a theater nothing casts shadows downward; things are lit or unlit. Glowing edges read as spotlights and signage, and the lone object with physical weight is the one you're asked to press — the ticket button.
- **Evidence**: 5 of 6 measured shadows are teal zero-offset glows; BOOK NOW carries `rgba(0,0,0,.19) 0 10px 20px` + a second black layer; hover animates `text-shadow`/`box-shadow` on the shared 0.3s token — light levels are the feedback channel.

### One Gel, Three Intensities
- **Trigger**: When UI chrome (nav, forms, socials, footer) had to coexist with heavily art-directed teal photography…
- **Decision**: Locked every CSS color to the photograph's own axis — black stage, `#B2D1D1` ice-teal for all chrome, `#05F2DB` electric cyan strictly for interactive states — over introducing even one neutral gray or a contrasting CTA color (the theater-marketing default is a red/orange BOOK NOW).
- **Reason**: A second hue would sit *on top of* the scene; keeping chrome on the image's color axis makes buttons and labels feel lit by the same rig as the performer's face, so the interface disappears into the production.
- **Evidence**: Zero pure grays (one incidental `#999` in 391 elements); `#05F2DB` appears only on links/hover (20 interactive uses); `#B2D1D1` triples as text, border, and glow color.

### Chrome Whispers So the Act Can Shout *(restraint)*
- **Trigger**: When sizing the functional layer — nav, CTA, form labels — against a full-viewport portrait…
- **Decision**: Pushed UI type *down* as priority went up: BOOK NOW at 10px/600 is the smallest text on the page, nav at 14px tracked caps, labels at 9.8–11.2px — over the conventional oversized hero CTA; refused card containers everywhere except the one panel that collects input.
- **Reason**: Every pixel of loud UI is a pixel of broken illusion. Tracked uppercase micro-type reads as engraved front-of-house signage — findable when you want a ticket, invisible when you're watching the star.
- **Evidence**: CTA is 10px/600/uppercase — the smallest font on the page; 14px is the modal text size (×29) while 21px+ is reserved for editorial ledes; `cards: []` — zero card components detected; the largest CSS grid on the page is a 2-col form row.
