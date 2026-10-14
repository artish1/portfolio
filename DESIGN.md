# Design

The visual system for markartishuk.com. Read with `PRODUCT.md`, which covers audience, positioning and content rules.

## Idea

**Show the result, not the page.** Every project on the home page leads with one real detail of what it does (the map search, the live availability grid, the event counter) or, when there are no screenshots, the outcome set as type ("20+ → 0"). The page reads like a spec sheet: heavy rules, big numbers, plain labels.

## Type

- **Display:** Bricolage Grotesque (`--font-display`, class `.display`), condensed with `font-stretch` 80–90% and tight negative tracking. Weights 700 for headings, 800 for the name, the lead figure and the contact heading.
- **Text:** Instrument Sans (`--font-sans`) for everything else.
- **Scale:** 13 (years, roles, captions only) · 15 (secondary text, notes) · 17 (body, lead, project one-liners) · 34–44 (section and project titles) · 56–168 (name, lead figure, contact heading).
- Figures use lining, tabular numerals.

## Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f3efe9` | `#161213` | Page |
| `--surface` | `#faf8f4` | `#201a1c` | Hover fills, image wells |
| `--ink` | `#1b1517` | `#efe8e6` | Headings, heavy rules |
| `--ink2` | ink at 76% | ink at 76% | Body |
| `--ink3` | ink at 66% | ink at 62% | Meta, captions (≥4.5:1 at 13px) |
| `--line` | ink at 14% | ink at 12% | Hairlines |
| `--accent` | `#8c1c2e` | `#ff8a96` | The lead figure, links, primary buttons, active nav |

One accent, used sparingly. The green dot on "Live" tags is the only other colour. No gradients, textures or decorative shapes.

## Structure

- **Bar:** section links on the left, Resume, email address and copy on the right. The name slides in before the links once the hero name scrolls away.
- **Hero:** eyebrow, name, lead paragraph on the left; the 77% figure at name scale on the right, with two smaller figures under a heavy rule.
- **Sections** open with a 2px ink rule, the title, and a note on the same line.
- **Work rows:** text left (title, one-liner, how it was built, role and year, "Read the case study"), figure right (cropped close-up with a caption saying what it shows). Close-ups are set per project in `projects.ts` (`thumb.pos`, `thumb.zoom`, up to 2.2×). Crop on purpose into the detail the caption names, never through UI chrome; a figure has to prove its caption at thumbnail size. Avoid two dark figures in a row.
- **Experience** is a timeline: period on the left, role on the right. Only the current role has bullets.
- **Contact:** heavy rule, large heading, email with copy, Resume, LinkedIn, GitHub.
- **Case study bar:** mirrors the home bar so only the content changes between pages: the name (links to the top of home) and "← All work" on the left; Resume, the email address and copy on the right. On phones: "← All work", Resume, Email.
- **Case study (`/work/[slug]`):** same 1200px frame as home. Title (cols 1–2) and outcome with live/source buttons (col 3), then a heavy rule over Role · Timeline · Code ("Private. Ask me for a walkthrough" opens a pre-filled email), with Stack as one plain line beneath. Tools a key decision rests on (`tools` on the decision) are set in the accent and scroll to that decision, whose heading briefly turns accent; no tags or chips. Then the hero: the screen that best proves the work (the first entry in `images`), or, with no screenshots, the `pipeline` set as type in an ink band. A hero screen wider than 16:10 shows whole at its own ratio; a taller one sits in a 16:10 frame that peek pans. On phones the hero shows a close-up instead (`heroCrop`, or `thumb` when it's the same image), with "Tap to see the full screen" under it on touch devices. When there are no screenshots, the band opens with the outcome as a figure (`tile`: "20+ → 0 manual entries a day", counted down like the home tile) above the pipeline, and that project has no Result section. Context and Key decisions are spec-sheet sections: heavy rule, 34px title on the left (sticky on desktop, 180–280px wide), content on the right. Context and every decision share one reading measure (27em, about 60 characters); each decision is the choice, why, and what it avoided (three per project), and the screen column beside it stays in place whether or not the decision has a `shot`. Remaining screens go under More screens at their real aspect ratio. Result (only where real figures exist beyond the outcome, in `results`) sets the numbers large in the accent. The page closes with the ask ("Want to see the code?": email with copy, Resume, LinkedIn), then next/previous project, then a foot with Copy link and the theme switch.

## Shape and motion

- Radius 8px on buttons, 10px on images, 4px on tags. No pills.
- Motion is short and functional, 0.2–0.5s. Nothing loops. The one exception is the 77% count and bar (1.1s), which act out the lead figure. Content is never hidden or faded in on load or scroll.
- The case-study morph uses `view-transition-name` `title-<slug>` and `shot-<slug>` on the home row and the case-study hero; keep both when changing either page. The sticky bar is one shared `bar` group, so it stays put while its contents crossfade. The case study's intro, facts and body (`pv-head`, `pv-meta`, `pv-more`) settle in behind the morph, 40ms apart. A morph element that's scrolled out of view is parked (`data-vt-off`) and fades instead of flying in from off-screen.
- Curves: `--ease-out` `cubic-bezier(0.22, 1, 0.36, 1)` for entrances and `--ease-move` `cubic-bezier(0.32, 0.72, 0, 1)` for the morph. Home ↔ case study about 0.42s; next/previous project 0.46s.
- The real figures act themselves out, once per visit (they don't replay when Home remounts after a case study):
  - **77% count and bar:** the figure counts 0 → 77 while, under it, a 2px accent bar over a hairline shrinks from full width to what's left after the cut (`scaleX(1 → 0.23)`). Both run 1.1s on `--ease-expo` `cubic-bezier(0.16, 1, 0.3, 1)` after a 0.35s delay, CSS only from first paint, so the number is the cut. The count is an `@property --n` integer shown through a `counter()` overlay; the real "77" holds the layout and stays in the accessibility tree. The bar is `aria-hidden`; the label already says it.
  - **Countdown:** the Construction "0" (home tile and case-study band) counts down from 20 when it's 35% in view (about 0.7s, cubic ease-out). It's armed at 20 only while just below the fold (within 240px); everywhere else, including captures and anything scrolled past, it reads the real "0". The final value holds the layout and stays readable to screen readers; the running number overlays it. If it's already on screen at page load, it shows 0 and doesn't count.
  - **Live dot:** the green dot sends out one ring (`scale(1 → 2.4)`, opacity 0.5 → 0, 0.6s) when its row first comes into view, and again on row hover (mouse or trackpad only).
- Everything respects `prefers-reduced-motion`.

## Don'ts

- No invented numbers, logos, testimonials or screenshots (see `PRODUCT.md`).
- Don't bring back the serif, the cream palette, numbered rows, orbs or the noise texture.
- `/resume` has its own isolated styles and must stay printable.
