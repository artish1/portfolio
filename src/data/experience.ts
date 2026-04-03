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
    company: 'HuntNHook',
    role: 'Co-Founder',
    period: '2025 - Present',
    type: 'cofounded',
    description:
      'Co-founded and sole-engineered a two-sided marketplace for outdoor recreation. Owned every layer from database schema to deployment pipeline.',
    highlights: [
      'Designed and built the full platform end-to-end: PostGIS search, Stripe Connect payments, real-time messaging, and background job processing',
      'Architected PM2 cluster deployment with dedicated BullMQ workers, Redis PubSub for cross-instance subscriptions, and multi-tier cache invalidation',
    ],
  },
  {
    company: 'American Poolplayers Association',
    role: 'Software Engineer',
    period: 'Feb 2021 - Present',
    type: 'fulltime',
    description:
      'Lead feature development and architecture for member services, tournament systems, and internal staff tools across web and mobile.',
    highlights: [
      'Lead and plan feature development, creating tickets, defining requirements, and ensuring smooth execution across the engineering team',
      "Architect and maintain scalable web and mobile applications serving the organization's nationwide member base",
      'Improve system reliability by refactoring legacy code, optimizing queries, and implementing modern development practices',
      'Enforce code quality and maintainability through documentation, code reviews, and best practices',
    ],
  },
]
