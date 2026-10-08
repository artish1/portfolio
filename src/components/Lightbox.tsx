import Image from 'next/image'
import { useEffect, type MouseEvent } from 'react'
import { projects } from '@/data/projects'
import { Close } from './icons'
import { LIGHTBOX_SIZES, SHOT_QUALITY, warmLightbox } from './images'

interface Props {
  zoom: { pi: number; ii: number }
  dir: number
  closing: boolean
  onClose: () => void
  onStep: (d: number) => void
}

const stop = (e: MouseEvent) => e.stopPropagation()

export default function Lightbox({ zoom, dir, closing, onClose, onStep }: Props) {
  const p = projects[zoom.pi]
  const im = p.images[zoom.ii]
  const many = p.images.length > 1

  useEffect(() => {
    const n = p.images.length
    if (n < 2) return
    warmLightbox(p.images[(zoom.ii + 1) % n].src)
    warmLightbox(p.images[(zoom.ii - 1 + n) % n].src)
  }, [p, zoom.ii])

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={p.title + ' screenshots'}
      onClick={onClose}
      data-closing={closing ? '' : undefined}
      className='lb'
    >
      <button onClick={onClose} aria-label='Close' data-zoom-close='1' data-press='1' className='lb-btn lb-close'>
        <Close />
      </button>
      <div key={im.src} onClick={stop} data-dir={dir} className='lb-img'>
        <Image src={im.src} alt={im.alt} fill sizes={LIGHTBOX_SIZES} quality={SHOT_QUALITY} loading='eager' />
      </div>
      <div onClick={stop} className='lb-caption'>
        {many && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onStep(-1)
            }}
            aria-label='Previous screenshot'
            data-press='1'
            className='lb-btn'
          >
            ←
          </button>
        )}
        <p>
          <strong>{p.title}</strong> · {im.alt} <span>· {`${zoom.ii + 1} / ${p.images.length}`}</span>
        </p>
        {many && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onStep(1)
            }}
            aria-label='Next screenshot'
            data-press='1'
            className='lb-btn'
          >
            →
          </button>
        )}
      </div>
    </div>
  )
}
