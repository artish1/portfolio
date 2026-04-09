export interface Experience {
  company: string
  role: string
  period: string
  type: 'fulltime' | 'cofounded' | 'contract'
  description: string
  highlights: string[]
  tech?: string[]
}

export const experience: Experience[] = [
  {
    company: 'American Poolplayers Association',
    role: 'Senior Software Engineer',
    period: 'Feb 2021 – Present',
    type: 'fulltime',
    description:
      'Led end-to-end development of core platform features supporting 200,000+ active users across league play, tournament management, and internal operations.',
    highlights: [
      'Drove architectural decisions across frontend and backend systems, improving scalability and maintainability of high-traffic applications',
      'Reduced critical endpoint latency by up to 77% and improved overall system responsiveness by ~20% through advanced query optimization, indexing strategies, and multi-layer caching',
      'Spearheaded frontend performance improvements by eliminating unnecessary re-renders and restructuring component architecture',
      'Mentored engineers through code reviews, system design guidance, and enforcing modern development standards across the team',
      'Partnered with product and stakeholders to translate ambiguous requirements into scalable technical solutions',
    ],
  },
  {
    company: 'HuntNHook',
    role: 'Co-Founder / Lead Engineer',
    period: '2025 – Present',
    type: 'cofounded',
    description:
      'Architected and built a two-sided marketplace for outdoor experiences (fishing, hunting, recreation), owning all technical decisions from schema design to production deployment.',
    highlights: [
      'Designed and implemented a full Stripe Connect payment system including escrow-style holds, delayed payouts, dispute handling, and idempotent webhook processing',
      'Built geospatial search using PostGIS with efficient bounding-box queries, distance sorting, and multi-dimensional filtering',
      'Designed distributed system architecture using PM2 clustering, BullMQ worker queues, and Redis Pub/Sub for real-time GraphQL subscriptions across instances',
      'Implemented a multi-layer caching strategy with intelligent invalidation to support scalable, low-latency data access patterns',
    ],
  },
]
