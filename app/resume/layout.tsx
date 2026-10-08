import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume | Mark Artishuk',
}

/**
 * Layout override for /resume route.
 * Forces white background and isolates the page from the portfolio theme
 * so it prints cleanly as a PDF.
 */
export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <div className='resume-root'>{children}</div>
}
