---
target: homepage
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/markartishuk/Desktop/projects/portfolio/src/components/Home.tsx"
target_fingerprint: "sha256:2a0a3a22a220bbea3a0b2f5d0af0d82bb7ee1cf79e065b82a05760d630fac5d5"
target_path: /Users/markartishuk/Desktop/projects/portfolio/src/components/Home.tsx
timestamp: 2026-10-14T02-36-04Z
slug: src-components-home-tsx
---
⚠️ DEGRADED: single-context (sub-agent depth limit reached; A and B ran sequentially inline, A recorded before detector output)

Target: homepage, src/components/Home.tsx (rendered via app/(site)/layout.tsx → Site.tsx)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Active-section dot, copy feedback and live region are solid |
| 2 | Match System / Real World | 3 | Plain voice; "six years" contradicts the computed 5 yrs 8 mos tenure |
| 3 | User Control and Freedom | 3 | Esc/back/history all handled |
| 4 | Consistency and Standards | 3 | Two theme controls; contact row omits Resume |
| 5 | Error Prevention | 3 | Little to get wrong |
| 6 | Recognition Rather Than Recall | 3 | Work rows don't show what's live or what's in each case study |
| 7 | Flexibility and Efficiency | n/a | Portfolio surface |
| 8 | Aesthetic and Minimalist Design | 2 | 34-keyword skills grid takes the first viewport; orbs and noise are decoration |
| 9 | Error Recovery | 2 | Copy shows "Copied" even if the clipboard write fails (Site.tsx:252-256) |
| 10 | Help and Documentation | n/a | Portfolio surface |
| **Total** | | **22/32** | **Acceptable (69%)** |

## Design Specificity Verdict
LLM: The finish is tasteful (warm umber, Cormorant/Instrument Sans, careful motion), but the layout is the well-known sticky-rail dev-portfolio template. The skin is specific; the structure isn't.
Detector: source scan clean (0). Rendered-URL scan: 2 findings: line-length on p.lead (~90 chars/line, TP) and low-contrast on "HuntNHook" a>strong (FP: it read the [data-ul] underline gradient as the background).
Overlays: none (no browser automation, no script injection).

## Priority Issues
- [P1] Hard-coded "six years" (Home.tsx:127, layout.tsx description) overstates the 5 yrs 8 mos shown below and breaks the CAREER_START rule. Fix: derive from yearsOfExperience(). (/impeccable clarify)
- [P1] First viewport spends its space on a skills keyword grid; the proof (77%, Stripe Connect escrow, PostGIS, NFC POS, live systems) sits 900–1700px down. Fix: put a proof strip in the fold and move skills below Work. (/impeccable layout)
- [P2] Work rows show title + generic tagline only; no mechanisms, no "Live" badges, and a flat grey "Internal" box for Construction Automation. (/impeccable clarify + /impeccable polish)
- [P2] Template structure plus decorative orbs/noise. (/impeccable bolder or /impeccable quieter)
- [P2] Mobile shows "Mark Artishuk" twice stacked; light-mode 13px ink3 text ~4.2:1. (/impeccable adapt, /impeccable audit)

## Persona Red Flags
Recruiter: "six years" vs "5 yrs 8 mos"; no number in first viewport. Contract client: "Hiring? Let's talk." speaks only to employers. Riley: false "Copied". Casey: duplicate name; Email pill is the only above-fold CTA. Sam: decent (skip link, aria-current, focus ring, live region); h1 is click-only with user-select:none.

## Minor Observations
Footer year hard-coded "2026"; .lead ~90 chars/line; "See projects ↓" hard to scan; contact row lacks Resume; skills hover dim is decorative.

## Questions
What if the fold led with three concrete numbers and the live systems? Does the skills grid earn a place above Selected work? Could the contact section speak to contract clients too?
