import Image from 'next/image'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type RefObject,
} from 'react'
import { flushSync } from 'react-dom'
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
  apaHighlights,
  coreStack,
  otherRoles,
  proof,
} from '@/data/experience'
import { projectHref, projects } from '@/data/projects'
import { ArrowRight, Check, Copy } from './icons'
import { THUMB_SIZES, warmHero } from './images'
import ThemeControl, { type SetTheme } from './ThemeControl'

type OpenProject = (e: MouseEvent<HTMLAnchorElement>, slug: string) => void
export type CopyState = 'idle' | 'copied' | 'selected'

const LABELS: Record<string, string> = { about: 'About', work: 'Work', experience: 'Experience', contact: 'Contact' }
const NAME = 'Mark Artishuk'
/** Fired by Site once the home page's scroll position has been restored. */
export const SCROLL_RESTORED = 'ma:scroll-restored'

interface Props {
  active: string
  nav: readonly string[]
  dark: boolean
  onTheme: SetTheme
  copy: CopyState
  onCopyEmail: (e: MouseEvent<HTMLButtonElement>) => void
  tenure: string
  years: number
  onOpenProject: OpenProject
}

export default function Home({ active, nav, dark, onTheme, copy, onCopyEmail, tenure, years, onOpenProject }: Props) {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [nameOut, setNameOut] = useState(false)
  const [nameInstant, setNameInstant] = useState(false)

  // The bar only shows the name once the big one on the page has scrolled away.
  useEffect(() => {
    const el = nameRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setNameOut(!e.isIntersecting && e.boundingClientRect.top < 0), {
      rootMargin: '-100px 0px 0px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Coming back from a case study jumps straight to the work list. Settle the bar before the
  // page is shown, without the expand animation, instead of waiting for the observer.
  useLayoutEffect(() => {
    const sync = () => {
      const el = nameRef.current
      if (!el) return
      const out = el.getBoundingClientRect().bottom <= 100
      flushSync(() => {
        setNameInstant(true)
        setNameOut(out)
      })
      requestAnimationFrame(() => setNameInstant(false))
    }
    window.addEventListener(SCROLL_RESTORED, sync)
    return () => window.removeEventListener(SCROLL_RESTORED, sync)
  }, [])

  return (
    <>
      <header data-print-hide='1' data-page='1' className='bar site-bar'>
        <div className='site-bar-row'>
          <a
            href='#top'
            data-show={nameOut ? '' : undefined}
            data-instant={nameInstant ? '' : undefined}
            aria-hidden={nameOut ? undefined : 'true'}
            tabIndex={nameOut ? undefined : -1}
            className='display site-name'
          >
            {NAME}
          </a>
          <nav aria-label='Sections' className='site-nav'>
            {nav.map((id) => (
              <a
                key={id}
                href={'#' + id}
                aria-current={active === id ? 'true' : undefined}
                data-press='1'
                className='site-link'
              >
                {LABELS[id]}
              </a>
            ))}
          </nav>
          <div className='site-actions'>
            <a href={RESUME_URL} className='site-resume'>
              Resume
            </a>
            <a href={`mailto:${EMAIL}`} data-press='1' className='btn-fill site-email'>
              <span className='site-email-short'>Email</span>
              <span data-email='1' className='site-email-full'>
                {EMAIL}
              </span>
            </a>
            <CopyButton copy={copy} onCopy={onCopyEmail} />
          </div>
        </div>
      </header>

      <div id='top' data-page='1' className='home'>
        <main className='main'>
          <section id='about' data-spy='about' className='hero'>
            <div className='hero-intro'>
              <p className='hero-eyebrow'>Software Engineer · Sacramento, CA · Open to remote</p>
              <HeroName nameRef={nameRef} />
              <p className='lead'>
                I&apos;ve been writing software professionally for <span suppressHydrationWarning>{years}</span> years.
                At the <strong>American Poolplayers Association</strong> I work across the stack on a platform with{' '}
                <strong>200,000+ players</strong>. I&apos;m also a co-founder of{' '}
                <a href={projectHref('huntnhook')} onClick={(e) => onOpenProject(e, 'huntnhook')} data-ul='1'>
                  <strong>HuntNHook</strong>
                </a>
                , where I lead engineering. Most of my time goes into performance and into keeping code easy for the
                next person to work in.
              </p>
            </div>
            <ul aria-label='At a glance' className='proof'>
              {proof.map((f) => (
                <li key={f.value} className='proof-item'>
                  <span className='display proof-value'>{f.value}</span>
                  <span className='proof-label'>{f.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id='work' data-spy='work' className='work'>
            <div className='section-head'>
              <h2 className='display h2'>Selected work</h2>
              <p className='note'>
                Most of these codebases are private. I&apos;m happy to walk through any of them on a call.
              </p>
            </div>
            <WorkList onOpenProject={onOpenProject} />
          </section>

          <section id='experience' data-spy='experience' className='experience'>
            <h2 className='display h2'>Experience</h2>
            <ol className='timeline'>
              <li className='tl-item'>
                <span className='tl-period' suppressHydrationWarning>
                  Feb 2021–now
                  <span className='tl-tenure'>{tenure}</span>
                </span>
                <div className='tl-body'>
                  <h3>
                    Software Engineer <span>· American Poolplayers Association</span>
                  </h3>
                  <p className='tl-summary'>
                    Full-time. Core platform features across league play, tournament management and internal operations.
                  </p>
                  <ul className='tl-bullets'>
                    {apaHighlights.map((parts, i) => (
                      <li key={i}>{parts.map((seg, j) => (seg.b ? <strong key={j}>{seg.t}</strong> : seg.t))}</li>
                    ))}
                  </ul>
                </div>
              </li>
              {otherRoles.map((r) => (
                <li key={r.company} className='tl-item'>
                  <span className='tl-period'>{r.period}</span>
                  <div className='tl-body'>
                    <h3>
                      {r.role} <span>· {r.company}</span>
                    </h3>
                  </div>
                </li>
              ))}
              <li className='tl-item'>
                <span className='tl-period'>Day to day</span>
                <div className='tl-body'>
                  <p className='tl-summary'>
                    {coreStack}.{' '}
                    <a href={RESUME_URL} data-ul='1' className='tl-more'>
                      Full list on the resume{' '}
                      <span data-go='r' aria-hidden='true'>
                        →
                      </span>
                    </a>
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section id='contact' data-spy='contact' className='contact'>
            <h2 className='display contact-h'>Hiring, or need something built?</h2>
            <p className='contact-p'>
              I&apos;m open to full-time roles, remote or on-site in the Sacramento area, and to contract work for small
              teams. Email is the best way to reach me, and I usually reply within a day.
            </p>
            <div className='contact-btns'>
              <span className='contact-email'>
                <a href={`mailto:${EMAIL}`} data-press='1' className='btn-fill'>
                  <span data-email='1'>{EMAIL}</span>
                </a>
                <CopyButton copy={copy} onCopy={onCopyEmail} tip />
              </span>
              <a href={RESUME_URL} data-press='1' className='btn-line'>
                Resume
              </a>
              <a
                href={LINKEDIN_URL}
                target='_blank'
                rel='noopener'
                aria-label='LinkedIn (opens in new tab)'
                data-press='1'
                className='btn-line'
              >
                LinkedIn
              </a>
              <a
                href={GITHUB_URL}
                target='_blank'
                rel='noopener'
                aria-label='GitHub (opens in new tab)'
                data-press='1'
                className='btn-line'
              >
                GitHub
              </a>
            </div>
            <div className='foot'>
              <p suppressHydrationWarning>Mark Artishuk · Sacramento, CA · {new Date().getFullYear()}</p>
              <span data-print-hide='1'>
                <ThemeControl dark={dark} onTheme={onTheme} />
              </span>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export function CopyButton({
  copy,
  onCopy,
  tip = false,
}: {
  copy: CopyState
  onCopy: (e: MouseEvent<HTMLButtonElement>) => void
  tip?: boolean
}) {
  return (
    <>
      <button
        onClick={onCopy}
        aria-label='Copy email address'
        title={copy === 'copied' ? 'Copied' : 'Copy address'}
        data-copied={copy === 'copied' ? '' : undefined}
        className='copy-btn'
      >
        {copy === 'copied' ? <Check /> : <Copy />}
      </button>
      {tip && copy !== 'idle' && (
        <span aria-hidden='true' className='copy-tip'>
          {copy === 'copied' ? 'Copied' : 'Selected. Press ⌘C or Ctrl+C'}
        </span>
      )}
    </>
  )
}

function HeroName({ nameRef }: { nameRef: RefObject<HTMLHeadingElement | null> }) {
  const [wave, setWave] = useState(0)
  const [hint, setHint] = useState(false)
  const [hintOut, setHintOut] = useState(false)
  const clicks = useRef(0)
  const t1 = useRef<ReturnType<typeof setTimeout>>(undefined)
  const t2 = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(
    () => () => {
      clearTimeout(t1.current)
      clearTimeout(t2.current)
    },
    [],
  )

  const onClick = () => {
    // Don't animate away a selection the visitor is making.
    if (window.getSelection()?.toString()) return
    const n = ++clicks.current
    setWave((w) => w + 1)
    if (n >= 3) {
      setHint(true)
      setHintOut(false)
      clearTimeout(t1.current)
      clearTimeout(t2.current)
      t1.current = setTimeout(() => {
        setHintOut(true)
        t2.current = setTimeout(() => {
          setHint(false)
          setHintOut(false)
          clicks.current = 0
        }, 450)
      }, 6000)
    }
  }

  return (
    <div className='hero-name-wrap'>
      <h1 ref={nameRef} aria-label={NAME} onClick={onClick} className='display hero-name'>
        {wave === 0
          ? NAME
          : NAME.split('').map((c, i) => (
              <span
                key={wave + '-' + i}
                aria-hidden='true'
                style={{ animation: `nameWave .7s ${i * 35}ms cubic-bezier(.22,1,.36,1) both` }}
              >
                {c}
              </span>
            ))}
      </h1>
      {hint && (
        <p
          className='hero-hint'
          style={{
            animation: hintOut
              ? 'hintOut .45s cubic-bezier(.22,1,.36,1) forwards'
              : 'tipIn .35s cubic-bezier(.22,1,.36,1)',
          }}
        >
          Nice find.{' '}
          <a href={`mailto:${EMAIL}`} data-ul='1'>
            Say hi →
          </a>
        </p>
      )}
    </div>
  )
}

function WorkList({ onOpenProject }: { onOpenProject: OpenProject }) {
  return (
    <ol className='worklist'>
      {projects.map((p) => {
        const hero = p.images[0]?.src
        const warm = () => hero && warmHero(hero)
        return (
          <li key={p.slug} className='work-item'>
            <a
              href={projectHref(p.slug)}
              data-row={p.slug}
              aria-labelledby={`wt-${p.slug}`}
              aria-describedby={`ws-${p.slug}`}
              onClick={(e) => onOpenProject(e, p.slug)}
              onMouseEnter={warm}
              onFocus={warm}
              className='work-row'
            >
              <span className='work-text'>
                <span className='work-title-row'>
                  <span
                    id={`wt-${p.slug}`}
                    className='display work-title vt-morph'
                    style={{ viewTransitionName: 'title-' + p.slug }}
                  >
                    {p.title}
                  </span>
                  {p.liveUrl && (
                    <span className='tag-live'>
                      <span aria-hidden='true' />
                      Live
                    </span>
                  )}
                </span>
                <span id={`ws-${p.slug}`} className='work-short'>
                  {p.short}
                </span>
                <span className='work-built'>{p.built}</span>
                <span className='work-meta'>
                  {p.role} · {p.year}
                </span>
                <span aria-hidden='true' className='work-go'>
                  Read the case study
                  <ArrowRight />
                </span>
              </span>
              <span className='work-figure'>
                <span
                  data-thumb='1'
                  className={'work-thumb vt-morph' + (p.thumb ? '' : ' vt-tile')}
                  style={{ viewTransitionName: 'shot-' + p.slug }}
                >
                  {p.thumb ? (
                    <span
                      data-thumb-img='1'
                      className='shot work-thumb-img'
                      style={{ '--pos': p.thumb.pos, '--zoom': p.thumb.zoom } as CSSProperties}
                    >
                      <Image src={p.thumb.src} alt='' fill sizes={THUMB_SIZES} />
                    </span>
                  ) : p.tile ? (
                    <span className='work-tile'>
                      <span className='display work-tile-fig'>
                        {p.tile.from}
                        <span aria-hidden='true' className='work-tile-arrow'>
                          →
                        </span>
                        <span className='sr-only'> to </span>
                        {p.tile.to}
                      </span>
                      <span className='work-tile-label'>{p.tile.label}</span>
                    </span>
                  ) : null}
                </span>
                <span className='work-caption'>{p.thumb ? p.thumb.caption : 'Internal tool, no screenshots'}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
