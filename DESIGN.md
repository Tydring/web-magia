---
name: Rafael Gorrochotegui — rafaelgmagia.com
description: Gold-lit near-black theater for a magician and mentalist; the artifact (photo, flyer) is the show, the site is the stage light.
colors:
  black-deep: "#080808"
  black-mid: "#111111"
  black-light: "#1a1a1a"
  black-card: "#141414"
  grey-border: "#2e2e2e"
  grey-dark: "#2a2a2a"
  grey-mid: "#555555"
  grey-light: "#888888"
  off-white: "#f0ece4"
  off-white-dim: "rgba(240, 236, 228, 0.6)"
  off-white-muted: "rgba(240, 236, 228, 0.35)"
  gold: "#c9a84c"
  gold-bright: "#e8c96a"
  gold-dim: "#a07830"
  gold-alpha-10: "rgba(201, 168, 76, 0.1)"
  gold-alpha-15: "rgba(201, 168, 76, 0.15)"
  gold-alpha-20: "rgba(201, 168, 76, 0.2)"
  gold-alpha-30: "rgba(201, 168, 76, 0.3)"
  gold-alpha-50: "rgba(201, 168, 76, 0.5)"
  shadow-ink: "rgba(0, 0, 0, 0.5)"
typography:
  display:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(2.4rem, 11.5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)"
    fontWeight: 300
    lineHeight: 1.6
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 300
    lineHeight: 1.75
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 600
    letterSpacing: "0.22em"
  scale:
    micro-1: "0.58rem"
    micro-2: "0.6rem"
    micro-3: "0.62rem"
    micro-4: "0.66rem"
    micro-5: "0.68rem"
    micro-6: "0.7rem"
    micro-7: "0.72rem"
    micro-8: "0.75rem"
    micro-9: "0.78rem"
    ui-1: "0.82rem"
    ui-2: "0.85rem"
    ui-3: "0.88rem"
    ui-4: "0.9rem"
    ui-5: "0.94rem"
    ui-6: "0.95rem"
    ui-7: "0.97rem"
    ui-8: "0.98rem"
    base: "1rem"
    body-lg-1: "1.02rem"
    body-lg-2: "1.05rem"
    body-lg-3: "1.1rem"
    lede-min: "1.15rem"
    hook-min: "1.35rem"
    lede-max: "1.4rem"
    heading-1: "1.6rem"
    stat: "1.7rem"
    heading-2: "1.9rem"
    heading-3: "2rem"
    heading-4: "2.2rem"
    heading-5: "2.3rem"
    heading-6: "2.4rem"
    heading-7: "2.5rem"
    display-1: "2.8rem"
    display-2: "3rem"
    display-3: "3.5rem"
    watermark: "4.5rem"
    display-4: "4.6rem"
    display-5: "6rem"
    display-6: "8rem"
rounded:
  pill: "999px"
  card: "24px"
  drawer: "20px"
  poster: "18px"
  textarea: "16px"
  inset: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  gutter: "40px"
  section: "80px"
  section-lg: "120px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.gold}, {colors.gold-bright})"
    textColor: "{colors.black-deep}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-lg:
    backgroundColor: "linear-gradient(135deg, {colors.gold}, {colors.gold-bright})"
    textColor: "{colors.black-deep}"
    rounded: "{rounded.pill}"
    padding: "16px 40px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-outline-hover:
    backgroundColor: "{colors.gold-alpha-10}"
    textColor: "{colors.gold}"
    rounded: "{rounded.pill}"
  section-tag:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.pill}"
    padding: "5px 16px"
  card:
    backgroundColor: "{colors.black-card}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.card}"
    padding: "40px 36px"
  input:
    backgroundColor: "{colors.black-card}"
    textColor: "{colors.off-white}"
    rounded: "{rounded.pill}"
    padding: "14px 20px"
    height: "50px"
  social-button:
    backgroundColor: "transparent"
    textColor: "{colors.off-white-dim}"
    rounded: "{rounded.pill}"
    padding: "11px 22px"
---

# Design System: Rafael Gorrochotegui — rafaelgmagia.com

## Overview

**Creative North Star: "El Teatro a Oscuras" (The Darkened Theater)**

