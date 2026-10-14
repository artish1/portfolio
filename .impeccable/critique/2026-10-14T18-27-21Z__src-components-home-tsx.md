---
target: homepage
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/markartishuk/Desktop/projects/portfolio/src/components/Home.tsx"
target_fingerprint: "sha256:7562498dd6458b79cd76089989f551f1badcae6e689c1158c8d38c75abe262ee"
target_path: /Users/markartishuk/Desktop/projects/portfolio/src/components/Home.tsx
timestamp: 2026-10-14T18-27-21Z
slug: src-components-home-tsx
---
⚠️ DEGRADED: single-context (sub-agent depth limit reached; A recorded before detector output)

Target: homepage, src/components/Home.tsx (via Site.tsx). Rendered 1440/390, light/dark, isolated dev server.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Scroll-spy, copy confirm + aria-live; header copy only swaps icon |
| 2 | Match System / Real World | 3 | Work rows lead with stack jargon before what the product is |
| 3 | User Control and Freedom | 3 | Plain anchors; Esc/back from case studies |
| 4 | Consistency and Standards | 3 | Resume text link vs pill; three arrow idioms |
| 5 | Error Prevention | 3 | Low-risk; mailto fallback |
| 6 | Recognition Rather Than Recall | 3 | Icon-only header copy button |
| 7 | Flexibility and Efficiency | n/a | Portfolio |
| 8 | Aesthetic and Minimalist Design | 2 | Same facts repeated 2–3x; 13px-heavy metadata |
| 9 | Error Recovery | 3 | Clipboard denial silently opens mail client |
| 10 | Help and Documentation | n/a | Portfolio |
| Total | | 23/32 | Good (72%) |

## Design Specificity Verdict
Copy is authored; visuals are a familiar editorial-portfolio pattern (cream paper + noise, Cormorant, numbered rows, circle arrows, hero stat). Construction "20+ → 0" tile is the one authored visual. Detector: CLI clean (src/components, app). Browser: cream-palette (home + case study), line-length ~93ch on p.pv-context (/work/huntnhook). No false positives.

## Priority Issues
- [P1] Repetition: 200k+ x3 (Home.tsx:106, experience.ts:43, Home.tsx:146), 77% x2, HuntNHook x3, contract-work row duplicates Selected work (experience.ts:85-94). Fix: lean Experience timeline. /impeccable distill
- [P1] Work rows jargon-first; plain `short` at 13px muted. Fix: title → short (15px ink) → built → meta (Home.tsx:403-404). /impeccable typeset
- [P2] Thumbnails are unreadable full-page shrinks (Rafa, UR mostly grey). Fix: optional cropped `thumb` + focal position in projects.ts. /impeccable layout
- [P2] Visual layer doesn't carry positioning; extend tile idea with one mechanism-specific figure per project. /impeccable bolder
- [P2] Trust note and lots of copy at 13px ink3; move note under heading at 15px ink2. /impeccable typeset

## Persona Red Flags
- Recruiter: jargon before product; "3 client systems" weakest stat (use 4 yrs in production / $250k+ goals); repeated numbers in Experience.
- Jordan: icon-only copy; "Live" badge looks like a link.
- Casey: 77% at 28vw pushes work below the first screen; empty left bar slot.
- Riley: clipboard denial → unexplained mailto (Site.tsx:264); whole-row link has long accessible name.

## Minor Observations
Empty desktop header left column at top; 5 contact actions acceptable; pv-context use ~34em; aria-labelledby on work rows; keep name-wave easter egg.

## Questions to Consider
- Why is the Construction tile the only row whose image is its result?
- What would Experience say without repeating a number from above?
- Would a recruiter miss the stack line if the plain description came first?
