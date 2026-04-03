'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import classNames from 'classnames'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import type { ProjectImage } from '@/data/projects'

// ─── Icons ────────────────────────────────────────────────

const ChevronLeft = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='15 18 9 12 15 6' />
  </svg>
)

const ChevronRight = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='9 6 15 12 9 18' />
  </svg>
)

const CloseIcon = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </svg>
)

// ─── Lightbox ─────────────────────────────────────────────

interface LightboxProps {
  images: ProjectImage[]
  initialIndex?: number
  onClose: () => void
}

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex = 0, onClose }) => {
  const [active, setActive] = useState(initialIndex)
  const [direction, setDirection] = useState(0) // -1 = left, 1 = right
  const hasMultiple = images.length > 1

  const prev = useCallback(() => {
    setDirection(-1)
    setActive((c) => (c === 0 ? images.length - 1 : c - 1))
  }, [images.length])

  const next = useCallback(() => {
    setDirection(1)
    setActive((c) => (c === images.length - 1 ? 0 : c + 1))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasMultiple) {
        e.preventDefault()
        prev()
      } else if (e.key === 'ArrowRight' && hasMultiple) {
        e.preventDefault()
        next()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, hasMultiple, prev, next])

  // Body scroll lock -- simply hide overflow on <html> to prevent
  // background scrolling without repositioning the page.
  useEffect(() => {
    const html = document.documentElement
    const originalOverflow = html.style.overflow

    html.style.overflow = 'hidden'

    return () => {
      html.style.overflow = originalOverflow
    }
  }, [])

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  const content = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className='fixed inset-0 z-[9999] flex flex-col items-center justify-center'
        role='dialog'
        aria-modal='true'
        aria-label='Image lightbox'
      >
        {/* Backdrop */}
        <motion.div
          className='absolute inset-0 bg-black/90 backdrop-blur-xl'
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200 cursor-pointer backdrop-blur-sm'
          aria-label='Close lightbox'
        >
          <CloseIcon />
        </button>

        {/* Image counter */}
        {hasMultiple && (
          <div className='absolute top-6 left-1/2 -translate-x-1/2 z-50'>
            <span className='text-xs font-medium tracking-wider text-white/40'>
              {active + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Main image area */}
        <div className='relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-16 md:px-24 py-20'>
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={images[active].src}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 400, damping: 35 },
                opacity: { duration: 0.2 },
              }}
              className='relative w-full h-full max-w-[1400px] max-h-[85vh]'
            >
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                className='object-contain'
                sizes='(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1400px'
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className='absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.12] transition-all duration-200 cursor-pointer backdrop-blur-sm'
              aria-label='Previous image'
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className='absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.12] transition-all duration-200 cursor-pointer backdrop-blur-sm'
              aria-label='Next image'
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {hasMultiple && (
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2'>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1)
                  setActive(i)
                }}
                className={classNames(
                  'rounded-full transition-all duration-300 cursor-pointer',
                  i === active ? 'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/40',
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Alt text caption */}
        {images[active].alt && (
          <div className='absolute bottom-14 left-1/2 -translate-x-1/2 z-50 max-w-md text-center'>
            <span className='text-[0.7rem] text-white/30 leading-relaxed'>{images[active].alt}</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )

  // Portal to document.body so it renders above everything
  if (typeof window === 'undefined') return null
  return createPortal(content, document.body)
}

export default Lightbox
