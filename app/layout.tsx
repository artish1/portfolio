'use client'
import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { ThemeProvider } from '@/theme/ThemeContext'
import classNames from 'classnames'
import { Noto_Sans } from 'next/font/google'
import { ToggledProvider } from './contexts/ToggledContext'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import BackgroundGrid from '@/components/decorative/BackgroundGrid'

const font1 = Noto_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToggledProvider>
        <LayoutContent>{children}</LayoutContent>
      </ToggledProvider>
    </ThemeProvider>
  )
}

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { background } = useTailwindThemes()

  return (
    <html lang='en' className={classNames('antialiased', background)}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, minimum-scale=1, initial-scale=1.0' />
        <title>Mark Artishuk - Senior Software Engineer</title>
        <meta
          name='description'
          content='Senior Software Engineer with 6+ years of experience building scalable full-stack applications using TypeScript, React, Next.js, and Node.js. Open to new opportunities.'
        />
        <meta name='author' content='Mark Artishuk' />
        <meta name='robots' content='index,follow' />
        <meta name='theme-color' content='#28231F' />

        {/* Open Graph */}
        <meta property='og:title' content='Mark Artishuk - Senior Software Engineer' />
        <meta
          property='og:description'
          content='Senior Software Engineer with 6+ years of experience building scalable full-stack applications using TypeScript, React, Next.js, and Node.js. Open to new opportunities.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://markartishuk.com' />
        <meta property='og:image' content='https://markartishuk.com/icons/share.png' />
        <meta property='og:site_name' content='Mark Artishuk - Senior Software Engineer' />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Mark Artishuk - Senior Software Engineer' />
        <meta
          name='twitter:description'
          content='Senior Software Engineer with 6+ years of experience building scalable full-stack applications using TypeScript, React, Next.js, and Node.js. Open to new opportunities.'
        />
        <meta name='twitter:image' content='https://markartishuk.com/icons/share.png' />

        {/* Icons */}
        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link rel='apple-touch-icon' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='apple-touch-icon' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' color='#C8A47E' href='/icons/safari-pinned-tab.svg' />
        <link rel='shortcut icon' href='/icons/apple-touch-icon.png' />
      </head>
      <body>
        <BackgroundGrid />
        <Layout className={font1.className}>{children}</Layout>
      </body>
    </html>
  )
}
