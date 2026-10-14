# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: hiring managers and recruiters** filling full-time software engineering roles, remote or on-site in the Sacramento area. They are screening quickly and deciding whether to reach out or move Mark to an interview.
- **Secondary: prospective contract clients**, such as small businesses and nonprofits, deciding whether Mark can build and run a production system for them.

## Product Purpose

The personal portfolio of Mark Artishuk, a software engineer (Sacramento, CA, open to remote). It exists to get him hired: success means a visitor emails him, connects on LinkedIn, or opens the resume and moves forward. Contract inquiries are a welcome secondary outcome.

## Positioning

Two claims, weighted equally, and both backed by real work:

1. **He owns production systems end to end.** Escrow payments on Stripe Connect, PostGIS geospatial search, real-time messaging across instances (HuntNHook); an NFC wristband point of sale and booking engine (Rafa Sauna); a live donation counter used at events (United Revival). These are running for real businesses, and he built them from schema to production.
2. **Measured performance work and maintainable code.** He cut latency on critical endpoints by up to 77% and improved overall response times by about 20% at APA, on a platform with 200,000+ players, and he cares about keeping code easy for the next engineer to work in.

## Operating Context

- Visitors usually come from a job application, recruiter outreach, LinkedIn, or a resume link, and scan quickly before deciding whether to dig in.
- Case studies (`/work/[slug]`) give each project's context, key engineering decisions and stack for visitors who want depth.
- The resume is available at `/resume` (printable) and as `public/resume.pdf`.
- Contact is by email (`markyshuk@gmail.com`, usually answered within a day), LinkedIn or GitHub.

## Capabilities and Constraints

- Built with Next.js 14 (App Router), React 18 and TypeScript, with no CSS framework. Content lives in `src/data/projects.ts` and `src/data/experience.ts`.
- Years of experience and APA tenure are calculated from `CAREER_START` (Feb 2021) and must stay calculated, not hard-coded.
- **The resume route must stay printable:** keep `/resume`, `public/resume.pdf`, and the print styles and `data-print-hide` behavior.
- **Private codebases stay private.** Most of the code can't be shown. The site offers to walk through it on a call instead. Never invent public repos, demos or screenshots. Only United Revival has a public GitHub repo; Rafa Sauna and United Revival have live URLs.
- The Construction Automation project has no screenshots (it's internal tooling) and is labeled as such.

## Brand Commitments

- Name: Mark Artishuk. Title: Software Engineer. Location line: "Sacramento, CA · Open to remote."
- Voice: plain, first person, specific and unhyped. Concrete mechanisms and numbers instead of adjectives.

## Evidence on Hand

- **APA (full-time, since Feb 2021):** 200,000+ active players; up to 77% latency reduction on critical endpoints; about 20% better overall response times; architecture decisions, re-render reduction, code review and mentoring.
- **HuntNHook (co-founder / lead engineer, 2025–present):** 4 screenshots in `public/images/projects/huntnhook/`.
- **Rafa Sauna (contract, 2025):** live at app.rafasauna.com; 3 screenshots in `public/images/projects/rafa/`.
- **United Revival Donations (lead developer, 2022–2026):** 20+ city campaigns, over $250k in combined goals, four years in production; live site and public repo; 2 screenshots in `public/images/projects/ur-give/`.
- **Construction Automation (contract, 2025):** replaced 20+ manual data entries a day; no images.
- **Not on hand:** testimonials, client logos, press, or metrics beyond those listed above. Don't fabricate any of them.

## Product Principles

1. **Hiring signal first.** Every surface should help a busy screener answer "should we talk to him?" fast, with depth available but never required.
2. **Show mechanisms, not adjectives.** Name the actual system decisions and real numbers, and let them carry credibility.
3. **Honest about what's private.** Treat the private code as a strength to discuss on a call, never as a gap to fill with made-up material.
4. **Contact is always one step away.** Email, LinkedIn and the resume should be reachable from anywhere on the site.
5. **The site itself is evidence of craft.** Performance, accessibility and maintainable code here are part of the pitch.
