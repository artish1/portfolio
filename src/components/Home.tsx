import Image from 'next/image'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL, apaHighlights, otherRoles, skills } from '@/data/experience'
import { projectHref, projects } from '@/data/projects'
import { ArrowRight, Check, Copy } from './icons'
import { THUMB_SIZES, warmHero } from './images'
import ThemeControl, { type SetTheme } from './ThemeControl'

type OpenProject = (e: MouseEvent<HTMLAnchorElement>, slug: string) => void

const LABELS: Record<string, string> = { about: 'About', experience: 'Experience', work: 'Work', contact: 'Contact' }
const NAME = 'Mark Artishuk'

interface Props {
  active: string
  nav: readonly string[]
  dark: boolean
  onTheme: SetTheme
  copied: boolean
  onCopyEmail: () => void
  tenure: string
  onOpenProject: OpenProject
}

export default function Home({ active, nav, dark, onTheme, copied, onCopyEmail, tenure, onOpenProject }: Props) {
  const activeIndex = Math.max(0, nav.indexOf(active))

  return (
    <>
      <header data-print-hide='1' data-page='1' className='bar m-header'>
        <div className='m-header-row'>
          <a href='#top' className='serif m-name'>
            {NAME}
          </a>
          <a href={RESUME_URL} className='m-resume'>
            Resume
          </a>
          <a href={`mailto:${EMAIL}`} data-press='1' className='pill-fill m-email'>
            Email
          </a>
        </div>
        <nav aria-label='Sections' className='m-nav'>
          {nav.map((id) => (
            <a
              key={id}
              href={'#' + id}
              aria-current={active === id ? 'true' : 'false'}
              data-press='1'
              className='m-pill'
            >
              {LABELS[id]}
            </a>
          ))}
        </nav>
      </header>

      <div id='top' data-page='1' className='home'>
        <aside data-rail='1' className='rail'>
          <div>
            <RailName />
            <p className='rail-role'>Software Engineer</p>
            <p className='rail-loc'>Sacramento, CA · Open to remote</p>
            <p className='rail-tag'>I build full-stack web products, from the database to the UI.</p>
          </div>
          <nav aria-label='Sections' className='rail-nav wide-only'>
            <span aria-hidden='true' className='rail-dot' style={{ transform: `translateY(${activeIndex * 38}px)` }} />
            {nav.map((id) => (
              <a key={id} href={'#' + id} aria-current={active === id ? 'true' : 'false'} className='rail-link'>
                <span />
                {LABELS[id]}
              </a>
            ))}
          </nav>
          <div data-print-hide='1' className='rail-contact wide-only'>
            <div className='rail-email-row'>
              <a href={`mailto:${EMAIL}`} data-ul='1' className='rail-email'>
                {EMAIL}
              </a>
              <button
                onClick={onCopyEmail}
                aria-label='Copy email address'
                title={copied ? 'Copied' : 'Copy address'}
                data-copied={copied ? '' : undefined}
                className='copy-btn'
              >
                {copied ? <Check /> : <Copy />}
              </button>
              {copied && (
                <span aria-hidden='true' className='copy-tip'>
                  Copied
                </span>
              )}
            </div>
            <div className='rail-links'>
              <a href={RESUME_URL} data-ul='1'>
                Resume
              </a>
              <a href={GITHUB_URL} target='_blank' rel='noopener' aria-label='GitHub (opens in new tab)' data-ul='1'>
                GitHub{' '}
                <span data-ext='1' aria-hidden='true'>
                  ↗
                </span>
              </a>
              <a
                href={LINKEDIN_URL}
                target='_blank'
                rel='noopener'
                aria-label='LinkedIn (opens in new tab)'
                data-ul='1'
              >
                LinkedIn{' '}
                <span data-ext='1' aria-hidden='true'>
                  ↗
                </span>
              </a>
            </div>
          </div>
          <div data-print-hide='1' className='wide-only'>
            <ThemeControl dark={dark} onTheme={onTheme} className='theme-rail' />
          </div>
        </aside>

        <main className='main'>
          <section id='about' data-spy='about' className='about'>
            <h2 className='sr-only'>About</h2>
            <p className='lead'>
              I&apos;ve spent five years writing production software in TypeScript, React, Next.js and Node. At the{' '}
              <strong>American Poolplayers Association</strong> I work across the stack on a platform with{' '}
              <strong>200,000+ players</strong>. Outside of work I&apos;m co-founding{' '}
              <a href={projectHref('huntnhook')} onClick={(e) => onOpenProject(e, 'huntnhook')} data-ul='1'>
                <strong>HuntNHook</strong>
              </a>
              , a marketplace I built and run on my own. A lot of my time goes into performance and into keeping code
              easy for the next person to work in.
            </p>
            <dl data-skills='1' className='skills'>
              {skills.map((s) => (
                <div key={s.label} data-skillgrp='1' className='skill'>
                  <span data-rule='1' aria-hidden='true' className='skill-rule' />
                  <dt>{s.label}</dt>
                  <dd>{s.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id='experience' data-spy='experience'>
            <h2 className='serif h2'>Experience</h2>
            <div className='job'>
              <div className='job-head'>
                <h3>
                  Software Engineer <span>· American Poolplayers Association</span>
                </h3>
                <span className='job-tenure' suppressHydrationWarning>
                  Since Feb 2021 · {tenure}
                </span>
              </div>
              <p className='job-summary'>
                Core platform features for 200,000+ active players across league play, tournament management and
                internal operations. Full-time.
              </p>
              <ul className='job-bullets'>
                {apaHighlights.map((parts, i) => (
                  <li key={i}>
                    <span />
                    <span>{parts.map((seg, j) => (seg.b ? <strong key={j}>{seg.t}</strong> : seg.t))}</span>
                  </li>
                ))}
              </ul>
            </div>
            {otherRoles.map((r) => {
              const slug = r.href.startsWith('/work/') ? r.href.slice(6) : null
              return (
                <div key={r.company} className='role'>
                  <div className='job-head'>
                    <h3>
                      {r.role} <span>· {r.company}</span>
                    </h3>
                    <span className='role-period'>{r.period}</span>
                  </div>
                  <p>
                    {r.summary}{' '}
                    <a href={r.href} onClick={slug ? (e) => onOpenProject(e, slug) : undefined} data-ul='1'>
                      {r.linkLabel}{' '}
                      <span data-go={r.arrowDir} aria-hidden='true'>
                        {r.arrow}
                      </span>
                    </a>
                  </p>
                </div>
              )
            })}
          </section>

          <section id='work' data-spy='work' className='work'>
            <div>
              <h2 className='serif h2'>Selected work</h2>
              <p className='note'>
                Most of these codebases are private. I&apos;m happy to walk through any of them on a call.
              </p>
            </div>
            <WorkList onOpenProject={onOpenProject} />
          </section>

          <section id='contact' data-spy='contact'>
            <h2 className='serif contact-h'>Hiring? Let&apos;s talk.</h2>
            <p className='contact-p'>
              I&apos;m open to new opportunities, remote or on-site in the Sacramento area. Email is the best way to
              reach me, and I usually reply within a day.
            </p>
            <div className='contact-btns'>
              <a href={`mailto:${EMAIL}`} data-press='1' className='pill-fill'>
                {EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target='_blank'
                rel='noopener'
                aria-label='LinkedIn (opens in new tab)'
                data-press='1'
                className='pill-line'
              >
                LinkedIn
              </a>
              <a
                href={GITHUB_URL}
                target='_blank'
                rel='noopener'
                aria-label='GitHub (opens in new tab)'
                data-press='1'
                className='pill-line'
              >
                GitHub
              </a>
            </div>
            <div className='foot'>
              <p>Mark Artishuk · Sacramento, CA · 2026</p>
              <span data-print-hide='1' className='foot-theme'>
                <ThemeControl dark={dark} onTheme={onTheme} />
              </span>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

function RailName() {
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
    <>
      <h1 aria-label={NAME} onClick={onClick} className='serif rail-name'>
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
          className='rail-hint'
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
    </>
  )
}

function WorkList({ onOpenProject }: { onOpenProject: OpenProject }) {
  const listRef = useRef<HTMLDivElement>(null)
  const hlRef = useRef<HTMLSpanElement>(null)
  const on = useRef(false)

  const hlTo = (el: HTMLElement) => {
    const list = listRef.current
    const hl = hlRef.current
    if (!list || !hl) return
    const lr = list.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const y = r.top - lr.top
    const h = r.height
    if (!on.current) {
      hl.style.transition = 'none'
      hl.style.transform = 'translateY(' + y + 'px) scale(.985)'
      hl.style.height = h + 'px'
      void hl.offsetHeight
      hl.style.transition =
        'transform .45s cubic-bezier(.22,1,.36,1), height .45s cubic-bezier(.22,1,.36,1), opacity .25s ease'
      hl.style.opacity = '1'
      hl.style.transform = 'translateY(' + y + 'px) scale(1)'
      on.current = true
    } else {
      hl.style.transform = 'translateY(' + y + 'px) scale(1)'
      hl.style.height = h + 'px'
    }
  }
  const hlHide = () => {
    const hl = hlRef.current
    if (hl) {
      hl.style.opacity = '0'
      hl.style.transform = hl.style.transform.replace('scale(1)', 'scale(.985)')
    }
    on.current = false
  }

  return (
    <div ref={listRef} data-worklist='1' onMouseLeave={hlHide} className='worklist'>
      <span ref={hlRef} data-hl='1' aria-hidden='true' className='worklist-hl' />
      {projects.map((p) => {
        const thumb = p.images[0]?.src
        return (
          <div key={p.slug} className='work-item'>
            <a
              href={projectHref(p.slug)}
              data-row={p.slug}
              onClick={(e) => onOpenProject(e, p.slug)}
              onMouseEnter={(e) => {
                hlTo(e.currentTarget)
                if (thumb) warmHero(thumb)
              }}
              onFocus={(e) => {
                hlTo(e.currentTarget)
                if (thumb) warmHero(thumb)
              }}
              onBlur={(e) => {
                if (!listRef.current?.contains(e.relatedTarget as Node)) hlHide()
              }}
              className='work-row'
            >
              <span data-thumb='1' className='work-thumb vt-morph' style={{ viewTransitionName: 'shot-' + p.slug }}>
                {thumb ? (
                  <span data-thumb-img='1' className='shot work-thumb-img'>
                    <Image src={thumb} alt='' fill sizes={THUMB_SIZES} loading='eager' />
                  </span>
                ) : (
                  <span className='work-internal'>Internal</span>
                )}
              </span>
              <span className='work-text'>
                <span className='serif work-title vt-morph' style={{ viewTransitionName: 'title-' + p.slug }}>
                  {p.title}
                </span>
                <span className='work-short'>{p.short}</span>
                <span className='work-meta'>
                  {p.role} · {p.year}
                </span>
              </span>
              <span data-arrow='1' aria-hidden='true' className='circle work-arrow'>
                <ArrowRight />
              </span>
            </a>
          </div>
        )
      })}
    </div>
  )
}
