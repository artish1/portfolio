'use client'

/**
 * Layout override for /resume route.
 * Forces white background and removes portfolio chrome
 * so the page prints cleanly as a PDF.
 */
export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#fff', minHeight: '100vh' }}>{children}</div>
}
