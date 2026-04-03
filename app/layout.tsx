'use client'
import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { ThemeProvider } from '@/theme/ThemeContext'
import classNames from 'classnames'
import { Noto_Sans } from 'next/font/google'
import { ToggledProvider } from './contexts/ToggledContext'
import useTailwindThemes from '@/hooks/useTailwindThemes'

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
        <title>Mark Artishuk - Creative Developer</title>
        <meta
          name='description'
          content='Senior Software Engineer crafting polished digital experiences with React, Three.js, and modern web technologies.'
        />
        <meta property='og:title' content='Mark Artishuk - Creative Developer' />
        <meta
          property='og:description'
          content='Senior Software Engineer crafting polished digital experiences with React, Three.js, and modern web technologies.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://markartishuk.com' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Mark Artishuk - Creative Developer' />
        <meta
          name='twitter:description'
          content='Senior Software Engineer crafting polished digital experiences with React, Three.js, and modern web technologies.'
        />
      </head>
      <body>
        <Layout className={font1.className}>{children}</Layout>
      </body>
    </html>
  )
}
