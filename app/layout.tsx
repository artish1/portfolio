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
})

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <ToggledProvider>
        <LayoutContent>{children}</LayoutContent>
      </ToggledProvider>
    </ThemeProvider>
  )
}

const LayoutContent = ({ children }) => {
  const { background } = useTailwindThemes();

  return (
    <html lang='en' className={classNames('antialiased', background)}>
      <head>
        <title>Mark Artishuk - Portfolio</title>
        <meta name="description" content="Handcrafted portfolio created by @artish1" />
      </head>
      <body>
        <Layout className={`${font1.className}`}>{children}</Layout>
      </body>
    </html>
  )
}
