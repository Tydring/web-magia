# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Ticket-buying public in Caracas for live shows (the /conexiones surface): fans of magic/mentalism deciding whether to attend "Conexiones" and buying via Ticketplate. [inferred from show context]
- Event bookers — private hosts, corporate planners, wedding couples — evaluating Rafael for hire (homepage Shows block).
- Parents of children/teens (6–17) evaluating magic classes (homepage Clases block).

## Product Purpose

Professional web presence for Rafael Gorrochotegui, magician and mentalist in Caracas, Venezuela. The site sells three things: bookable shows, magic classes, and tickets to live productions (currently "Conexiones"). Success = booking inquiries and ticket purchases.

## Positioning

Award-winning mentalist with 10+ years performing across Guatemala, Chile, Colombia, Países Bajos and España; fuses high-class illusionism with mentalism. Current flagship: "Conexiones", a magic & mentalism show produced by Producciones Dionisíacas.

## Operating Context

- Static site on Netlify at rafaelgmagia.com; single-file pages (embedded CSS/JS), no frameworks, no build step.
- Strict CSP in netlify.toml (self + Google Fonts + Instagram embed domains only).
- Spanish-only copy. Desktop-first, must work to 375px.
- Ticket sales happen off-site at Ticketplate (`https://bp.ticketplate.com/checkout/conexiones-202607311900?type=seats`).

## Capabilities and Constraints

- Contact forms are mailto-based (real delivery service pending).
- Conexiones show facts (from the client's flyer and notes): Sábado 29 de agosto · Teatro Ocho, Las Mercedes, Caracas · doors 6:00 PM, show 7:00 PM · ages 12+ · tickets "desde Ref. 10 + fee" · sales final, no refunds. RESOLVED (2026-08-03): client confirmed Aug 29 is correct; the Ticketplate slug `conexiones-202607311900` is just the ticketing site's own naming mistake — the link is the right one.
- Production credits on flyer: Producción general Dennys Alexander Ledezma; asistencia de escena Gadir Garmendia; asistencia general Rudén Rodríguez; fotografía/arte/iluminación Shonny Romero. Sponsors/venues on flyer: Producciones Dionisíacas, Shanklish Caracas, Ticketplate, Teatro Ocho, Baruta.

## Brand Commitments

- Typeface: Montserrat (300–900 + italics) — binding, user-pinned.
- Palette: deep blacks (#080808/#111/#141414), off-white #f0ece4, gold #c9a84c / #e8c96a / #a07830 — binding, user-pinned.
- Shape rule: pills (999px) for buttons/nav/tags, 24px cards, 16px textareas, no sharp corners — binding.
- Gold ✦ motif in dividers. Custom gold cursor on desktop.
- The Conexiones flyer artwork (black cage, red eye-band, smoke, condensed caps) is client-supplied and authoritative for the show's identity; its red accent belongs to the flyer, not the site palette.
- Voice: elegant, direct Spanish; second person ("descubrirás", "¿Estás listo para conectar?").

## Evidence on Hand

- Flyer originals: `flyer-conexiones/` (portrait 960×1280, square 1080×1080, story 720×1280); optimized copies `img/conexiones-flyer.jpg`, `img/conexiones-og.jpg`.
- Client-written synopsis for Conexiones (in use on /conexiones): tarot, Cubo Rubik, "romper tus propias jaulas mentales", hook "¿Es posible leer lo que no se dice?".
- One Instagram reel embed authorized: `https://www.instagram.com/reel/DYm2tfcuRST/` (@rafaelgmagia). Reels 2–3 pending from client.
- Show/press photos in `img/` and source folders. Client logos (Hard Rock Cafe, CAVEP, Farmatodo, Teatrex) as text/webp marquee.
- No testimonials, reviews, or attendance figures on hand — do not fabricate.

## Product Principles

1. The artifact leads: client-supplied artwork (flyers, photos) is the show's identity; the site frames it, never competes with it.
2. Every surface ends in one real action (book, inquire, buy tickets) — keep the path to it unmissable.
3. Elegance over spectacle-chrome: the magic is Rafael's, not the website's; restraint and craft signal the premium tier.
4. Truth only: dates, prices, venues, and credits come from the client; placeholders are explicit TODOs, never invented.
