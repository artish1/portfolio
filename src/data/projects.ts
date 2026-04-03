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
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=800&fit=crop',
        alt: 'Dashboard analytics overview',
      },
      {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=800&fit=crop',
        alt: 'Data visualization charts',
      },
      {
        src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1280&h=800&fit=crop',
        alt: 'Code and development view',
      },
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
      {
        src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1280&h=800&fit=crop',
        alt: 'E-commerce storefront',
      },
      {
        src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1280&h=800&fit=crop',
        alt: 'Product detail page',
      },
      {
        src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&h=800&fit=crop',
        alt: 'Shopping cart and checkout',
      },
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
      {
        src: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=1280&h=800&fit=crop',
        alt: 'Note-taking interface',
      },
      {
        src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1280&h=800&fit=crop',
        alt: 'Organized notes and lists',
      },
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
      {
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1280&h=800&fit=crop',
        alt: 'Server infrastructure',
      },
      {
        src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1280&h=800&fit=crop',
        alt: 'API monitoring dashboard',
      },
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
      {
        src: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1280&h=800&fit=crop',
        alt: 'Generative color art',
      },
      {
        src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1280&h=800&fit=crop',
        alt: 'Gradient compositions',
      },
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
      {
        src: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1280&h=800&fit=crop',
        alt: 'Terminal and CLI interface',
      },
      {
        src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=800&fit=crop',
        alt: 'Code editor view',
      },
    ],
    githubUrl: 'https://github.com',
    featured: false,
    role: 'Creator',
    year: '2023',
  },
]
