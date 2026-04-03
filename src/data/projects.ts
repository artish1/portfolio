export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  images: ProjectImage[]
  liveUrl?: string
  githubUrl?: string
  privateRepo?: boolean
  featured: boolean
  role: string
  year: string
  highlights?: string[]
  placeholder?: 'automation'
}

export const projects: Project[] = [
  {
    slug: 'huntnhook',
    title: 'HuntNHook',
    description:
      'Co-founded and sole-engineered a two-sided marketplace for fishing charters, hunting trips, and outdoor recreation. End-to-end platform covering map-based search, booking with hold-based payments, real-time messaging, Stripe Connect host payouts, and background job processing.',
    tech: [
      'Next.js',
      'TypeScript',
      'PostgreSQL / PostGIS',
      'GraphQL',
      'Stripe Connect',
      'Redis / BullMQ',
      'Prisma',
      'Apollo Client',
      'TipTap',
    ],
    images: [
      { src: '/images/projects/huntnhook/hnh-1.jpg', alt: 'Landing page with category selection and search' },
      { src: '/images/projects/huntnhook/hnh-2.png', alt: 'Map-based search with PostGIS filtering and listing cards' },
      { src: '/images/projects/huntnhook/hnh-4.png', alt: 'Listing detail page with photo gallery and booking widget' },
      {
        src: '/images/projects/huntnhook/hnh-3.png',
        alt: 'Booking flow with date selection, party size, and price breakdown',
      },
      { src: '/images/projects/huntnhook/hnh-5.png', alt: 'Real-time messaging between host and guest' },
    ],
    privateRepo: true,
    featured: true,
    role: 'Co-Founder',
    year: '2026',
    highlights: [
      'Full Stripe Connect integration -- hold-based payments, cancellation compensation, dispute handling, delayed host payouts with daily sweep jobs, and idempotent webhook processing',
      'PostGIS spatial search with bounding-box filtering, distance sorting, and multi-dimensional filters (species, techniques, price, date availability)',
      'PM2 cluster deployment with dedicated BullMQ worker process, Redis PubSub for cross-instance GraphQL subscriptions, and 3-tier repo cache invalidation (surgical/broad/nuclear)',
    ],
  },
  {
    slug: 'rafa-sauna',
    title: 'Rafa Sauna',
    description:
      'Full-stack booking, membership, and POS platform for a sauna house. Spans a Next.js admin dashboard, a React Native NFC wristband app, and a self-service kiosk for tab-free food and drink orders.',
    tech: ['Next.js', 'TypeScript', 'Prisma / PostgreSQL', 'tRPC', 'Stripe', 'AWS EB', 'React Native', 'NFC', 'Resend'],
    images: [
      {
        src: '/images/projects/rafa/dashboard.png',
        alt: 'Staff admin dashboard with visit analytics and capacity tracking',
      },
      {
        src: '/images/projects/rafa/booking.png',
        alt: 'Bookings management view with reservations and check-in status',
      },
      {
        src: '/images/projects/rafa/capacity.png',
        alt: 'Party size selector with per-person pricing in the booking flow',
      },
      {
        src: '/images/projects/rafa/calendar.png',
        alt: 'Date picker with real-time availability and limited-capacity indicators',
      },
      { src: '/images/projects/rafa/timeslots.png', alt: 'Customer booking flow with real-time availability slots' },
      { src: '/images/projects/rafa/tiers.png', alt: 'Membership tier pricing and subscription plans' },
      {
        src: '/images/projects/rafa/settings.png',
        alt: 'Admin settings with operating hours, slot intervals, and weekly schedule overrides',
      },
      { src: '/images/projects/rafa/user.png', alt: 'Customer portal with bookings overview and membership status' },
    ],
    liveUrl: 'https://app.rafasauna.com/booking',
    privateRepo: true,
    featured: true,
    role: 'Solo Contract Developer',
    year: '2025',
    highlights: [
      'NFC wristband pipeline: JWT generation, React Native writer, kiosk reader for contactless tab orders',
      'In-memory booking engine with party-aware capacity, dynamic pricing, and blockout rules (no timeslot table)',
      'Stripe integration: subscriptions, one-time payments, Apple Pay, webhooks, refunds, and promo codes',
    ],
  },
  {
    title: 'United Revival Donations',
    slug: 'ur-donations',
    description:
      'Built and maintained the donation platform for United Revival, a U.S. nonprofit running multi-city evangelistic events. Handles one-time and recurring payments across 20+ city-specific fundraising campaigns, with a real-time live donation feed displayed at events. Emphasis on frictionless UX and fast payment flows -- Apple Pay/Google Pay support, animated multi-step forms, and video-gated landing pages -- resulting in measurably higher donation completion rates.',
    role: 'Lead Developer',
    year: '2022-2026',
    tech: ['Next.js', 'Stripe', 'MongoDB', 'Ably', 'TypeScript', 'Framer Motion'],
    highlights: [
      'Processing donations across 20+ city campaigns with individual goals totaling $250k+',
      'Real-time live donation dashboard using Ably pub/sub, displayed on-screen during events with spring-physics animated counters',
      'Reduced payment friction with Apple Pay/Google Pay, multi-step animated forms, and multiple A/B-tested landing page variants',
    ],
    liveUrl: 'https://give.unitedrevival.org/',
    githubUrl: 'https://github.com/UnitedRevival/ur-donations',
    featured: false,
    images: [
      {
        src: '/images/projects/ur-give/ur-1.png',
        alt: 'One-time donation page with campaign hero, progress bar, and preset amount selection',
      },
      {
        src: '/images/projects/ur-give/ur-2.png',
        alt: 'Monthly recurring donation form with selected amount and Give To Jesus March CTA',
      },
      {
        src: '/images/projects/ur-give/ur-3.png',
        alt: 'Live donation progress counter displayed on-screen during events',
      },
    ],
  },
  {
    slug: 'construction-automation',
    title: 'Construction Automation Platform',
    description:
      "Internal automation tool for a construction company. Reverse-engineered a closed third-party API to unlock data entry automation, sales pipeline syncing, and invoice generation that the vendor's own product didn't support.",
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Puppeteer', 'AWS Lambda'],
    images: [],
    privateRepo: true,
    featured: false,
    role: 'Contract Developer',
    year: '2025',
    placeholder: 'automation',
    highlights: [
      "Reverse-engineered an undocumented, closed API to programmatically interface with the client's existing vendor platform",
      'Automated 20+ daily data entry records, eliminating manual input and reducing human error across project records',
      'Built pipeline-to-invoice sync that maps construction project models from the sales pipeline into auto-generated invoices',
      "Headless browser automation via Puppeteer on AWS Lambda for workflows the API couldn't cover",
    ],
  },
]
