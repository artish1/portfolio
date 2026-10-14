import Image from 'next/image'
import { Fragment, type CSSProperties, type MouseEvent } from 'react'
import { EMAIL, LINKEDIN_URL, RESUME_URL } from '@/data/experience'
import { placeScreens, projectHref, projects, type ProjectImage } from '@/data/projects'
import { CopyButton, CountDown, type CopyState } from './Home'
import { ArrowLeft, ArrowRight, Check, LinkIcon } from './icons'
import {
  DECISION_SIZES,
  heroSizes,
  SCREEN_SIZES,
  SCREEN_WIDE_SIZES,
  SHOT_QUALITY,
  screenRows,
  warmHero,
  warmLightbox,
} from './images'
import ThemeControl, { type SetTheme } from './ThemeControl'

interface Props {
  pi: number
  onBack: () => void
  onHome: (e: MouseEvent<HTMLAnchorElement>) => void
  onOpenProject: (e: MouseEvent<HTMLAnchorElement>, slug: string) => void
  dark: boolean
  onTheme: SetTheme
  copy: CopyState
  onCopyEmail: (e: MouseEvent<HTMLButtonElement>) => void
  linkCopied: boolean
  onCopyLink: () => void
  onZoom: (pi: number, ii: number) => void
}

const peekMove = (e: MouseEvent<HTMLElement>) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--py', Math.round(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) * 100) + '%')
}
const peekLeave = (e: MouseEvent<HTMLElement>) => e.currentTarget.style.setProperty('--py', '0%')

const decisionId = (i: number) => `decision-${i + 1}`
let hitTimer: ReturnType<typeof setTimeout> | undefined
// Scroll to the decision and mark it briefly, without adding a #hash entry that the
// back button would then have to step through.
const jumpToDecision = (e: MouseEvent<HTMLAnchorElement>) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const el = document.getElementById(e.currentTarget.hash.slice(1))
  if (!el) return
  e.preventDefault()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  el.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true })
  document.querySelectorAll('[data-hit]').forEach((x) => x.removeAttribute('data-hit'))
  el.setAttribute('data-hit', '')
  clearTimeout(hitTimer)
  hitTimer = setTimeout(() => el.removeAttribute('data-hit'), 2400)
}

