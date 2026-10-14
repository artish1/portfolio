/**
 * Start of professional software engineering career (first role: APA).
 * Single source of truth — the "N+ years of experience" figure shown on the
 * resume and the live APA tenure on the home page are derived from this.
 */
export const CAREER_START = new Date(2021, 1, 1) // Feb 2021

/**
 * Completed years since CAREER_START, floored — the figure never overstates,
 * it only increments once the anniversary has actually passed.
 */
export function yearsOfExperience(asOf: Date = new Date()): number {
  let years = asOf.getFullYear() - CAREER_START.getFullYear()
  const monthDelta = asOf.getMonth() - CAREER_START.getMonth()

  if (monthDelta < 0 || (monthDelta === 0 && asOf.getDate() < CAREER_START.getDate())) {
    years--
  }

  return years
}

/** Live tenure label, e.g. "5 yrs 8 mos". */
export function tenure(asOf: Date = new Date()): string {
  const months = (asOf.getFullYear() - CAREER_START.getFullYear()) * 12 + asOf.getMonth() - CAREER_START.getMonth()
  const y = Math.floor(months / 12)
  const m = months % 12
  return y + ' yr' + (y === 1 ? '' : 's') + (m ? ' ' + m + ' mo' + (m === 1 ? '' : 's') : '')
}

export const EMAIL = 'markyshuk@gmail.com'
export const GITHUB_URL = 'https://github.com/artish1'
export const LINKEDIN_URL = 'https://linkedin.com/in/mark-artishuk'
export const RESUME_URL = '/resume'

/** The short stack line on the home page. The full list lives on the resume. */
export const coreStack =
  'TypeScript, React, Next.js, React Native, Node.js, GraphQL, tRPC, PostgreSQL, Redis, Stripe, AWS'

/**
 * Proof strip at the top of the home page. Only real, sourced figures.
 * Years of experience are added on the page from `yearsOfExperience()`, so they stay calculated.
 */
export const proof: { value: string; label: string }[] = [
  { value: '77%', label: 'Up to 77% less latency on critical endpoints at APA' },
  { value: '200k+', label: 'players on the platform I work on' },
]
export const experienceLabel = 'as a professional software engineer, since Feb 2021'

/** APA highlights. Segments with `b` render bold (metrics only). */
export const apaHighlights: { t: string; b?: boolean }[][] = [
  [
    { t: 'Tuned queries, added indexes and introduced caching on critical endpoints, cutting their latency by ' },
    { t: 'up to 77%', b: true },
    { t: ' and overall response times by ' },
    { t: 'about 20%', b: true },
  ],
  [{ t: 'Make architecture decisions across the frontend and backend for our highest-traffic apps' }],
  [{ t: 'Restructured components on the most-used screens to cut unnecessary re-renders' }],
  [
    {
      t: 'Review code and mentor other engineers, and work with product to turn loose requirements into shipped features',
    },
  ],
]

/** The rest of the timeline. The projects themselves are covered in Selected work. */
export const otherRoles: { role: string; company: string; period: string }[] = [
  { role: 'Co-founder / Lead Engineer', company: 'HuntNHook', period: '2025–present' },
  { role: 'Contract work', company: 'Rafa Sauna, United Revival, a construction firm', period: '2022–2026' },
]
