'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/theme/ThemeContext'
import PerlinNoise from './PerlinNoise'

/**
 * Full-page decorative background layer.
 *
 * Uses CSS Grid with three columns: two narrow side gutters that carry a
 * repeating diagonal-checker SVG pattern, and a transparent centre column
 * that lets the actual page content show through.
 *
 * Inspired by hex.tech's geometric side-rail treatment.
 */
const BackgroundGrid = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Encode the fill colour for the SVG data-URI.
  // Dark mode: subtle lift above the page bg (#28231F) – just a few steps lighter.
  // Light mode: very faint warm grey.
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fill = isDark ? '%233d3632' : '%23ddd8da'

  const patternUrl = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='4' height='4'><rect width='2' height='2' fill='${fill}'/><rect x='2' y='2' width='2' height='2' fill='${fill}'/></svg>")`

  const sideStyle: React.CSSProperties = {
    backgroundImage: patternUrl,
    backgroundRepeat: 'repeat',
    backgroundPosition: `0 ${-scrollY}px`,
  }

  return (
    <div
      className='pointer-events-none fixed inset-0 z-[1]'
      style={{
        display: 'grid',
        gridTemplateColumns: '2% 1fr 2%',
      }}
    >
      {/* Left gutter – checkerboard only */}
      <div style={sideStyle} />

      {/* Centre – dot-grid + paper texture */}
      <div className='relative overflow-hidden'>
        {/* Paper texture */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: 'url("/assets/light-bkg-noise.webp")',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            backgroundPosition: `0 ${-scrollY}px`,
            mixBlendMode: 'soft-light',
            opacity: 0.5,
          }}
        />
        <PerlinNoise />
      </div>

      {/* Right gutter – checkerboard only */}
      <div style={sideStyle} />
    </div>
  )
}

export default BackgroundGrid
