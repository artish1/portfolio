export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectDecision {
  title: string
  text: string
}

export interface Project {
  slug: string
  title: string
  short: string
  role: string
  year: string
  outcome: string
  context: string
  decisions: ProjectDecision[]
  stack: [layer: string, items: string][]
  images: ProjectImage[]
  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'huntnhook',
    title: 'HuntNHook',
    short: 'Marketplace for guided fishing and hunting trips',
    role: 'Co-founder / Lead Engineer',
    year: '2025–present',
    outcome:
      'A two-sided marketplace for guided fishing and hunting trips. I built it from the database schema to production as the only engineer.',
    context:
      "Hosts shouldn't get paid until a trip actually happens, guests need a way to get refunds and open disputes, and search has to work by distance in rural areas. I built and run all of it myself.",
    decisions: [
      {
        title: 'Escrow-style payments on Stripe Connect',
        text: "Payments are held at booking and released to the host after the trip. Payouts are delayed, disputes are handled, and webhooks are idempotent so a retried event can't pay out twice.",
      },
      {
        title: 'Geospatial search in PostGIS',
        text: 'Map search uses bounding-box queries with distance sorting and filters, running in the main Postgres database instead of a separate search service.',
      },
      {
        title: 'Real-time messaging across instances',
        text: 'The app runs as a PM2 cluster, so GraphQL subscriptions go through Redis pub/sub to reach users on any instance.',
      },
      {
        title: 'Background jobs in BullMQ',
        text: 'Anything slow or likely to need a retry runs in BullMQ workers instead of inside the request.',
      },
      {
        title: 'Caching with targeted invalidation',
        text: 'Caching at a few layers keeps listing pages fast, and targeted invalidation keeps them from showing stale data.',
      },
    ],
    stack: [
      ['Web', 'Next.js, TypeScript, Apollo'],
      ['API', 'GraphQL, subscriptions'],
      ['Data', 'PostgreSQL / PostGIS, Prisma, Redis'],
      ['Payments', 'Stripe Connect'],
      ['Jobs', 'BullMQ, PM2'],
    ],
    images: [
      { src: '/images/projects/huntnhook/hnh-1.jpg', alt: 'Landing page with category selection and search' },
      { src: '/images/projects/huntnhook/hnh-2.png', alt: 'Map-based search with PostGIS filtering and listing cards' },
    ],
  },
  {
    slug: 'rafa',
    title: 'Rafa Sauna',
    short: 'Booking, membership and NFC point of sale',
    role: 'Contract, full-stack',
    year: '2025',
    liveUrl: 'https://app.rafasauna.com/booking',
    outcome:
      'The booking, membership and point-of-sale system a sauna runs on every day, across web, kiosk and mobile.',
    context:
      'A working sauna with limited capacity per session, dynamic pricing and memberships. Guests also needed to pay on-site without carrying a phone or wallet.',
    decisions: [
      {
        title: 'Custom booking engine',
        text: 'Handles capacity limits, dynamic pricing and live availability in one place.',
      },
      {
        title: 'NFC wristband payments',
        text: 'Each wristband stores a signed JWT, so guests can tap to pay at any device in the building.',
      },
      {
        title: 'Stripe for all payments',
        text: 'Memberships, one-time purchases, Apple Pay, refunds and promo codes all go through one Stripe integration.',
      },
      {
        title: 'Shared backend',
        text: 'The staff dashboard, customer site and the React Native kiosk at the front desk all run on the same backend.',
      },
    ],
    stack: [
      ['Web', 'Next.js, TypeScript'],
      ['Kiosk', 'React Native, NFC'],
      ['API', 'tRPC'],
      ['Data', 'PostgreSQL, Prisma'],
      ['Payments', 'Stripe'],
      ['Infra', 'AWS Elastic Beanstalk'],
    ],
    images: [
      { src: '/images/projects/rafa/dashboard.png', alt: 'Staff dashboard with visit analytics and capacity tracking' },
      { src: '/images/projects/rafa/booking.png', alt: 'Bookings management with reservations and check-in status' },
      { src: '/images/projects/rafa/timeslots.png', alt: 'Customer booking flow with real-time availability slots' },
    ],
  },
  {
    slug: 'ur',
    title: 'United Revival Donations',
    short: 'Donation platform with a live event feed',
    role: 'Lead Developer',
    year: '2022–2026',
    liveUrl: 'https://give.unitedrevival.org/',
    githubUrl: 'https://github.com/UnitedRevival/ur-donations',
    outcome:
      'Donation platform for a nonprofit with 20+ city campaigns and over $250k in combined goals, plus a live donation counter shown at events.',
    context:
      'Most people donate from their phone during a live event, so checkout has to be quick. Each of the 20+ city campaigns also needs its own page and goal.',
    decisions: [
      {
        title: 'Apple Pay and Google Pay first',
        text: 'Wallet payments are the default, with a short multi-step form as the fallback.',
      },
      {
        title: 'A/B-tested landing pages',
        text: 'Several versions of the landing page were tested against donation completion rate.',
      },
      {
        title: 'Live donation counter',
        text: 'An on-screen counter at events updates in real time over Ably, with animated totals.',
      },
      {
        title: 'Long-term maintenance',
        text: "I've kept it running and updated it in production through four years of campaigns.",
      },
    ],
    stack: [
      ['Web', 'Next.js, TypeScript, Framer Motion'],
      ['Data', 'MongoDB'],
      ['Payments', 'Stripe, Apple / Google Pay'],
      ['Real-time', 'Ably'],
    ],
    images: [
      { src: '/images/projects/ur-give/ur-1.png', alt: 'Donation page with campaign progress and preset amounts' },
      { src: '/images/projects/ur-give/ur-3.png', alt: 'Live donation counter shown on-screen during events' },
    ],
  },
  {
    slug: 'construction',
    title: 'Construction Automation',
    short: 'Automation over a closed vendor API',
    role: 'Contract',
    year: '2025',
    outcome: 'An internal tool that replaced 20+ manual data entries a day by working with a vendor’s closed API.',
    context:
      "The company's vendor software had no API, so staff were copying pipeline data into invoices by hand, 20+ records a day.",
    decisions: [
      {
        title: 'Reverse-engineered the private API',
        text: "I mapped the vendor's internal endpoints so data could be entered programmatically.",
      },
      {
        title: 'Headless browser for the rest',
        text: 'For steps with no endpoint, Puppeteer runs on AWS Lambda and fills them in.',
      },
      {
        title: 'Pipeline-to-invoice sync',
        text: 'Pipeline data is turned into invoice records automatically.',
      },
    ],
    stack: [
      ['Web', 'Next.js, TypeScript'],
      ['Data', 'PostgreSQL'],
      ['Automation', 'Puppeteer'],
      ['Infra', 'AWS Lambda'],
    ],
    images: [],
  },
]

export const projectIndex = (slug: string | null | undefined) =>
  slug ? projects.findIndex((p) => p.slug === slug) : -1

export const projectHref = (slug: string) => `/work/${slug}`
