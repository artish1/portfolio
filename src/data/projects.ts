export interface ProjectImage {
  src: string
  alt: string
  /** Intrinsic size, so screens can be shown uncropped. */
  w: number
  h: number
}

export interface ProjectDecision {
  /** The choice, in plain words. */
  title: string
  /** Why it was made and what it avoided. */
  text: string
  /** `src` of a screen in `images` that shows this decision at work; shown beside it. */
  shot?: string
  /** Entries in `stack` this decision rests on. They link here from the Stack line. */
  tools?: string[]
}

export interface ProjectResult {
  value: string
  label: string
}

export interface PipelineStep {
  step: string
  note: string
}

export interface Project {
  slug: string
  title: string
  short: string
  /** One line naming how it was built, shown on the home page work list. */
  built: string
  /** Cropped close-up for the home page: one real detail of the product, not the whole page. */
  thumb?: { src: string; pos: string; zoom: number; caption: string }
  /** Typographic stand-in for projects with no screenshots. */
  tile?: { from: string; to: string; label: string }
  /** How the system works, set as type in place of a hero screenshot. */
  pipeline?: PipelineStep[]
  role: string
  year: string
  outcome: string
  context: string
  decisions: ProjectDecision[]
  /** Real, sourced figures only. Leave out when there are none. */
  results?: ProjectResult[]
  stack: string[]
  /** The first image is the case-study hero, so lead with the strongest evidence. */
  images: ProjectImage[]
  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'huntnhook',
    title: 'HuntNHook',
    short: 'Marketplace for guided fishing and hunting trips',
    built: 'Escrow payments on Stripe Connect · PostGIS map search · Redis pub/sub messaging',
    thumb: {
      src: '/images/projects/huntnhook/02-search-map.png',
      pos: '50% 50%',
      zoom: 1,
      caption: 'Map search, with each trip pinned at its price',
    },
    role: 'Co-founder / Lead Engineer',
    year: '2025–present',
    outcome:
      'A two-sided marketplace for guided fishing and hunting trips. I own the full technical build, from database schema to production.',
    context:
      "Hosts shouldn't get paid until a trip actually happens, guests need a way to get refunds and open disputes, and search has to work by distance in rural areas. I designed the system to handle all three.",
    decisions: [
      {
        title: 'Hold the money until the trip happens',
        tools: ['Stripe Connect'],
        text: "Guests pay when they book, but Stripe Connect holds the funds and only releases them to the host after the trip. Refunds and disputes come out of money that hasn't left yet, instead of money a host has already been paid. Webhooks are idempotent, so a retried Stripe event can't pay a host twice.",
        shot: '/images/projects/huntnhook/05-booking-flow.png',
      },
      {
        title: 'Map search inside Postgres, not a separate search service',
        tools: ['PostGIS'],
        text: 'Guests look for trips by distance, often in rural areas. The map runs PostGIS bounding-box queries with distance sorting and filters in the main database, so there is no second system to run and keep in sync with the listings.',
      },
      {
        title: 'Messages that reach every server',
        tools: ['Redis'],
        text: 'The app runs as several processes in a PM2 cluster, so the person you message may be connected to a different one than you. GraphQL subscriptions go through Redis pub/sub, which lets every process hear every message.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Apollo', 'GraphQL', 'PostgreSQL', 'PostGIS', 'Prisma', 'Redis', 'Stripe Connect', 'BullMQ', 'PM2'],
    images: [
      {
        src: '/images/projects/huntnhook/02-search-map.png',
        alt: 'Map search: trips listed beside a map, each pinned at its price',
        w: 2880,
        h: 1620,
      },
      {
        src: '/images/projects/huntnhook/05-booking-flow.png',
        alt: 'Booking flow with session selection, date, guests and add-ons',
        w: 2880,
        h: 1620,
      },
      {
        src: '/images/projects/huntnhook/04-listing-detail.png',
        alt: 'Listing detail page with photo gallery, host and pricing',
        w: 2880,
        h: 1620,
      },
      {
        src: '/images/projects/huntnhook/01-landing-hero.png',
        alt: 'Landing page with category selection and search',
        w: 2880,
        h: 1620,
      },
    ],
  },
  {
    slug: 'rafa',
    title: 'Rafa Sauna',
    short: 'Booking, membership and NFC point of sale',
    built: 'NFC wristband payments · capacity-aware booking engine · React Native kiosk',
    thumb: {
      src: '/images/projects/rafa/timeslots.png',
      pos: '50% 70%',
      zoom: 1.45,
      caption: 'Live availability, with spots left per session',
    },
    role: 'Contract, full-stack',
    year: '2025',
    liveUrl: 'https://app.rafasauna.com/booking',
    outcome:
      'The booking, membership and point-of-sale system a sauna runs on every day, across web, kiosk and mobile.',
    context:
      'A working sauna with limited capacity per session, dynamic pricing and memberships. Guests also needed to pay on-site without carrying a phone or wallet.',
    decisions: [
      {
        title: 'A booking engine built around capacity',
        text: 'Every session has a fixed number of spots and a price that can change. I wrote one engine that handles capacity limits, dynamic pricing and live availability together, so a session can’t be overbooked and guests see the real number of spots left.',
        shot: '/images/projects/rafa/timeslots.png',
      },
      {
        title: 'Pay with a wristband, not a phone',
        tools: ['NFC'],
        text: 'Nobody carries a phone or a wallet in a sauna. Each NFC wristband stores a signed JWT, so a guest can tap to pay at any device in the building, and a band whose data has been tampered with is rejected.',
      },
      {
        title: 'One backend for guests, staff and the front desk',
        tools: ['tRPC', 'Stripe'],
        text: 'The customer site, the staff dashboard and the React Native kiosk at the front desk all run on the same tRPC backend, so there is one set of rules for bookings and payments. Memberships, one-time purchases, Apple Pay, refunds and promo codes go through a single Stripe integration.',
        shot: '/images/projects/rafa/dashboard.png',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'React Native', 'NFC', 'tRPC', 'PostgreSQL', 'Prisma', 'Stripe', 'AWS Elastic Beanstalk'],
    images: [
      {
        src: '/images/projects/rafa/booking.png',
        alt: 'Bookings management with reservations and check-in status',
        w: 2786,
        h: 1906,
      },
      {
        src: '/images/projects/rafa/timeslots.png',
        alt: 'Customer booking flow with real-time availability slots',
        w: 1440,
        h: 1340,
      },
      {
        src: '/images/projects/rafa/dashboard.png',
        alt: 'Staff dashboard with visit analytics and capacity tracking',
        w: 2800,
        h: 1910,
      },
    ],
  },
  {
    slug: 'ur',
    title: 'United Revival Donations',
    short: 'Donation platform with a live event feed',
    built: 'Live donation counter over Ably · wallet-first Stripe checkout · 20+ city campaigns',
    thumb: {
      src: '/images/projects/ur-give/ur-3.png',
      pos: '43% 30%',
      zoom: 1.15,
      caption: 'The counter shown on screen at events',
    },
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
        title: 'Apple Pay and Google Pay first, the card form second',
        tools: ['Apple Pay', 'Google Pay'],
        text: 'People give from their phone in the middle of a live event, so a wallet payment is the default and there is no card number to type. A short multi-step form is there for everyone else.',
      },
      {
        title: 'A counter the whole room can watch',
        tools: ['Ably'],
        text: 'At events, an on-screen counter updates in real time over Ably with animated totals, so each gift shows up on the big screen moments after it is made.',
        shot: '/images/projects/ur-give/ur-3.png',
      },
      {
        title: 'Landing pages judged by finished donations',
        text: 'Several versions of the landing page were A/B-tested against one measure: how many visitors went on to complete a donation.',
      },
    ],
    results: [
      { value: '20+', label: 'city campaigns, each with its own page and goal' },
      { value: '$250k+', label: 'in combined campaign goals' },
      { value: '4 yrs', label: 'in production, kept running and updated through every campaign' },
    ],
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'MongoDB', 'Stripe', 'Apple Pay', 'Google Pay', 'Ably'],
    images: [
      {
        src: '/images/projects/ur-give/ur-1.png',
        alt: 'Donation page with campaign progress and preset amounts',
        w: 2808,
        h: 2110,
      },
      {
        src: '/images/projects/ur-give/ur-3.png',
        alt: 'Live donation counter shown on-screen during events',
        w: 2122,
        h: 958,
      },
    ],
  },
  {
    slug: 'construction',
    title: 'Construction Automation',
    short: 'Automation over a closed vendor API',
    built: 'Reverse-engineered vendor API · Puppeteer on AWS Lambda · pipeline-to-invoice sync',
    tile: { from: '20+', to: '0', label: 'manual entries a day' },
    role: 'Contract',
    year: '2025',
    outcome: 'An internal tool that replaced 20+ manual data entries a day by working with a vendor’s closed API.',
    pipeline: [
      { step: 'Pipeline data', note: 'What staff used to retype by hand' },
      { step: 'The sync', note: 'The vendor’s private API, and Puppeteer on AWS Lambda where there’s no endpoint' },
      { step: 'Invoices', note: 'Entered in the vendor’s software, with nobody typing' },
    ],
    context:
      "The company's vendor software had no public API, so staff were copying pipeline data into invoices by hand, every day.",
    decisions: [
      {
        title: 'Use the vendor’s own private API',
        text: 'The vendor’s web app talks to internal endpoints that aren’t documented. I mapped them, so records can be entered by code instead of through the screens a person would click through.',
      },
      {
        title: 'A headless browser only where there’s no endpoint',
        tools: ['Puppeteer', 'AWS Lambda'],
        text: 'For the steps the API can’t do, Puppeteer runs on AWS Lambda and fills in the vendor’s screens itself. It only runs when there’s work to do, so there’s no server to keep up for it.',
      },
      {
        title: 'Invoices built straight from pipeline data',
        text: 'The sync reads the pipeline data and creates the matching invoice records, which is exactly the job staff were doing by hand.',
      },
    ],
    results: [{ value: '0', label: 'manual data entries a day, down from 20+' }],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Puppeteer', 'AWS Lambda'],
    images: [],
  },
]

export const projectIndex = (slug: string | null | undefined) =>
  slug ? projects.findIndex((p) => p.slug === slug) : -1

export const projectHref = (slug: string) => `/work/${slug}`

/**
 * Where each screen is shown on a case study: the first is the hero, screens named by a
 * decision sit beside it, and the rest are collected under More screens. `ii` is the index
 * into `images`, which the lightbox steps through in order.
 */
export function placeScreens(p: Project) {
  const at = (src: string) => p.images.findIndex((im) => im.src === src)
  const beside = new Map<string, { im: ProjectImage; ii: number }>()
  p.decisions.forEach((d) => {
    const ii = d.shot ? at(d.shot) : -1
    if (ii > 0) beside.set(d.title, { im: p.images[ii], ii })
  })
  const used = new Set(Array.from(beside.values(), (s) => s.ii))
  const rest = p.images.map((im, ii) => ({ im, ii })).filter(({ ii }) => ii > 0 && !used.has(ii))
  return { beside, rest }
}
