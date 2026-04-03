export interface ProjectImage {
  src: string
  alt: string
  label?: string
}

export interface Project {
  slug: string
  title: string
  description: string
  tech: string[]
  images: ProjectImage[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  role: string
  year: string
  highlights?: string[]
}

export const projects: Project[] = [
  {
    slug: 'synth-dashboard',
    title: 'Synth Dashboard',
    description:
      'A real-time analytics dashboard for monitoring synthesizer patch usage across a music production platform. Features live WebSocket data streams, interactive charts, and a custom theme engine.',
    tech: ['Next.js', 'TypeScript', 'D3.js', 'WebSockets', 'PostgreSQL'],
    images: [
      { src: '/images/projects/synth-dashboard.svg', alt: 'Synth Dashboard overview', label: 'Overview' },
      { src: '/images/projects/synth-dashboard-charts.svg', alt: 'Live chart detail view', label: 'Charts' },
      { src: '/images/projects/synth-dashboard-mobile.svg', alt: 'Mobile responsive view', label: 'Mobile' },
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    role: 'Full Stack',
    year: '2025',
    highlights: [
      'Real-time data visualization with sub-200ms latency',
      'Custom charting library built on D3 with animated transitions',
      'Served 12k+ monthly active users',
    ],
  },
  {
    slug: 'arcadia-ecommerce',
    title: 'Arcadia',
    description:
      'A premium e-commerce storefront with 3D product previews, AI-powered recommendations, and a headless CMS for content management.',
    tech: ['React', 'Three.js', 'Node.js', 'Stripe', 'Sanity CMS'],
    images: [
      { src: '/images/projects/arcadia.svg', alt: 'Arcadia storefront', label: 'Storefront' },
      { src: '/images/projects/arcadia-product.svg', alt: '3D product configurator', label: 'Product' },
      { src: '/images/projects/arcadia-mobile.svg', alt: 'Mobile shopping experience', label: 'Mobile' },
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    role: 'Frontend Lead',
    year: '2024',
    highlights: [
      '3D product configurator with real-time material swapping',
      '40% increase in conversion rate vs. previous storefront',
      'Lighthouse performance score of 96',
    ],
  },
  {
    slug: 'noter',
    title: 'Noter',
    description:
      'A collaborative markdown note-taking app with real-time sync, offline support, and a distraction-free writing mode.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'TipTap', 'Tailwind CSS'],
    images: [
      { src: '/images/projects/noter.svg', alt: 'Noter editor', label: 'Editor' },
      { src: '/images/projects/noter-collab.svg', alt: 'Real-time collaboration', label: 'Collaboration' },
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    role: 'Full Stack',
    year: '2024',
  },
  {
    slug: 'pulse-api',
    title: 'Pulse API',
    description:
      'A high-performance REST & GraphQL API gateway for aggregating health and fitness data from multiple wearable devices.',
    tech: ['Node.js', 'GraphQL', 'Redis', 'Docker', 'AWS'],
    images: [
      { src: '/images/projects/pulse-api.svg', alt: 'API documentation', label: 'Docs' },
      { src: '/images/projects/pulse-api-schema.svg', alt: 'GraphQL schema explorer', label: 'Schema' },
    ],
    githubUrl: 'https://github.com',
    featured: false,
    role: 'Backend',
    year: '2024',
  },
  {
    slug: 'chromaflow',
    title: 'ChromaFlow',
    description:
      'A generative art tool that creates procedural color palettes and gradient compositions, exportable as CSS, SVG, or PNG.',
    tech: ['React', 'Canvas API', 'WebGL', 'Framer Motion'],
    images: [
      { src: '/images/projects/chromaflow.svg', alt: 'ChromaFlow generator', label: 'Generator' },
      { src: '/images/projects/chromaflow-export.svg', alt: 'Export options', label: 'Export' },
    ],
    liveUrl: 'https://example.com',
    featured: false,
    role: 'Creator',
    year: '2023',
  },
  {
    slug: 'devfolio-cli',
    title: 'Devfolio CLI',
    description:
      'A command-line tool that scaffolds developer portfolio sites from templates with built-in deployment to Vercel and Netlify.',
    tech: ['TypeScript', 'Node.js', 'Ink', 'Commander.js'],
    images: [
      { src: '/images/projects/devfolio-cli.svg', alt: 'CLI interface', label: 'CLI' },
      { src: '/images/projects/devfolio-cli-output.svg', alt: 'Generated site output', label: 'Output' },
    ],
    githubUrl: 'https://github.com',
    featured: false,
    role: 'Creator',
    year: '2023',
  },
]
