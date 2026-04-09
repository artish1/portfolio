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
      'Architected and built a two-sided marketplace for outdoor experiences (fishing, hunting, recreation), owning all technical decisions from schema design to production deployment. End-to-end platform covering geospatial search, booking with escrow-style payments, real-time messaging, Stripe Connect host payouts, and distributed background job processing.',
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
    role: 'Co-Founder / Lead Engineer',
    year: '2026',
    highlights: [
      'Designed and implemented a full Stripe Connect payment system including escrow-style holds, delayed payouts, dispute handling, and idempotent webhook processing',
      'Built geospatial search using PostGIS with efficient bounding-box queries, distance sorting, and multi-dimensional filtering',
      'Designed distributed system architecture using PM2 clustering, BullMQ worker queues, and Redis Pub/Sub for real-time GraphQL subscriptions across instances',
      'Implemented a multi-layer caching strategy with intelligent invalidation to support scalable, low-latency data access patterns',
      'Established production-ready infrastructure and deployment workflows for a scalable marketplace platform',
    ],
  },
  {
    slug: 'rafa-sauna',
    title: 'Rafa Sauna',
    description:
      'Designed and delivered a full-stack booking, membership, and POS platform, including admin dashboard, customer-facing flows, and kiosk systems. Built NFC-based payment system using JWT-backed wristbands for seamless contactless transactions across devices.',
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
    role: 'Full-Stack Platform (Contract)',
    year: '2025',
    highlights: [
      'Built NFC-based payment system using JWT-backed wristbands, enabling seamless contactless transactions across devices',
      'Architected a custom booking engine supporting capacity constraints, dynamic pricing, and real-time availability management',
      'Integrated Stripe for subscriptions, one-time payments, Apple Pay, refunds, and promotions',
      'Delivered a production-ready system spanning web, mobile, and kiosk environments',
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
      'Engineered an internal automation system by reverse-engineering a closed third-party API to enable programmatic data entry and workflow automation. Automated high-volume operational tasks, reducing manual workload and improving data accuracy.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Puppeteer', 'AWS Lambda'],
    images: [],
    privateRepo: true,
    featured: false,
    role: 'Contract Developer',
    year: '2025',
    placeholder: 'automation',
    highlights: [
      'Engineered an internal automation system by reverse-engineering a closed third-party API to enable programmatic data entry and workflow automation',
      'Automated high-volume operational tasks (20+ daily records), reducing manual workload and improving data accuracy',
      'Built pipeline-to-invoice synchronization logic, transforming operational data into structured financial outputs',
      'Implemented headless browser automation using Puppeteer on AWS Lambda for unsupported workflows',
    ],
  },
]
