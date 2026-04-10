'use client'

import { useTheme } from '@/theme/ThemeContext'

/**
 * Dot-grid mask overlay.
 *
 * Renders a flat color punched through a radial-gradient dot mask, giving a
 * subtle dotted texture. Lives inside a fixed parent so it stays anchored to
 * the viewport naturally — no scroll listeners needed.
 *
 * Inspired by hex.tech's DotGridMask treatment.
 */
const PerlinNoise = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const dotColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
  const dotGrid = 'radial-gradient(white, white 1px, transparent 1px, transparent)'

  return (
    <div className='absolute inset-0 overflow-hidden'>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: dotColor,
          maskImage: dotGrid,
          WebkitMaskImage: dotGrid,
          maskSize: '10px 10px',
          WebkitMaskSize: '10px 10px',
        }}
      />
    </div>
  )
}

export default PerlinNoise
