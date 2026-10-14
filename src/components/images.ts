import { getImageProps } from 'next/image'

export const HERO_SIZES = '(max-width: 1199.98px) calc(100vw - 48px), 1152px'
// Screens run full width when there's an odd one out, otherwise two to a row.
export const SCREEN_WIDE_SIZES = HERO_SIZES
export const SCREEN_SIZES = '(max-width: 899.98px) calc(100vw - 48px), 720px'
// A screen set beside the decision it shows.
export const DECISION_SIZES = '(max-width: 899.98px) calc(100vw - 48px), 520px'
// Thumbnails are zoomed-in crops (up to ~1.9×), so they need more pixels than their box.
export const THUMB_SIZES = '(max-width: 899.98px) 180vw, 1100px'
export const LIGHTBOX_SIZES = '(max-width: 1431.98px) calc(100vw - 32px), 1400px'
export const SHOT_QUALITY = 85

// Detached images are kept alive here so in-flight loads aren't dropped, and so each
// variant is only requested once.
const warmed = new Map<string, Promise<void>>()

/**
 * Fetch + decode an image exactly as a <Image fill sizes quality> on the page would request it
 * (same srcset, same sizes → the browser picks the same candidate), so the on-page element is an
 * instant cache hit.
 */
function warm(src: string, sizes: string, quality?: number): Promise<void> {
  const key = src + '|' + sizes + '|' + quality
  const hit = warmed.get(key)
  if (hit) return hit
  const { props } = getImageProps({ src, alt: '', fill: true, sizes, quality })
  const im = new Image()
  im.decoding = 'async'
  if (props.sizes) im.sizes = props.sizes
  if (props.srcSet) im.srcset = props.srcSet
  im.src = props.src
  const ready = im.decode ? im.decode().catch(() => {}) : Promise.resolve()
  warmed.set(key, ready)
  return ready
}

export const warmHero = (src: string) => warm(src, HERO_SIZES, SHOT_QUALITY)
export const warmScreen = (src: string, wide: boolean) =>
  warm(src, wide ? SCREEN_WIDE_SIZES : SCREEN_SIZES, SHOT_QUALITY)
export const warmDecision = (src: string) => warm(src, DECISION_SIZES, SHOT_QUALITY)

/** Group a project's extra screens into rows: a lone first screen when the count is odd, then pairs. */
export function screenRows<T>(items: T[]): T[][] {
  const rows: T[][] = []
  let i = 0
  if (items.length % 2 === 1) rows.push([items[i++]])
  for (; i < items.length; i += 2) rows.push(items.slice(i, i + 2))
  return rows
}
export const warmLightbox = (src: string) => warm(src, LIGHTBOX_SIZES, SHOT_QUALITY)

/** Decode the hero before a transition, so a morph never lands on a blank frame. */
export function decodeHero(src: string, maxWait = 250): Promise<void> {
  return Promise.race([warmHero(src), new Promise<void>((r) => setTimeout(r, maxWait))])
}

const saveData = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return !!c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))
}

/** Run once the page has finished loading and the main thread is idle, unless the visitor is saving data. */
export function whenIdle(fn: () => void): () => void {
  if (saveData()) return () => {}
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
    cancelIdleCallback?: (id: number) => void
  }
  let idle = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  const schedule = () => {
    if (w.requestIdleCallback) idle = w.requestIdleCallback(fn, { timeout: 2500 })
    else timer = setTimeout(fn, 600)
  }
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
  return () => {
    window.removeEventListener('load', schedule)
    if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle)
    clearTimeout(timer)
  }
}
