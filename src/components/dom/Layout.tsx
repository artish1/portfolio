'use client'

const Layout = ({ children, className }) => {
  return (
    <div className={className} style={{ isolation: 'isolate', zIndex: 2, position: 'relative' }}>
      {children}
    </div>
  )
}

export { Layout }
