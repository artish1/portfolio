import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { Noto_Sans } from 'next/font/google'

const font1 = Noto_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})
export const metadata = {
  title: 'Mark Artishuk - Portfolio',
  description: 'Handcrafted portfolio by @artish1',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Layout className={`${font1.className}`}>{children}</Layout>
      </body>
    </html>
  )
}
