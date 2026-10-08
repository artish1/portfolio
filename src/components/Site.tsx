'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { EMAIL, tenure as computeTenure } from '@/data/experience'
import { projectHref, projectIndex, projects } from '@/data/projects'
import { decodeHero, warmGallery, warmHero, whenIdle } from './images'
import Home from './Home'
import ProjectView from './ProjectView'
import Lightbox from './Lightbox'

type VT = { finished: Promise<void>; updateCallbackDone: Promise<void> }
type Zoom = { pi: number; ii: number }

const HOME_TITLE = 'Mark Artishuk | Software Engineer'
const NAV = ['about', 'experience', 'work', 'contact'] as const

const slugFromPath = (path: string | null) => {
  const m = (path || '').match(/^\/work\/([\w-]+)\/?$/)
  return m && projectIndex(m[1]) >= 0 ? m[1] : null
}
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const startVT = (cb: () => void | Promise<void>): VT | null => {
  const d = document as Document & { startViewTransition?: (cb: () => void | Promise<void>) => VT }
  return d.startViewTransition && !reducedMotion() ? d.startViewTransition(cb) : null
}
const clearTempNames = () =>
  document.querySelectorAll<HTMLElement>('[data-vtn]').forEach((el) => {
    el.style.removeProperty('view-transition-name')
    el.style.removeProperty('view-transition-class')
  })