export default function ProjectView({
  pi,
  onBack,
  onHome,
  onOpenProject,
  dark,
  onTheme,
  copy,
  onCopyEmail,
  linkCopied,
  onCopyLink,
  onZoom,
}: Props) {
  const p = projects[pi]
  const n = projects.length
  const prev = projects[(pi - 1 + n) % n]
  const next = projects[(pi + 1) % n]
  const hero = p.images[0]
  const heroCrop = p.heroCrop ?? (p.thumb && p.thumb.src === hero?.src ? p.thumb : undefined)
  const { beside, rest } = placeScreens(p)
  const rows = screenRows(rest)
  const nextThumb = next.images[0]?.src
  const prevThumb = prev.images[0]?.src
  const walkthrough = `mailto:${EMAIL}?subject=${encodeURIComponent(`Walkthrough of ${p.title}`)}`

  const screen = (im: ProjectImage, ii: number, sizes: string) => (
    <button
      onClick={() => onZoom(pi, ii)}
      onPointerEnter={() => warmLightbox(im.src)}
      onFocus={() => warmLightbox(im.src)}
      aria-label={`View full screen: ${im.alt}`}
      className='pv-shot-btn'
    >
      <span className='shot' style={{ aspectRatio: `${im.w} / ${im.h}` }}>
        <Image src={im.src} alt='' fill sizes={sizes} quality={SHOT_QUALITY} />
      </span>
    </button>
  )

  return (
    <div data-page='1' className='pv'>
      <header data-print-hide='1' className='bar'>
        <span data-progress='1' aria-hidden='true' className='pv-progress' />
        <div className='pv-bar'>
          <a href='/' onClick={onHome} className='display pv-name wide-only'>
            Mark Artishuk
          </a>
          <button onClick={onBack} data-back='1' data-press='1' className='pv-back'>
            <ArrowLeft />
            All work
          </button>
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

      <article aria-labelledby='pv-title' className='pv-article'>
        <div className='pv-head'>
          <h1
            id='pv-title'
            tabIndex={-1}
            data-pv-title='1'
            className='display pv-title vt-morph'
            style={{ viewTransitionName: 'title-' + p.slug }}
          >
            {p.title}
          </h1>
          <div className='pv-intro'>
            <p className='pv-outcome'>{p.outcome}</p>
            {(p.liveUrl || p.githubUrl) && (
              <div className='pv-actions'>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target='_blank'
                    rel='noopener'
                    aria-label={`${p.title} live site (opens in new tab)`}
                    data-press='1'
                    className='btn-fill'
                  >
                    Visit live site&nbsp;
                    <span data-ext='1' aria-hidden='true'>
                      ↗
                    </span>
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target='_blank'
                    rel='noopener'
                    aria-label={`${p.title} source code (opens in new tab)`}
                    data-press='1'
                    className='btn-line'
                  >
                    Source&nbsp;
                    <span data-ext='1' aria-hidden='true'>
                      ↗
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <dl aria-label='Project facts' className='pv-facts'>
          <div>
            <dt>Role</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{p.year}</dd>
          </div>
          <div className='pv-fact-code'>
            <dt>Code</dt>
            <dd>
              {p.githubUrl ? (
                'Public on GitHub'
              ) : (
                <>
                  Private.{' '}
                  <a href={walkthrough} data-ul='1' className='pv-walk'>
                    Ask me for a walkthrough
                  </a>
                </>
              )}
            </dd>
          </div>
          <div className='pv-fact-stack'>
            <dt>Stack</dt>
            <dd>
              {p.stack.map((t, i) => {
                const di = p.decisions.findIndex((d) => d.tools?.includes(t))
                return (
                  <Fragment key={t}>
                    {i > 0 && ', '}
                    {di < 0 ? (
                      t
                    ) : (
                      <a
                        href={'#' + decisionId(di)}
                        onClick={jumpToDecision}
                        title={`Why: ${p.decisions[di].title}`}
                        data-ul='1'
                        className='pv-stack-key'
                      >
                        {t}
                      </a>
                    )}
                  </Fragment>
                )
              })}
            </dd>
          </div>
        </dl>

        {hero ? (
          <>
            <button
              onClick={() => onZoom(pi, 0)}
              onMouseMove={peekMove}
              onMouseLeave={peekLeave}
              onPointerEnter={() => warmLightbox(hero.src)}
              onFocus={() => warmLightbox(hero.src)}
              data-peek='1'
              data-crop={heroCrop ? '' : undefined}
              aria-label={`View full screen: ${hero.alt}`}
              className='pv-hero vt-morph'
              style={
                {
                  viewTransitionName: 'shot-' + p.slug,
                  // Wider screens than the frame show whole; taller ones are cropped and panned by peek.
                  '--ar': hero.w / hero.h > 1.6 ? `${hero.w} / ${hero.h}` : undefined,
                  '--pos': heroCrop?.pos,
                  '--zoom': heroCrop?.zoom,
                } as CSSProperties
              }
            >
              <span className='shot ratio'>
                <Image
                  key={hero.src}
                  src={hero.src}
                  alt=''
                  fill
                  sizes={heroSizes(hero.src)}
                  quality={SHOT_QUALITY}
                  priority
                />
              </span>
            </button>
            <p aria-hidden='true' className='pv-hero-hint'>
              {heroCrop ? 'Close-up. Tap to see the full screen.' : 'Tap to see the full screen.'}
            </p>
          </>
        ) : p.pipeline ? (
          <div className='pv-hero pv-pipe vt-morph vt-tile' style={{ viewTransitionName: 'shot-' + p.slug }}>
            {p.tile && (
              <p className='pipe-fig'>
                <span className='display pipe-fig-num'>
                  {p.tile.from}
                  <span aria-hidden='true' className='work-tile-arrow'>
                    →
                  </span>
                  <span className='sr-only'> to </span>
                  <CountDown from={p.tile.from} to={p.tile.to} />
                </span>
                <span className='pipe-fig-label'>{p.tile.label}</span>
              </p>
            )}
            <ol aria-label='How it works' className='pipe'>
              {p.pipeline.map((s) => (
                <li key={s.step} className='pipe-step'>
                  <span className='display pipe-name'>{s.step}</span>
                  <span className='pipe-note'>{s.note}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          p.tile && (
            <div className='pv-hero pv-tile vt-morph vt-tile' style={{ viewTransitionName: 'shot-' + p.slug }}>
              <p className='work-tile'>
                <span className='display work-tile-fig'>
                  {p.tile.from}
                  <span aria-hidden='true' className='work-tile-arrow'>
                    →
                  </span>
                  <span className='sr-only'> to </span>
                  {p.tile.to}
                </span>
                <span className='work-tile-label'>{p.tile.label}</span>
              </p>
            </div>
          )
        )}

        <div className='pv-more'>
          <section aria-labelledby='pv-context' className='pv-sec'>
            <h2 id='pv-context' className='display pv-h'>
              Context
            </h2>
            <p className='pv-context'>{p.context}</p>
          </section>

          <section aria-labelledby='pv-decisions' className='pv-sec'>
            <h2 id='pv-decisions' className='display pv-h'>
              Key decisions
            </h2>
            <ul className='decisions'>
              {p.decisions.map((d, di) => {
                const s = beside.get(d.title)
                return (
                  <li key={d.title} id={decisionId(di)} data-shot={s ? '' : undefined}>
                    <div className='decision-text'>
                      <h3 tabIndex={-1}>{d.title}</h3>
                      <p>{d.text}</p>
                    </div>
                    {s && (
                      <figure className='decision-shot'>
                        {screen(s.im, s.ii, DECISION_SIZES)}
                        <figcaption aria-hidden='true' className='pv-shot-caption'>
                          {s.im.alt}
                        </figcaption>
                      </figure>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          {rows.length > 0 && (
            <section aria-labelledby='pv-screens' className='pv-screens'>
              <div className='section-head'>
                <h2 id='pv-screens' className='display pv-h'>
                  More screens
                </h2>
                <p className='note'>Select any screen to see it full size.</p>
              </div>
              {rows.map((row) => (
                <ul key={row[0].im.src} className='pv-shots'>
                  {row.map(({ im, ii }) => (
                    <li key={im.src} style={{ flexGrow: im.w / im.h } as CSSProperties} className='pv-shot'>
                      {screen(im, ii, row.length === 1 ? SCREEN_WIDE_SIZES : SCREEN_SIZES)}
                      <p aria-hidden='true' className='pv-shot-caption'>
                        {im.alt}
                      </p>
                    </li>
                  ))}
                </ul>
              ))}
            </section>
          )}

          {p.results && (
            <section aria-labelledby='pv-result' className='pv-sec'>
              <h2 id='pv-result' className='display pv-h'>
                Result
              </h2>
              <ul className='results'>
                {p.results.map((r) => (
                  <li key={r.label}>
                    <span className='display result-value'>{r.value}</span>
                    <span className='result-label'>{r.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby='pv-ask' className='pv-ask'>
            <h2 id='pv-ask' className='display pv-ask-h'>
              {p.githubUrl ? 'Want a walkthrough?' : 'Want to see the code?'}
            </h2>
            <p className='contact-p'>
              {p.githubUrl
                ? 'The code is on GitHub, and I’m happy to take you through it on a call.'
                : 'It’s private, so I walk people through it on a call instead.'}{' '}
              Email me and I’ll set one up. I usually reply within a day.
            </p>
            <div className='contact-btns'>
              <span className='contact-email'>
                <a href={walkthrough} data-press='1' className='btn-fill'>
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
            </div>
          </section>

          <nav aria-label='More projects' className='pv-nav'>
            <a
              href={projectHref(next.slug)}
              onClick={(e) => onOpenProject(e, next.slug)}
              onPointerEnter={() => nextThumb && warmHero(nextThumb)}
              onFocus={() => nextThumb && warmHero(nextThumb)}
              data-row='next'
              className='next-row'
            >
              <span data-peek-room='1' className='next-text'>
                <span className='nav-label'>Next project</span>
                <span data-vtn={'title-' + next.slug} className='display next-title'>
                  {next.title}
                </span>
                <span className='next-short'>{next.short}</span>
              </span>
              <span data-arrow='1' aria-hidden='true' className='circle next-arrow'>
                <ArrowRight size={18} />
              </span>
              {nextThumb && (
                <span
                  data-vtn={'shot-' + next.slug}
                  data-peek-thumb='1'
                  data-rot='2deg'
                  aria-hidden='true'
                  className='peek-thumb peek-next'
                >
                  <Image key={nextThumb} src={nextThumb} alt='' fill sizes='208px' />
                </span>
              )}
            </a>
            <div className='pv-nav-foot'>
              <a
                href={projectHref(prev.slug)}
                onClick={(e) => onOpenProject(e, prev.slug)}
                onPointerEnter={() => prevThumb && warmHero(prevThumb)}
                onFocus={() => prevThumb && warmHero(prevThumb)}
                data-prev-row='1'
                className='prev-row'
              >
                <span data-arrow-l='1' aria-hidden='true' className='circle prev-arrow'>
                  <ArrowLeft size={14} />
                </span>
                <span className='prev-text'>
                  <span className='nav-label'>Previous project</span>
                  <span data-vtn={'title-' + prev.slug} className='display prev-title'>
                    {prev.title}
                  </span>
                </span>
                {prevThumb && (
                  <span
                    data-vtn={'shot-' + prev.slug}
                    data-peek-thumb='1'
                    data-rot='-2deg'
                    aria-hidden='true'
                    className='peek-thumb peek-prev'
                  >
                    <Image key={prevThumb} src={prevThumb} alt='' fill sizes='120px' />
                  </span>
                )}
              </a>
            </div>
          </nav>
        </div>

        <div data-print-hide='1' className='foot pv-foot'>
          <button onClick={onCopyLink} data-press='1' data-copied={linkCopied ? '' : undefined} className='pv-copy'>
            {linkCopied ? <Check /> : <LinkIcon />}
            {linkCopied ? 'Link copied' : 'Copy link to this project'}
          </button>
          <ThemeControl dark={dark} onTheme={onTheme} />
        </div>
      </article>
    </div>
  )
}
