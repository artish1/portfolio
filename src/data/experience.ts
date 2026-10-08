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

export const skills: { label: string; items: string }[] = [
  { label: 'Languages', items: 'TypeScript, JavaScript, SQL, Rust, C#' },
  { label: 'Frontend', items: 'React, Next.js, React Native, Tailwind, Three.js, Framer Motion' },
  {
    label: 'Backend',
    items: 'Node.js, GraphQL, tRPC, Express, Prisma, PostgreSQL / PostGIS, Redis, BullMQ, Elasticsearch',
  },
  {
    label: 'Systems & architecture',
    items:
      'System design, Distributed systems, Event-driven architecture, Caching, Scalability, Query optimization, Payment systems, Real-time',
  },
  { label: 'Cloud & delivery', items: 'AWS, serverless, Docker, CI/CD pipelines, Vercel, PM2' },
]

/** APA highlights. Segments with `b` render bold (metrics only). */
export const apaHighlights: { t: string; b?: boolean }[][] = [
  [
    { t: 'Cut latency on critical endpoints by ' },
    { t: 'up to 77%', b: true },
    { t: ' and improved overall response times by ' },
    { t: 'about 20%', b: true },
    { t: ' with query tuning, indexing and caching' },
  ],
  [{ t: 'Make architecture decisions across the frontend and backend for our highest-traffic apps' }],
  [{ t: 'Restructured components on the most-used screens to cut unnecessary re-renders' }],
  [
    {
      t: 'Review code and mentor other engineers, and work with product to turn loose requirements into shipped features',
    },
  ],
]

export const otherRoles: {
  role: string
  company: string
  period: string
  summary: string
  href: string
  linkLabel: string
  arrow: '→' | '↓'
  arrowDir: 'r' | 'd'
}[] = [
  {
    role: 'Co-founder / Lead Engineer',
    company: 'HuntNHook',
    period: '2025–present',
    summary: 'I am the only engineer on a marketplace for guided outdoor trips.',
    href: '/work/huntnhook',
    linkLabel: 'See project',
    arrow: '→',
    arrowDir: 'r',
  },
  {
    role: 'Independent contract work',
    company: 'Rafa Sauna, United Revival, a construction firm',
    period: '2022–2026',
    summary: 'Built three production systems for two small businesses and a nonprofit.',
    href: '#work',
    linkLabel: 'See projects',
    arrow: '↓',
    arrowDir: 'd',
  },
]
