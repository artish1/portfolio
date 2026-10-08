import type { Metadata } from 'next'
import { Cormorant_Garamond, Instrument_Sans } from 'next/font/google'
import './global.css'

const serif = Cormorant_Garamond({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['serif'],
  adjustFontFallback: false,
})

const sans = Instrument_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: false,
})

const TITLE = 'Mark Artishuk | Software Engineer'

export const metadata: Metadata = {
  metadataBase: new URL('https://markartishuk.com'),
  title: TITLE,
  description:
    'Software engineer in Sacramento, open to remote. Five years building full-stack products with TypeScript, React, Next.js and Node, including payments, geospatial search and real-time systems.',
  authors: [{ name: 'Mark Artishuk' }],
  openGraph: {
    title: TITLE,
    description: 'Software engineer building full-stack web products. Sacramento, open to remote.',
    type: 'website',
    url: '/',
    images: ['/images/projects/huntnhook/hnh-1.jpg'],
  },
  twitter: { card: 'summary_large_image' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mark Artishuk',
  jobTitle: 'Software Engineer',
  email: 'mailto:markyshuk@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Sacramento', addressRegion: 'CA', addressCountry: 'US' },
  worksFor: { '@type': 'Organization', name: 'American Poolplayers Association' },
  sameAs: ['https://github.com/artish1', 'https://linkedin.com/in/mark-artishuk'],
  knowsAbout: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'Stripe'],
}

// Applied before first paint so the stored / system theme never flashes.
const themeScript = `(function(){var d=true;try{var s=localStorage.getItem('ma-theme-b');d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches}catch(e){}if(d)document.body.classList.add('dark')})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${serif.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
