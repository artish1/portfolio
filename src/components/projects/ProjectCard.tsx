import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react'
import classNames from 'classnames'
import { useTheme } from '@/theme/ThemeContext'
import Image from 'next/image'
import type { ProjectImage } from '@/data/projects'

// ─── Context ──────────────────────────────────────────────

interface ProjectCardContext {
  theme: 'dark' | 'light'
}

const CardContext = createContext<ProjectCardContext>({ theme: 'dark' })
const useCard = () => useContext(CardContext)

// ─── Helpers ──────────────────────────────────────────────

const themed = (dark: string, light: string, theme: string) => (theme === 'dark' ? dark : light)

// ─── Root ─────────────────────────────────────────────────

interface RootProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  index?: number
  className?: string
}

const Root: React.FC<RootProps> = ({ children, index = 0, className, ...rest }) => {
  const { theme } = useTheme()

  return (
    <CardContext.Provider value={{ theme }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
        {...rest}
      >
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          className={classNames(
            'group relative rounded-2xl overflow-hidden',
            themed('bg-surface-card ring-1 ring-white/[0.08]', 'bg-[#F5F5F5] ring-1 ring-black/[0.08]', theme),
            className,
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </CardContext.Provider>
  )
}

// ─── Layout ───────────────────────────────────────────────

interface LayoutProps {
  children: React.ReactNode
  direction?: 'row' | 'row-reverse' | 'column'
  className?: string
}

const Layout: React.FC<LayoutProps> = ({ children, direction = 'column', className }) => {
  const directionClasses: Record<string, string> = {
    column: 'flex-col',
    row: 'flex-col lg:flex-row',
    'row-reverse': 'flex-col lg:flex-row-reverse',
  }

  return <div className={classNames('flex gap-0', directionClasses[direction], className)}>{children}</div>
}

// ─── Gallery ──────────────────────────────────────────────
// Replaces the old single Image -- shows multiple images with
// thumbnail navigation and animated transitions.

interface GalleryProps {
  images: ProjectImage[]
  aspect?: string
  className?: string
}

const ChevronLeft = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='15 18 9 12 15 6' />
  </svg>
)

const ChevronRight = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='9 6 15 12 9 18' />
  </svg>
)

const Gallery: React.FC<GalleryProps> = ({ images, aspect = 'aspect-[16/10]', className }) => {
  const { theme } = useCard()
  const [active, setActive] = useState(0)
  const hasMultiple = images.length > 1

  const prev = useCallback(() => {
    setActive((c) => (c === 0 ? images.length - 1 : c - 1))
  }, [images.length])

  const next = useCallback(() => {
    setActive((c) => (c === images.length - 1 ? 0 : c + 1))
  }, [images.length])

  if (images.length === 0) {
    return null
  }

  return (
    <div className={classNames('relative overflow-hidden', className)}>
      {/* Image area -- aspect ratio provides min height, h-full stretches in row layouts */}
      <div className={classNames('relative h-full min-h-0', aspect, themed('bg-surface-bg', 'bg-[#E8E8E8]', theme))}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={images[active].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='absolute inset-0'
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 55vw'
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay controls -- positioned on the outer container so they respect its bounds */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className={classNames(
              'absolute left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full opacity-60 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 cursor-pointer',
              themed(
                'bg-surface-bg/60 text-white/80 hover:bg-surface-bg/80',
                'bg-white/60 text-black/80 hover:bg-white/80',
                theme,
              ),
              'backdrop-blur-sm',
            )}
            aria-label='Previous image'
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className={classNames(
              'absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full opacity-60 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 cursor-pointer',
              themed(
                'bg-surface-bg/60 text-white/80 hover:bg-surface-bg/80',
                'bg-white/60 text-black/80 hover:bg-white/80',
                theme,
              ),
              'backdrop-blur-sm',
            )}
            aria-label='Next image'
          >
            <ChevronRight />
          </button>

          {/* Bottom gradient for dot visibility */}
          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-[5]' />

          {/* Dot indicators */}
          <div className='absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5'>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={classNames(
                  'rounded-full transition-all duration-200 cursor-pointer',
                  i === active
                    ? 'w-5 h-1.5 bg-accent'
                    : classNames(
                        'w-1.5 h-1.5',
                        themed('bg-white/40 hover:bg-white/60', 'bg-black/40 hover:bg-black/60', theme),
                      ),
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Content ──────────────────────────────────────────────

interface ContentProps {
  children: React.ReactNode
  className?: string
}

const Content: React.FC<ContentProps> = ({ children, className }) => (
  <div className={classNames('flex flex-col justify-center p-6 md:p-8', className)}>{children}</div>
)

// ─── Meta ─────────────────────────────────────────────────

interface MetaProps {
  role: string
  year: string
}

const Meta: React.FC<MetaProps> = ({ role, year }) => {
  const { theme } = useCard()

  return (
    <div className='flex items-center gap-3 mb-3'>
      <span
        className={classNames(
          'text-xs font-medium uppercase tracking-wider',
          themed('text-white/40', 'text-black/40', theme),
        )}
      >
        {role}
      </span>
      <span className={classNames('w-1 h-1 rounded-full', themed('bg-white/20', 'bg-black/20', theme))} />
      <span
        className={classNames(
          'text-xs font-medium uppercase tracking-wider',
          themed('text-white/40', 'text-black/40', theme),
        )}
      >
        {year}
      </span>
    </div>
  )
}

// ─── Title ────────────────────────────────────────────────

interface TitleProps {
  children: React.ReactNode
  className?: string
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  const { theme } = useCard()

  return (
    <h3
      className={classNames(
        'text-2xl md:text-3xl font-bold mb-3',
        themed('text-white', 'text-black', theme),
        className,
      )}
    >
      {children}
    </h3>
  )
}

// ─── Description ──────────────────────────────────────────

interface DescriptionProps {
  children: React.ReactNode
  className?: string
}

const Description: React.FC<DescriptionProps> = ({ children, className }) => {
  const { theme } = useCard()

  return (
    <p
      className={classNames(
        'text-sm md:text-[0.938rem] leading-relaxed mb-5',
        themed('text-white/55', 'text-black/55', theme),
        className,
      )}
    >
      {children}
    </p>
  )
}

// ─── Highlights ───────────────────────────────────────────

interface HighlightsProps {
  items: string[]
}

const Highlights: React.FC<HighlightsProps> = ({ items }) => {
  const { theme } = useCard()

  return (
    <ul className='mb-5 space-y-1.5'>
      {items.map((item, i) => (
        <li
          key={i}
          className={classNames(
            'flex items-start gap-2 text-xs md:text-sm',
            themed('text-white/45', 'text-black/45', theme),
          )}
        >
          <span
            className={classNames('mt-1.5 w-1 h-1 rounded-full shrink-0', themed('bg-white/30', 'bg-black/30', theme))}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

// ─── Tech ─────────────────────────────────────────────────

interface TechProps {
  items: string[]
  className?: string
}

const Tech: React.FC<TechProps> = ({ items, className }) => {
  const { theme } = useCard()

  return (
    <div className={classNames('flex flex-wrap gap-1.5 mb-5', className)}>
      {items.map((label) => (
        <span
          key={label}
          className={classNames(
            'inline-block px-2.5 py-1 text-[0.7rem] font-medium rounded-full transition-colors duration-200',
            themed(
              'bg-white/[0.06] text-white/50 hover:bg-accent-muted hover:text-accent',
              'bg-black/[0.06] text-black/50 hover:bg-black/[0.1] hover:text-black/70',
              theme,
            ),
          )}
        >
          {label}
        </span>
      ))}
    </div>
  )
}

// ─── Links ────────────────────────────────────────────────

const ArrowUpRight = () => (
  <svg
    width='13'
    height='13'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='inline-block ml-1 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
  >
    <line x1='7' y1='17' x2='17' y2='7' />
    <polyline points='7 7 17 7 17 17' />
  </svg>
)

const GithubIcon = () => (
  <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
  </svg>
)

interface LinksProps {
  liveUrl?: string
  githubUrl?: string
}

const Links: React.FC<LinksProps> = ({ liveUrl, githubUrl }) => {
  const { theme } = useCard()

  const linkClass = classNames(
    'group/link inline-flex items-center text-sm font-medium transition-colors duration-200',
    themed('text-accent hover:text-accent-light', 'text-black/60 hover:text-black', theme),
  )

  return (
    <div className='flex items-center gap-5'>
      {liveUrl && (
        <a href={liveUrl} target='_blank' rel='noopener noreferrer' className={linkClass}>
          Live Site
          <ArrowUpRight />
        </a>
      )}
      {githubUrl && (
        <a href={githubUrl} target='_blank' rel='noopener noreferrer' className={linkClass}>
          <GithubIcon />
          <span className='ml-1.5'>Code</span>
          <ArrowUpRight />
        </a>
      )}
    </div>
  )
}

// ─── Compose ──────────────────────────────────────────────

const ProjectCard = {
  Root,
  Layout,
  Gallery,
  Content,
  Meta,
  Title,
  Description,
  Highlights,
  Tech,
  Links,
}

export default ProjectCard