Every surface is a stage with the house lights off. The page background is near-black (#080808), and gold behaves like stage light, not paint: it appears as radial glows, hairline borders at alpha steps, thin gradient lines that fade to transparent, and tiny tracked-out labels. The subject of each page — a photograph, the show's flyer — is the performer; the interface frames and illuminates it without competing. On /conexiones this is literal: the client's flyer sits alone in a spotlight (`--ap` scroll act) before any copy appears.

The voice alternates between two registers: an announcer's whisper (small 600-weight uppercase labels with very wide tracking, up to 0.34em) and a marquee shout (900-weight display type with negative tracking and sub-1 line-height). Body copy sits at a light 300 weight; the emotional voice — slogans, ledes, the show's hook — is 300 italic. Everything with a corner is soft: pills, 24px cards, 16px textareas.

The system is built for static single-file pages (embedded CSS/JS, no build step). Tokens are duplicated in each page's `:root` (/index.html and /conexiones/index.html) and must be kept byte-identical across files.

**Key Characteristics:**
- Near-black tonal stage; gold used as light (glow, hairline, label), never as a large painted surface
- Two-register Montserrat: 900 tight display vs. 600 tiny wide-tracked uppercase labels; 300 body, 300 italic voice
- Pill-everything shape language: 999px controls, 24px cards, 16px textareas, no sharp corners
- Spring motion (`cubic-bezier(0.16, 1, 0.3, 1)`) for reveals and hovers; linear loops for marquees/tickers
- The client artifact (photo, flyer) is always the brightest, most saturated thing on screen

## Colors

A four-step black stage lit by a three-step gold, with warm off-white for everything that speaks.

### Primary
- **Stage Gold** (#c9a84c, `--c-gold`): the single accent. Labels, section tags, ticker text, icons, stat values, the solid cursor dot, scrollbar hover, text selection background. Start of the primary CTA gradient.
- **Footlight Gold** (#e8c96a, `--c-gold-bright`): the hotter end of the gold gradient; hover/active text state (nav active links, social button hover, enlarged cursor ring); italic emphasis inside dark copy.
- **Ember Gold** (#a07830, `--c-gold-dim`): receded gold — scrollbar at rest, scroll-cue text, card age-tags, ticker separators.
- **Gold alpha ramp** (rgba(201,168,76,·) at 0.10 / 0.15 / 0.20 / 0.30 / 0.50): the workhorse. 0.15 for nav/section hairlines, 0.30 for emphasized borders (section tags, ticket band), 0.10 for hover fills, 0.50 for the strongest glow shadows. Most gold on any page is one of these, not the solid hex.

### Neutral
- **Stage Black** (#080808, `--c-black-deep`): page background and text-on-gold. The darkest value; nothing is pure #000.
- **Wings Black** (#111111, `--c-black-mid`): alternate section background (ticker band, footer, scrollbar track).
- **Prop Black** (#141414, `--c-black-card`): card, input, and ticket surfaces.
- **Lifted Black** (#1a1a1a, `--c-black-light`): gallery-item placeholder surface.
- **Hairline Grey** (#2e2e2e, `--c-grey-border`): resting 1px border on cards, inputs, social buttons.
- **Ash Greys** (#2a2a2a / #555555 / #888888): loader track; footer meta and placeholders; marquee names and select chevron.
- **Candlelight White** (#f0ece4, `--c-off-white`): all primary text and headlines — warm, never pure #fff.
- **Candlelight Dim / Muted** (rgba(240,236,228,0.6) / 0.35): body copy, nav links, ledes / form labels, fine print, stat labels.
- **Shadow Ink** (rgba(0,0,0,·) at 0.15–0.85): translucent pure black used only inside box-shadows, text-shadows, and gradient scrims — never as a surface or text color. Observed steps: 0.3 (social hover), 0.4 (scrolled nav), 0.5 (card lift), 0.55/0.7 (image scrims), 0.75/0.85 (artifact drops, hook text-shadow).

### Named Rules
**The Gold-Is-Light Rule.** Gold arrives as illumination — radial glows, hairline alpha borders, 1px gradient lines fading to transparent, tiny labels, hover halos. The only solid gold fill on the site is the primary CTA's 135° gold→bright-gold gradient. Never paint a large surface opaque gold.

**The One-Loud-Color Rule.** The Conexiones flyer's red (and any client artwork color) belongs to the artwork, not the palette. Photography and flyers are the only saturated non-gold color on any page; the UI never adopts their hues.

## Typography

**Display Font:** Montserrat (sans-serif fallback) — weights 300–900 plus 300/400 italic
**Body Font:** Montserrat (same family; the system is single-typeface by client commitment)

**Character:** One typeface, two extremes. Density and weight do the work a second family would: crushing 900 caps with negative tracking against featherweight 300 body and airy micro-labels tracked out to letter-spaced whispers.

### Hierarchy
- **Display** (900, clamp(2.4rem, 11.5vw, 6rem) on /conexiones; up to clamp(2.2rem, 9.5vw, 8rem) on the homepage hero; line-height 0.92, letter-spacing -0.03em, usually uppercase): page-defining names and show titles. Often carries one gold character or word (`<i>` / `.name-gold`).
- **Headline** (900, clamp(2rem, 4vw, 3.5rem), letter-spacing -0.025em): section titles (`.section-title`, `.reels-heading`, `.final-cta h2`). Scales down to ~clamp(1.6rem, 2.8vw, 2.3rem) inside bio/contact contexts.
- **Title** (700, 1.05rem, letter-spacing -0.01em): card titles, marquee brand names.
- **Lede / Voice** (300 italic, clamp(1.15rem, 1.8vw, 1.4rem), off-white-dim): slogans, show ledes, the spotlit hook question. Italic 300 is the site's "spoken" register; gold-bright `<em>` marks the key phrase.
- **Body** (300, 0.88–1.02rem, line-height 1.75–1.88, off-white-dim, max ~46–58ch): paragraphs. Inline `<strong>` at 600 in full off-white is the only in-paragraph emphasis.
- **Label** (600, 0.6–0.78rem, uppercase, letter-spacing 0.07em on buttons/nav up to 0.22–0.34em on tags, billing lines, and tickers): every small functional text — nav links, buttons, form labels, stub labels, footers.

### Scale
The full enumerated ramp lives in the frontmatter `typography.scale`. It reads as four families: **micro-labels** (0.58–0.78rem — scroll cues, tags, tickers, stub labels, nav links, footer meta), **UI/body steps** (0.82–1.1rem — buttons, card copy, inputs, bio text, marquee names, logo), **fluid clamp endpoints** (1.15–3.5rem plus 4.6/6/8rem — every heading is a `clamp()` whose min and max land on documented steps), and **singletons** (1.7rem stat values, 4.5rem watermark numerals). New sizes join the ramp deliberately or not at all.

### Named Rules
**The Whisper/Shout Rule.** Only two voices exist above body size: the 900-weight negative-tracked shout and the tiny 600-weight wide-tracked uppercase whisper. Nothing lands in between — no 500-weight mid-size headings.

## Layout

- **Container:** 1200px max-width (`--container`), 40px side gutters, 24px below 480px. Contact forms narrow to 720px; tier grids to 820px.
- **Rhythm:** big-block vertical padding of 80–130px per section; intra-section gaps of 10px (gallery), 16px (forms), 20–24px (cards). Section headers sit 48–72px above their content.
- **Galleries:** asymmetric 12-column grid with fixed row heights (300/220/200px, auto 230px); one dominant tall item spanning ~half the width and two rows, the rest tiling around it. Collapses to a 2-column 4:3 grid at 768px with the first (and any orphan last) item full-width 16:9.
- **Splits:** 42/58 bio panels inside a single 24px-radius card, portrait on either side; single column at 768px, portrait always first.
- **Breakpoints (desktop-first):** 1024px (3→2 card columns), 960/961px (show grid and ticket stack), 768px (single column, bio stack), 600px (nav collapses to hamburger drawer), 480px (tight gutters, stacked CTAs). Must work to 375px.
- **/conexiones opening act:** a 195vh section with a sticky 100dvh stage; scroll progress is written to `--ap` (0→1) by rAF-throttled JS, and CSS derives everything from it — spotlight decay, flyer scale/brightness recession, hook reveal. Under `prefers-reduced-motion` the act becomes a static stacked layout.

## Elevation & Depth

Depth is tonal and linear, not shadowed. Surfaces step up through the black scale (#080808 page → #141414 cards → #1a1a1a) and are separated by 1px hairlines — grey (#2e2e2e) at rest, gold-alpha (0.15–0.30) when the element matters or is hovered. Fixed chrome (nav, drawer) floats on translucent black with 18–20px backdrop blur instead of shadow. Shadows exist only in two roles: large soft black drops under things that lift or float (cards on hover, the spotlit flyer, the scrolled nav) and gold glows that read as light.

### Shadow Vocabulary
- **Card lift** (`0 20px 60px rgba(0,0,0,0.5), 0 0 40px var(--c-gold-alpha-10)`): hover state of service/tier cards, paired with translateY(-6px).
- **CTA glow** (`0 0 28px var(--c-gold-alpha-50), 0 0 56px var(--c-gold-alpha-20)`): primary button hover — deliberately zero-offset, pure halo.
- **Floating chrome** (`0 8px 32px rgba(0,0,0,0.4)`): scrolled navbar.
- **Artifact drop** (`0 34px 90px -24px rgba(0,0,0,0.85)` / `0 28px 70px -18px rgba(0,0,0,0.75)`): the flyer, staged like a physical poster.
- **Focus halo** (`0 0 0 3px var(--c-gold-alpha-10)` + gold-alpha-50 border): form focus.

### Named Rules
**The Hairline Rule.** Structure is drawn, not cast: every surface boundary is a 1px border or a tonal step. Shadows are reserved for state (hover, focus, scrolled) and for staging the client artifact.

## Shapes

Everything curves. Interactive single-line elements — buttons, nav pills, tags, inputs, selects, badges, hamburger bars, scrollbar thumb — are full pills (999px). Containers — cards, galleries, bio panels, the ticket, embed cards — are 24px. Textareas are 16px. Three narrower steps are canon: 20px for the mobile nav drawer, 18px for the spotlit poster/flyer, and 12px for inset media rounded inside a 24px card (embed inner). Circles recur as punctuation: cursor dot and ring, marquee dot separators, the ticket's punched notches (24px circles in page-black with a gold-alpha border). Signature geometry: the perforated theater ticket — a 24px card split by a 1px dashed gold-alpha-30 rule with notch cutouts at both ends; and the ✦ four-pointed star as the brand's ornament (dividers, ticker separators). Sharp 90° corners do not appear in site chrome (third-party embeds excepted).

## Components

### Buttons
- **Shape:** full pill (999px), uppercase 600-weight label at 0.82rem / 0.07em tracking (0.88rem for `.btn-lg`).
- **Primary:** 135° gold gradient (#c9a84c→#e8c96a) with stage-black text; 14px 32px padding (16px 40px large). A white sheen (`::after` diagonal band at 0.28 alpha) sweeps across on hover.
- **Hover:** translateY(-2px) + zero-offset double gold glow (intentional site-wide signature, not a defect).
- **Outline:** transparent, 1px solid gold border, gold text; hover fills gold-alpha-10 with a soft gold glow.
- **Social:** transparent pill, hairline grey border, dim off-white label + 15px inline SVG; hover shifts to gold-alpha border, gold-bright text, gold-alpha-10 fill, -2px lift.

### Chips / Tags
- **Section tag** (`.section-tag`, `.hero-eyebrow`): transparent pill, 1px gold-alpha-30 border, gold uppercase micro-label (0.68rem, 0.20–0.28em tracking). Used on homepage section headers; /conexiones deliberately omits it — its whisper register is the un-bordered billing line and stub labels instead. The pill tag is available, not mandatory.

### Cards / Containers
- **Corner:** 24px. **Background:** #141414 on the #080808 page. **Border:** 1px #2e2e2e at rest → gold-alpha-30 on hover. **Padding:** 40px 36px.
- **Watermark numeral:** 900-weight 4.5rem gold number at 0.07 opacity in the top-right, rising to 0.13 on hover.
- **Icons:** 26px inline stroke SVGs (stroke 1.5, round caps) in gold. No icon fonts, no emoji/unicode glyph icons in cards.
- **Hover:** -6px lift + card-lift shadow.

### Inputs / Fields
- **Style:** #141414 fill, 1px #2e2e2e border; single-line inputs and selects are 50px-tall pills; textareas 16px radius, min-height 130px. Labels are muted uppercase micro-labels above the field.
- **Select:** appearance-none with an inline grey SVG chevron, right 18px.
- **Focus:** border to gold-alpha-50 + 3px gold-alpha-10 halo. Placeholders in #555555.

### Navigation
- **Fixed pill** centered 1.5rem from the top, max 680px: rgba(17,17,17,0.75) + 18px backdrop blur, 1px gold-alpha-15 border. Scrolled: darker (0.92), gold-alpha-20 border, floating-chrome shadow.
- **Links:** uppercase micro-labels in dim off-white, pill hit-areas; hover = white text on rgba(255,255,255,0.05); active = gold-bright on gold-alpha-15 pill. Logo "RG" in 900-weight gold.
- **≤600px:** hamburger (three pill bars morphing to an X) opens a 20px-radius blurred drawer below the pill.

### Marquees & Ticker
- **Logo marquee** (homepage): light band (rgba(240,236,228,0.06)) with grey uppercase brand names and gold-alpha dot separators; 22s linear loop, duplicated `.marquee-items` for seamlessness, reverse direction available (`.marquee-rtl`), hover pauses.
- **Event ticker** (/conexiones, `.ticker`): #111111 band between gold-alpha-15 hairlines; gold uppercase micro-text at 0.26em tracking with ember-gold ✦ separators; 30s linear loop, hover pauses, static single copy under reduced motion.

### Theater Ticket (signature, /conexiones)
A 24px-radius #141414 band with a gold-alpha-30 border, split ~1.9fr/1fr by a 1px dashed gold rule with 24px punched-notch circles at its ends. Left: a 2-column grid of stub-label (gold micro-label) / stub-value (700-weight off-white) pairs. Right: price micro-label + primary CTA. Stacks vertically at 960px, notches rotating to the horizontal rule.

### Custom Cursor (desktop only)
8px solid gold dot + 36px lerp-following ring (1.5px gold at 0.7 alpha, 0.12 easing). Over links/buttons the ring grows to 60px gold-bright and the dot hides. Hidden until first mousemove (`body.cursor-active`) and entirely absent on coarse pointers.

### Motion Grammar
- **Reveals:** `.fade-up` — opacity 0 / translateY(32px) → visible over 0.8s on `--ease-spring` (cubic-bezier(0.16,1,0.3,1)), fired by IntersectionObserver at 0.12 threshold with optional `data-delay` stagger (100–300ms steps).
- **Hovers:** spring-eased lifts (-2px buttons, -6px cards), image scale 1.04–1.06 with brightness restore.
- **Loops:** strictly linear (marquee, ticker, scroll-cue pulse).
- **Scroll-driven:** rAF-throttled scroll writing CSS variables (`--hero-parallax`, `--ap`); CSS owns the mapping.
- **Reduced motion:** honored globally — fade-ups render visible, loops stop, parallax/particles/sticky acts become static.

## Do's and Don'ts

### Do:
- **Do** keep every page's `:root` token block identical across files — tokens are duplicated per single-file page and drift is a bug.
- **Do** draw structure with 1px hairlines (grey at rest, gold-alpha for emphasis/hover) and tonal black steps; reserve shadows for state and for staging artifacts.
- **Do** set all small functional text as 600-weight uppercase micro-labels with wide tracking (≥0.07em; 0.2em+ for tags/tickers/billing lines).
- **Do** use `--ease-spring` for every reveal and hover transition, and linear timing only for infinite loops.
- **Do** provide a `prefers-reduced-motion` fallback for every animation, including scroll-driven acts (static layout, visible content).
- **Do** let client artwork (flyers, photos) be the only saturated, bright element in view; dim it (brightness filters, gradient scrims) only to protect text legibility.
- **Do** end every page in exactly one primary action (gold gradient pill CTA).

### Don't:
- **Don't** introduce hues outside black/off-white/gold into UI chrome; artwork colors (the flyer's red) stay inside the artwork.
- **Don't** use sharp corners anywhere in site chrome — pills for controls (999px), 24px for containers, 16px for textareas.
- **Don't** use pure #fff or #000; text is Candlelight White #f0ece4 and the darkest surface is #080808.
- **Don't** paint large surfaces solid gold; the CTA gradient is gold's only opaque fill.
- **Don't** use unicode glyphs or emoji as component icons — inline stroke SVGs only. (The ✦ star is exempt: it is the brand ornament for dividers and ticker separators, not an icon.)
- **Don't** add a second typeface; Montserrat 300–900 (+ italic) is a binding client commitment.
- **Don't** treat the pill section-tag as mandatory framing — /conexiones ships without eyebrow pills and that restraint is part of its staging.

### Documented Exceptions (out of scope for audits)
**The Instagram embed** in /conexiones/index.html (`blockquote.instagram-media` and its inline markup) is verbatim third-party code required by Instagram's embed contract. Its Arial stack, 14px/18px sizes, white/grey/blue palette (#FFF, #F4F4F4, #3897f0, #c9c8cd, #000000), and 3–4px radii are not part of this design system and must not be imitated, "fixed", or used to justify new tokens. The site's only concession to it is the `.ig-embed-card` frame (24px card, 12px inset).
