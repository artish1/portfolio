import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { CAREER_START } from '@/data/experience'
import './global.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
  variable: '--font-display',
  fallback: ['system-ui', 'sans-serif'],
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
  description: `Software engineer in Sacramento, open to remote. Building full-stack products since ${CAREER_START.getFullYear()}, including payments, geospatial search and real-time systems.`,
  authors: [{ name: 'Mark Artishuk' }],
  openGraph: {
    title: TITLE,
    description: 'Software engineer building full-stack web products. Sacramento, open to remote.',
    type: 'website',
    url: '/',
    images: ['/images/projects/huntnhook/01-landing-hero.png'],
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
// The stored choice and the system preference are read separately, so a storage error
// still falls back to the system preference (and to light if neither is available).
const themeScript = `(function(){var s=null,d=false;try{s=localStorage.getItem('ma-theme-b')}catch(e){}if(s==='dark'||s==='light')d=s==='dark';else try{d=matchMedia('(prefers-color-scheme: dark)').matches}catch(e){}if(d)document.body.classList.add('dark')})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${display.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
