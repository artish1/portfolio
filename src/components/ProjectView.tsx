import Image from 'next/image'
import { Fragment, type MouseEvent } from 'react'
import { EMAIL } from '@/data/experience'
import { projectHref, projects } from '@/data/projects'
import { ArrowLeft, ArrowRight, Check, LinkIcon } from './icons'
import { GALLERY_SIZES, HERO_SIZES, SHOT_QUALITY, warmHero, warmLightbox } from './images'

interface Props {
  pi: number
  onBack: () => void
  onOpenProject: (e: MouseEvent<HTMLAnchorElement>, slug: string) => void
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

export default function ProjectView({ pi, onBack, onOpenProject, linkCopied, onCopyLink, onZoom }: Props) {
  const p = projects[pi]
  const n = projects.length
  const prev = projects[(pi - 1 + n) % n]
  const next = projects[(pi + 1) % n]
  const hero = p.images[0]
  const rest = p.images.slice(1)
  const nextThumb = next.images[0]?.src
  const prevThumb = prev.images[0]?.src

  return (
    <div data-page='1' className='pv'>
      <header data-print-hide='1' className='bar'>
        <span data-progress='1' aria-hidden='true' className='pv-progress' />
        <div className='pv-bar'>
          <button onClick={onBack} data-back='1' data-press='1' className='pv-back'>
            <ArrowLeft />
            All work
          </button>
          <span className='serif pv-name'>Mark Artishuk</span>
          <button
            onClick={onCopyLink}
            data-press='1'
            aria-label='Copy link to this project'
            data-copied={linkCopied ? '' : undefined}
            className='pv-copy'
          >
            {linkCopied ? <Check /> : <LinkIcon />}
            <span className='wide-only'>{linkCopied ? 'Link copied' : 'Copy link'}</span>
          </button>
          <a href={`mailto:${EMAIL}`} data-press='1' className='pill-fill pv-email'>
            Email
          </a>
        </div>
      </header>

      <article aria-labelledby='pv-title' className='pv-article'>
        <div className='pv-head'>
          <h1
            id='pv-title'
            tabIndex={-1}
            data-pv-title='1'
            className='serif pv-title vt-morph'
            style={{ viewTransitionName: 'title-' + p.slug }}
          >
            {p.title}
          </h1>
          <div className='pv-intro'>
            <p className='pv-outcome'>{p.outcome}</p>
            <div className='pv-actions'>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target='_blank'
                  rel='noopener'
                  aria-label={`${p.title} live site (opens in new tab)`}
                  data-press='1'
                  className='pill-fill'
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
                  className='pill-line'
                >
                  Source&nbsp;
                  <span data-ext='1' aria-hidden='true'>
                    ↗
                  </span>
                </a>
              )}
              {!p.githubUrl && <span className='pv-private'>Private codebase. Walkthrough available on request.</span>}
            </div>
          </div>
        </div>

        {hero && (
          <button
            onClick={() => onZoom(pi, 0)}
            onMouseMove={peekMove}
            onMouseLeave={peekLeave}
            onPointerEnter={() => warmLightbox(hero.src)}
            onFocus={() => warmLightbox(hero.src)}
            data-peek='1'
            aria-label={`View full screen: ${hero.alt}`}
            className='pv-hero vt-morph'
            style={{ viewTransitionName: 'shot-' + p.slug }}
          >
            <span className='shot ratio'>
              <Image key={hero.src} src={hero.src} alt='' fill sizes={HERO_SIZES} quality={SHOT_QUALITY} priority />
            </span>
          </button>
        )}

        <div className='pv-more'>
          <div className='pv-body'>
            <aside aria-label='Project facts' className='pv-facts'>
              <dl>
                <div className='fact'>
                  <dt>Role</dt>
                  <dd>{p.role}</dd>
                </div>
                <div className='fact'>
                  <dt>Timeline</dt>
                  <dd>{p.year}</dd>
                </div>
                <div className='fact fact-stack'>
                  <dt>Stack</dt>
                  <dd>
                    <dl className='stack'>
                      {p.stack.map(([layer, items]) => (
                        <Fragment key={layer}>
                          <dt>{layer}</dt>
                          <dd>{items}</dd>
                        </Fragment>
                      ))}
                    </dl>
                  </dd>
                </div>
              </dl>
            </aside>
            <div className='pv-content'>
              <section className='pv-section'>
                <h2 className='pv-label'>Context</h2>
                <p className='pv-context'>{p.context}</p>
              </section>
              <section className='pv-section pv-section-decisions'>
                <h2 className='pv-label'>Key decisions</h2>
                <ul data-decisions='1' className='decisions'>
                  {p.decisions.map((d) => (
                    <li key={d.title}>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
              {rest.length > 0 && (
                <ul aria-label={`More ${p.title} screenshots`} className='gallery'>
                  {rest.map((im, j) => (
                    <li key={im.src}>
                      <button
                        onClick={() => onZoom(pi, j + 1)}
                        onMouseMove={peekMove}
                        onMouseLeave={peekLeave}
                        onPointerEnter={() => warmLightbox(im.src)}
                        onFocus={() => warmLightbox(im.src)}
                        data-peek='1'
                        aria-label={`View full screen: ${im.alt}`}
                        className='gallery-tile'
                      >
                        <span className='shot ratio'>
                          <Image key={im.src} src={im.src} alt='' fill sizes={GALLERY_SIZES} quality={SHOT_QUALITY} />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

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
                <span data-vtn={'title-' + next.slug} className='serif next-title'>
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
                  <span data-vtn={'title-' + prev.slug} className='serif prev-title'>
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
              <button onClick={onBack} data-back='1' className='back-link'>
                <ArrowLeft size={14} />
                <span data-ul='1'>Back to all work</span>
              </button>
            </div>
          </nav>
        </div>
      </article>
    </div>
  )
}
