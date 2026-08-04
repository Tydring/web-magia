---
version: 1
slug: "conexiones-index-html"
primary_target: "conexiones/index.html"
related_targets: []
---

# Surface brief: /conexiones (conexiones/index.html)

## Scope & mode
Show landing page for "Conexiones" at rafaelgmagia.com/conexiones. Mode: Persuade — the visitor decides to attend and buys a ticket on Ticketplate.

## Audience, job, action
Caracas ticket-buying public evaluating the show. Job: understand what Conexiones is, when/where, and buy. Primary action: the Ticketplate CTA (appears twice: in the perforated ticket band and the final close).

## Proof / content
Client-supplied flyer artwork is the identity anchor (only image on the page; its red is the only loud color). Client-written synopsis. One Instagram reel embed (DYm2tfcuRST); two commented slots for reels 2–3. Event facts from the flyer: Sáb 29 agosto, Teatro Ocho Las Mercedes, doors 6 PM / show 7 PM, 12+, desde Ref. 10 + fee, ventas definitivas.

## Chosen direction
"La cartelera" — theater poster wall at night, client-pinned structure (flyer-first cinematic opening → scroll reveals flyer again with full info). Sticky 195vh opening act driven by a scroll-progress CSS variable (--ap): spotlit flyer recedes/dims while the hook line "¿Es posible leer lo que no se dice?" emerges. Then: gold event-data ticker (marquesina), display heading + lede, flyer+synopsis grid, full-width perforated theater-ticket band with the CTA, reel, closing question. No eyebrow/kicker pills; headings carry their own weight.

## Memorable moment
The opening act: flyer alone under a gold spotlight that dies as the question surfaces from the dark.

## Constraints
Site design language pinned: Montserrat, blacks #080808/#111/#141414, gold #c9a84c family, pill 999px + 24px card radii, Spanish. Single-file page (embedded CSS/JS), absolute root paths, Netlify CSP allows only instagram.com beyond self/fonts. Reduced motion collapses the opening to a static composition.

## Unresolved
- Reels 2–3 pending (commented .ig-embed-card slots, grep TODO-PENDIENTE).

(Resolved 2026-08-03: client confirmed Sáb 29 agosto is correct; the Ticketplate slug's 2026-07-31 encoding is the ticketing site's own misnaming — link verified.)