export default function Site({ children }: { children?: ReactNode }) {
  const pathname = usePathname()
  const [route, setRoute] = useState<string | null>(() => slugFromPath(pathname))
  const [dark, setDark] = useState(false)
  const [active, setActive] = useState<string>('about')
  const [zoom, setZoom] = useState<Zoom | null>(null)
  const [zoomDir, setZoomDir] = useState(0)
  const [zoomClosing, setZoomClosing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [tenure, setTenure] = useState(() => computeTenure())

  const routeRef = useRef(route)
  const darkRef = useRef(dark)
  const zoomRef = useRef(zoom)
  const depth = useRef(0)
  const listY = useRef<number | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const swipe = useRef({ acc: 0, prev: 0, last: 0, lock: false, ts: null as null | { x: number; y: number } })
  routeRef.current = route
  darkRef.current = dark
  zoomRef.current = zoom

  const later = (key: string, fn: () => void, ms: number) => {
    clearTimeout(timers.current[key])
    timers.current[key] = setTimeout(fn, ms)
  }

  const computeActive = useCallback(() => {
    const line = window.innerHeight * 0.4
    let a = 'about'
    document.querySelectorAll('[data-spy]').forEach((el) => {
      if (el.getBoundingClientRect().top <= line) a = el.getAttribute('data-spy') as string
    })
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) a = 'contact'
    return a
  }, [])

  const updateProgress = useCallback(() => {
    const bar = document.querySelector<HTMLElement>('[data-progress]')
    if (!bar) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    bar.style.transform = 'scaleX(' + p + ')'
  }, [])

  // ─── Navigation (view transitions between home and case studies) ───────
  const navigate = useCallback(
    (next: string | null) => {
      const cur = routeRef.current
      if (next === cur) return
      clearTempNames()
      let dir = !cur ? 'vt-fwd' : !next ? 'vt-back' : 'vt-swap'
      if (cur && next) {
        const n = projects.length
        const ci = projectIndex(cur)
        const ni = projectIndex(next)
        if (ci >= 0 && ni >= 0) dir = ni === (ci + 1) % n ? 'vt-next' : ni === (ci - 1 + n) % n ? 'vt-prev' : 'vt-swap'
        const src =
          dir === 'vt-next'
            ? document.querySelector('a[data-row="next"]')
            : dir === 'vt-prev'
              ? document.querySelector('a[data-prev-row]')
              : null
        src?.querySelectorAll<HTMLElement>('[data-vtn]').forEach((el) => {
          if (el.hasAttribute('data-peek-thumb') && Number(getComputedStyle(el).opacity) < 0.2) return
          el.style.setProperty('view-transition-name', el.getAttribute('data-vtn'))
          el.style.setProperty('view-transition-class', 'vt-morph')
        })
      }
      if (!cur) {
        listY.current = window.scrollY
        depth.current = 1
      } else if (next) depth.current += 1
      else depth.current = 0

      const p = next ? projects[projectIndex(next)] : null

      const update = () => {
        flushSync(() => setRoute(next))
        routeRef.current = next
        clearTempNames()
        let y = 0
        if (!next) {
          const w = document.getElementById('work')
          y = listY.current != null ? listY.current : w ? w.getBoundingClientRect().top + window.scrollY - 24 : 0
          listY.current = null
        }
        window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
        if (!next) flushSync(() => setActive(computeActive()))
        document.title = p ? p.title + ' | Mark Artishuk' : HOME_TITLE
        requestAnimationFrame(updateProgress)
      }
      const focus = () => {
        if (next) document.querySelector<HTMLElement>('[data-pv-title]')?.focus({ preventScroll: true })
        else if (cur) document.querySelector<HTMLElement>(`a[data-row="${cur}"]`)?.focus({ preventScroll: true })
      }
      const go = () => {
        const root = document.documentElement
        root.classList.add(dir)
        const t = startVT(update)
        if (t) {
          t.updateCallbackDone.then(focus, focus)
          t.finished.finally(() => root.classList.remove(dir))
        } else {
          root.classList.remove(dir)
          update()
          focus()
        }
      }
      const hero = p?.images[0]?.src
      if (hero) decodeHero(hero).then(go)
      else go()
    },
    [computeActive, updateProgress],
  )

  const openProject = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      if (slug === routeRef.current) return
      window.history.pushState(null, '', projectHref(slug))
      navigate(slug)
    },
    [navigate],
  )

  const goBack = useCallback(() => {
    const toWork = () => {
      depth.current = 0
      window.history.pushState(null, '', '/#work')
      navigate(null)
    }
    if (depth.current > 0) {
      const from = window.location.href
      window.history.go(-depth.current)
      later('back', () => window.location.href === from && toWork(), 180)
    } else toWork()
  }, [navigate])

  // ─── Theme ─────────────────────────────────────────────────────────────
  const setTheme = useCallback((d: boolean, e: MouseEvent<HTMLButtonElement>) => {
    if (d === darkRef.current) return
    const root = document.documentElement
    try {
      localStorage.setItem('ma-theme-b', d ? 'dark' : 'light')
    } catch {
      // storage or history may be unavailable (private mode, sandboxed iframes)
    }
    root.classList.add('theme-touched')
    const r = e.currentTarget.getBoundingClientRect()
    const fx = (r.left + r.width / 2) / window.innerWidth
    const fy = (r.top + r.height / 2) / window.innerHeight
    const u = d ? 0.5 * fx + 0.5 * (1 - fy) : 0.5 * (1 - fx) + 0.5 * fy
    const supported = 'startViewTransition' in document && !reducedMotion()
    root.style.setProperty('--ispin-delay', (supported ? Math.round(600 * (0.12 + 0.72 * u)) : 0) + 'ms')
    root.classList.remove('icon-spin')
    void root.offsetWidth
    root.classList.add('icon-spin')
    later('spin', () => root.classList.remove('icon-spin'), 1400)
    const apply = () => {
      document.body.classList.toggle('dark', d)
      flushSync(() => setDark(d))
    }
    const dirCls = d ? 'vt-to-dark' : 'vt-to-light'
    root.classList.add('vt-theme', dirCls)
    const t = startVT(apply)
    if (t) t.finished.finally(() => root.classList.remove('vt-theme', dirCls))
    else {
      root.classList.remove('vt-theme', dirCls)
      apply()
    }
  }, [])

  // ─── Lightbox ──────────────────────────────────────────────────────────
  const openZoom = useCallback((pi: number, ii: number) => {
    clearTimeout(timers.current.zoom)
    returnFocus.current = document.activeElement as HTMLElement
    setZoomClosing(false)
    setZoomDir(0)
    setZoom({ pi, ii })
  }, [])
  const closeZoom = useCallback(() => {
    if (!zoomRef.current) return
    setZoomClosing(true)
    later(
      'zoom',
      () => {
        setZoom(null)
        setZoomClosing(false)
      },
      140,
    )
  }, [])
  const stepZoom = useCallback((d: number) => {
    const z = zoomRef.current
    if (!z) return
    const n = projects[z.pi].images.length
    setZoomDir(d > 0 ? 1 : -1)
    setZoom({ pi: z.pi, ii: (z.ii + d + n) % n })
  }, [])

  useEffect(() => {
    const open = !!zoom
    const root = document.documentElement
    root.style.overflow = open ? 'hidden' : ''
    root.style.overscrollBehaviorX = open ? 'none' : ''
    document.querySelectorAll<HTMLElement & { inert: boolean }>('[data-page]').forEach((el) => (el.inert = open))
    if (open) document.querySelector<HTMLElement>('[data-zoom-close]')?.focus()
    else if (returnFocus.current) {
      returnFocus.current.focus()
      returnFocus.current = null
    }
  }, [!!zoom]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Copy feedback ─────────────────────────────────────────────────────
  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {})
    setCopied(true)
    later('copy', () => setCopied(false), 1600)
  }, [])
  const copyLink = useCallback(() => {
    const slug = routeRef.current
    navigator.clipboard?.writeText(window.location.origin + (slug ? projectHref(slug) : '/')).catch(() => {})
    setLinkCopied(true)
    later('link', () => setLinkCopied(false), 1800)
  }, [])

  // ─── Image warm-up ─────────────────────────────────────────────────────
  // After load, quietly fetch every case-study hero (then the gallery tiles), starting with
  // the projects you're most likely to open next, so case studies open on a cached image.
  useEffect(
    () =>
      whenIdle(() => {
        const n = projects.length
        const start = Math.max(0, projectIndex(routeRef.current))
        const order = projects.map((_, i) => projects[(start + 1 + i) % n])
        order
          .reduce(
            (chain, p) => chain.then(() => (p.images[0] ? warmHero(p.images[0].src) : undefined)),
            Promise.resolve(),
          )
          .then(() => order.forEach((p) => p.images.slice(1).forEach((im) => warmGallery(im.src))))
      }),
    [],
  )

  // ─── Global listeners ──────────────────────────────────────────────────
  useEffect(() => {
    setDark(document.body.classList.contains('dark'))
    setTenure(computeTenure())
    try {
      window.history.scrollRestoration = 'manual'
    } catch {
      // storage or history may be unavailable (private mode, sandboxed iframes)
    }

    const w = window as Window & { __maHello?: boolean }
    if (!w.__maHello) {
      w.__maHello = true
      console.log('%cMark Artishuk', "font:600 28px 'Cormorant Garamond',Georgia,serif;color:#C8A47E")
      console.log(
        '%cLooking at the source? Same thing I would do.\nI built this site myself, no templates.\nIf you want to talk shop: markyshuk@gmail.com',
        'font:13px system-ui;color:#9a8f86;line-height:1.6',
      )
    }

    const onPop = () => {
      const next = slugFromPath(window.location.pathname)
      if (next !== routeRef.current) navigate(next)
    }
    const onKey = (e: KeyboardEvent) => {
      if (!zoomRef.current) {
        if (e.key === 'Escape' && routeRef.current) goBack()
        return
      }
      if (e.key === 'Escape') closeZoom()
      else if (e.key === 'ArrowRight') stepZoom(1)
      else if (e.key === 'ArrowLeft') stepZoom(-1)
    }
    const s = swipe.current
    const onWheel = (e: WheelEvent) => {
      const z = zoomRef.current
      if (!z) return
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      if (projects[z.pi].images.length < 2) return
      const ad = Math.abs(e.deltaX)
      const now = performance.now()
      const prev = s.prev
      s.prev = ad
      later(
        'wheel',
        () => {
          s.lock = false
          s.acc = 0
          s.prev = 0
        },
        140,
      )
      // momentum decays smoothly; a sudden rise in speed means a new swipe has started
      if (s.lock && now - s.last > 220 && ad > 8 && ad > prev * 1.6) {
        s.lock = false
        s.acc = 0
      }
      if (s.lock) return
      s.acc += e.deltaX
      if (Math.abs(s.acc) > 40) {
        stepZoom(s.acc > 0 ? 1 : -1)
        s.lock = true
        s.acc = 0
        s.last = now
      }
    }
    const onTS = (e: TouchEvent) => {
      if (!zoomRef.current || !e.touches[0]) return
      s.ts = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    const onTE = (e: TouchEvent) => {
      if (!zoomRef.current || !s.ts || !e.changedTouches[0]) return
      const dx = e.changedTouches[0].clientX - s.ts.x
      const dy = e.changedTouches[0].clientY - s.ts.y
      s.ts = null
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) stepZoom(dx < 0 ? 1 : -1)
    }
    const onScroll = () => {
      if (routeRef.current) return
      setActive(computeActive())
    }

    window.addEventListener('popstate', onPop)
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTS, { passive: true })
    window.addEventListener('touchend', onTE, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', updateProgress, { passive: true })
    onScroll()
    updateProgress()
    const t = timers.current
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTS)
      window.removeEventListener('touchend', onTE)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', updateProgress)
      Object.values(t).forEach(clearTimeout)
      document.documentElement.style.overflow = ''
      document.documentElement.style.overscrollBehaviorX = ''
    }
  }, [navigate, goBack, closeZoom, stepZoom, computeActive, updateProgress])

  const pi = projectIndex(route)
  const status = copied ? 'Email address copied to clipboard' : linkCopied ? 'Link to this project copied' : ''

  return (
    <div className='screen'>
      <span role='status' aria-live='polite' className='sr-only'>
        {status}
      </span>
      <a href={pi >= 0 ? '#pv-title' : '#about'} className='skip'>
        Skip to content
      </a>
      <div data-print-hide='1' aria-hidden='true' className='ambient'>
        <div className='orb orb-1' />
        <div className='orb orb-2' />
        <div className='orb orb-3' />
        <div className='orb orb-4' />
      </div>
      <div data-print-hide='1' className='noise' />

      {pi < 0 ? (
        <Home
          active={active}
          nav={NAV}
          dark={dark}
          onTheme={setTheme}
          copied={copied}
          onCopyEmail={copyEmail}
          tenure={tenure}
          onOpenProject={openProject}
        />
      ) : (
        <ProjectView
          pi={pi}
          onBack={goBack}
          onOpenProject={openProject}
          linkCopied={linkCopied}
          onCopyLink={copyLink}
          onZoom={openZoom}
        />
      )}

      {zoom && <Lightbox zoom={zoom} dir={zoomDir} closing={zoomClosing} onClose={closeZoom} onStep={stepZoom} />}
      {children}
    </div>
  )
}
