---
target: project case-study page view /work/[slug]
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/markartishuk/Desktop/projects/portfolio/app/(site)/work/[slug]/page.tsx"
target_fingerprint: "sha256:f6e2a181aff415a9f400f27cb91c7adb84382a576db477f0e7255f08c9f83bd2"
target_path: /Users/markartishuk/Desktop/projects/portfolio/app/(site)/work/[slug]/page.tsx
timestamp: 2026-10-14T19-47-58Z
slug: app-site-work-slug-page-tsx
---
⚠️ DEGRADED: single-context (sub-agent depth limit reached; A finished before detector ran)

Target: /work/[slug] case-study view (app/(site)/work/[slug]/page.tsx → src/components/ProjectView.tsx, bar included). Pages inspected: huntnhook, construction, rafa (dark), at 1440 and 390.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Progress line, copy feedback, title focus on route. No "2 of 4" position. |
| 2 | Match System / Real World | 3 | Plain voice, but decisions assume the reader knows PostGIS, BullMQ, PM2, idempotency. |
| 3 | User Control and Freedom | 3 | Back, history-aware return, Esc. Name in bar is not a link home; Esc leaving the page is surprising. |
| 4 | Consistency and Standards | 2 | Case-study bar shares nothing with home bar: no Resume, no email address+copy, no theme, name inert. Head alignment shifts per project. |
| 5 | Error Prevention | 3 | Email is mailto-only in the bar; no visible address fallback. |
| 6 | Recognition Rather Than Recall | 2 | Resume and LinkedIn unreachable from this view; visitor has to remember they live on home. |
| 7 | Flexibility and Efficiency | n/a | Portfolio reading surface. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean spec-sheet; Construction's 2:1 black slab and a full section for a 5-row Stack table are heavy. |
| 9 | Error Recovery | 3 | Clipboard failure falls back to share/prompt. |
| 10 | Help and Documentation | n/a | Portfolio. |
| **Total** | | **22/32** | **Acceptable (69%)** |

## Priority Issues
1. [P1] Bar drops Resume/LinkedIn, inert grey name centre, Copy link in a primary slot, mailto-only Email. Fix: name links to /, add Resume + email-with-copy matching home, demote Copy link.
2. [P1] Hero shows least evidentiary screen (HuntNHook marketing landing w/ stock photo; Rafa dashboard full of empty states). Screens are divorced from the decisions they prove, after Stack. Fix: hero = map search / live timeslots; pair screens with decisions; fold Stack into facts row.
3. [P1] No Result section and no closing ask; page ends on next/prev. Fix: real results block (only on-hand numbers) + closing walkthrough/Resume/email block before next project.
4. [P2] "Key decisions" read as a feature list, no constraint/alternative/trade-off; weak entries (caching, shared backend, long-term maintenance, pipeline-to-invoice tautology). Fix: choice + why + what it avoided; cut to 3 strongest.
5. [P2] Construction tile: 2:1 black slab ~520px, "20+" repeated three times above the fold. Fix: shrink to band or replace with typeset pipeline diagram.

## Detector
CLI: 0 findings on page.tsx, layout.tsx, ProjectView.tsx, Site.tsx, Lightbox.tsx. Browser: cream-palette (bg #f3efe9) on all pages — pinned by DESIGN.md, false positive vs brief; line-length ~93 chars on HuntNHook desktop — real, minor.

## Minor
- .pv-head align-items:end (global.css:1237) sinks title when actions exist (Rafa).
- "Ask me for a walkthrough" tap target 20px tall.
- Esc navigates away (Site.tsx:360).
- Mobile screen thumbnails illegible; rely on zoom.
- No theme control on case study.
