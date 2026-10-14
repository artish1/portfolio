---
target: homepage
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/markartishuk/Desktop/projects/portfolio/src/components/Home.tsx"
target_fingerprint: "sha256:823fec528af54e1be5ec3895b6744988238a352e2fd785680dcab5a2648a292a"
target_path: /Users/markartishuk/Desktop/projects/portfolio/src/components/Home.tsx
timestamp: 2026-10-14T02-55-18Z
slug: src-components-home-tsx
---
⚠️ DEGRADED: single-context (sub-agent depth limit reached; A and B ran sequentially inline, A recorded before detector output)

Target: homepage, src/components/Home.tsx (rendered via app/(site)/layout.tsx → Site.tsx). Previous run: 22/32.

## Design Health Score
| # | Heuristic | Score | Prev | Key Issue |
|---|---|---|---|---|
| 1 | Visibility of System Status | 3 | 3 | Active nav, name reappears in bar on scroll, live region; aria-current uses 'true' not 'location' |
| 2 | Match System / Real World | 4 | 3 | Years computed; plain, specific first-person voice throughout |
| 3 | User Control and Freedom | 3 | 3 | Esc/back/history still solid |
| 4 | Consistency and Standards | 3 | 3 | One theme control now; header Email is mailto-only while contact has copy |
| 5 | Error Prevention | 3 | 3 | Little to get wrong |
| 6 | Recognition Rather Than Recall | 3 | 3 | Rows now show mechanisms + Live; email address only visible at page bottom |
| 7 | Flexibility and Efficiency | n/a | n/a | Portfolio surface |
| 8 | Aesthetic and Minimalist Design | 3 | 2 | Skills grid gone, proof in fold; pulsing dot + noise remain |
| 9 | Error Recovery | 3 | 2 | Copy confirms only on success, falls back to mailto |
| 10 | Help and Documentation | n/a | n/a | Portfolio surface |
| **Total** | | **25/32** | 22/32 | **Good (78%)**, up from Acceptable (69%) |

## Previous issues status
Fixed: "six years" hard-code; skills grid in fold (now proof strip); work rows (mechanism line, Live badges, typographic 20+→0 tile); sticky-rail template and orbs; mobile duplicate name; false "Copied"; footer year; .lead 90ch (now 54ch); Resume in contact row; contact speaks to contract clients; two theme controls. Partially: template structure (rail gone, but sequence is still the standard dev-portfolio order); noise overlay kept.

## Design Specificity Verdict
LLM: Big step up. Proof strip and per-project mechanism lines make the page specific to Mark. Structure is still the standard order (big name → stats → numbered list → experience → contact), and the largest thing on screen is the name, which carries no evidence.
Detector: source scan clean (0). Rendered scan: 2 findings. pulsing-dot on .tag-live (TP: the dot animates forever on a static fact). low-contrast on "HuntNHook" a>strong (FP, same as last run: the [data-ul] underline gradient is read as background). The previous line-length finding on .lead is gone.
Overlays: none (no browser automation).

## Priority Issues
- [P2] Work-row hierarchy inverted: generic `short` (15px, ink2) sits above the mechanism line `built` (13px), so the strongest hiring signal is the smallest text. Fix: make `built` 15px and the main line under the title; demote or merge `short`. (/impeccable typeset)
- [P2] Pulsing "Live" dot animates forever (detector agrees). Fix: make the dot static, and consider making "Live" an actual link to the site. (/impeccable quieter)
- [P2] Mobile proof strip squeezes three ~100px columns with 13px labels wrapping 4–5 lines. Fix: below ~520px, use stacked rows (value left, label right) like desktop. (/impeccable adapt)
- [P2] Hero's dominant element is the 124px name; structure is still category-standard. Fix: give the fold one piece of real evidence with visual weight (a HuntNHook shot or the 77% figure at name scale). (/impeccable bolder)
- [P3] Header "Email" is mailto-only; recruiters on webmail without a mail handler get nothing, and the address/copy only appears at the bottom. Fix: show the address or a copy action in the bar. (/impeccable clarify)

## Persona Red Flags
Recruiter: gets 77% / 200k+ / 3 systems in the fold, good. "3 client systems… running in production" needs to stay true for Construction Automation. Contract client: now addressed directly ("need something built?"). Riley: copy failure sends you to mailto without saying so. Casey: proof labels cramped; header Email mailto may do nothing. Sam: skip link, live region, focus ring; aria-current="false" on inactive links is unneeded noise.

## Minor Observations
Noise overlay still decorative; 77% repeats in proof and APA bullets (fine); "See the work ↑" loops back up; theme control only in footer.

## Questions
What if the fold's biggest element were evidence, not the name? Does `short` earn its line now that `built` exists? Should "Live" go to the live site?
