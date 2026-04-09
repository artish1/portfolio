'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/theme/ThemeContext'

/**
 * Animated perlin-noise texture behind a dot-grid mask.
 *
 * Layers (inside-out):
 *   1. Noise texture  – a tiled 128x128 noise PNG scaled up to 1024x1024,
 *                        continuously animated via background-position shifts.
 *   2. Dot-grid mask  – a radial-gradient mask that punches the noise into a
 *                        grid of tiny dots, giving it a structured feel.
 *   3. Wrapper        – relatively positioned so it can be placed inside any
 *                        container; fills the parent via absolute inset-0.
 *
 * Inspired by hex.tech's PerlinNoise / DotGridMask treatment.
 */
const PerlinNoise = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const opacity = isDark ? 0.6 : 0.24
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          maskPosition: `0 ${-scrollY}px`,
          WebkitMaskPosition: `0 ${-scrollY}px`,
        }}
      />
    </div>
  )
}

export default PerlinNoise
