import { createContext, useContext, useState } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import classNames from 'classnames'
import { useTheme } from '@/theme/ThemeContext'
import Image from 'next/image'
import type { ProjectImage } from '@/data/projects'
import Lightbox from './Lightbox'

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
// Single hero image with click-to-open lightbox.

interface GalleryProps {
  images: ProjectImage[]
  aspect?: string
  className?: string
}

const ExpandIcon = () => (
  <svg
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='15 3 21 3 21 9' />
    <polyline points='9 21 3 21 3 15' />
    <line x1='21' y1='3' x2='14' y2='10' />
    <line x1='3' y1='21' x2='10' y2='14' />
  </svg>
)

const Gallery: React.FC<GalleryProps> = ({ images, aspect = 'aspect-[16/10]', className }) => {
  const { theme } = useCard()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const hasMultiple = images.length > 1

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div
        onClick={() => setLightboxOpen(true)}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setLightboxOpen(true)
          }
        }}
        aria-label={hasMultiple ? `View ${images.length} screenshots` : 'View screenshot'}
        className={classNames('relative overflow-hidden outline-none cursor-pointer', aspect, className)}
      >
        {/* Hero image */}
        <div className={classNames('relative w-full h-full', themed('bg-surface-bg', 'bg-[#E8E8E8]', theme))}>
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            className='transition-transform duration-500 ease-out group-hover:scale-[1.02]'
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 55vw'
          />

          {/* Hover overlay */}
          <div
            className={classNames(
              'absolute inset-0 transition-opacity duration-300',
              'opacity-0 group-hover:opacity-100',
              'bg-black/30',
            )}
          />
        </div>

        {/* "View screenshots" indicator -- appears on hover */}
        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none'>
          <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.1] backdrop-blur-md border border-white/[0.1]'>
            <ExpandIcon />
            <span className='text-xs font-medium text-white/90 tracking-wide'>
              {hasMultiple ? `View ${images.length} screenshots` : 'View screenshot'}
            </span>
          </div>
        </div>

        {/* Image count badge -- always visible when multiple images */}
        {hasMultiple && (
          <div className='absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-0'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-white/70'
            >
              <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
              <circle cx='8.5' cy='8.5' r='1.5' />
              <polyline points='21 15 16 10 5 21' />
            </svg>
            <span className='text-[0.65rem] font-medium text-white/70'>{images.length}</span>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && <Lightbox images={images} initialIndex={0} onClose={() => setLightboxOpen(false)} />}
    </>
  )
}

// ─── Placeholder ──────────────────────────────────────────
// SVG illustration for projects without screenshots.

interface PlaceholderProps {
  type?: 'automation'
  aspect?: string
  className?: string
}

const Placeholder: React.FC<PlaceholderProps> = ({ aspect = 'aspect-[16/10]', className }) => {
  const { theme } = useCard()

  return (
    <div
      className={classNames(
        'relative overflow-hidden flex items-center justify-center',
        aspect,
        themed('bg-surface-bg', 'bg-[#E8E8E8]', theme),
        className,
      )}
    >
      <svg
        viewBox='0 0 480 300'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='w-[70%] h-auto opacity-[0.15]'
      >
        {/* Terminal window frame */}
        <rect x='40' y='30' width='400' height='240' rx='12' stroke='currentColor' strokeWidth='1.5' />
        <line x1='40' y1='62' x2='440' y2='62' stroke='currentColor' strokeWidth='1' />
        {/* Window dots */}
        <circle cx='62' cy='46' r='5' fill='currentColor' opacity='0.5' />
        <circle cx='80' cy='46' r='5' fill='currentColor' opacity='0.3' />
        <circle cx='98' cy='46' r='5' fill='currentColor' opacity='0.2' />
        {/* Terminal lines - code/automation feel */}
        <text x='64' y='92' fill='currentColor' fontSize='12' fontFamily='monospace' opacity='0.6'>
          $
        </text>
        <rect x='80' y='80' width='140' height='14' rx='2' fill='currentColor' opacity='0.15' />
        <text x='64' y='118' fill='currentColor' fontSize='12' fontFamily='monospace' opacity='0.6'>
          $
        </text>
        <rect x='80' y='106' width='200' height='14' rx='2' fill='currentColor' opacity='0.1' />
        <text x='64' y='144' fill='currentColor' fontSize='12' fontFamily='monospace' opacity='0.4'>
          {'>'}
        </text>
        <rect x='80' y='132' width='100' height='14' rx='2' fill='currentColor' opacity='0.08' />
        <text x='64' y='170' fill='currentColor' fontSize='12' fontFamily='monospace' opacity='0.4'>
          {'>'}
        </text>
        <rect x='80' y='158' width='160' height='14' rx='2' fill='currentColor' opacity='0.08' />
        {/* Data flow arrows */}
        <path
          d='M300 100 L340 100 L340 150 L380 150'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeDasharray='4 3'
          opacity='0.25'
        />
        <circle cx='380' cy='150' r='4' fill='currentColor' opacity='0.2' />
        <path
          d='M300 130 L320 130 L320 180 L380 180'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeDasharray='4 3'
          opacity='0.2'
        />
        <circle cx='380' cy='180' r='4' fill='currentColor' opacity='0.15' />
        {/* Gear icon - automation */}
        <g transform='translate(370, 100)' opacity='0.2'>
          <circle cx='10' cy='10' r='6' stroke='currentColor' strokeWidth='1.5' fill='none' />
          <circle cx='10' cy='10' r='2' fill='currentColor' />
          <line x1='10' y1='0' x2='10' y2='3' stroke='currentColor' strokeWidth='1.5' />
          <line x1='10' y1='17' x2='10' y2='20' stroke='currentColor' strokeWidth='1.5' />
          <line x1='0' y1='10' x2='3' y2='10' stroke='currentColor' strokeWidth='1.5' />
          <line x1='17' y1='10' x2='20' y2='10' stroke='currentColor' strokeWidth='1.5' />
        </g>
        {/* Blinking cursor */}
        <rect x='80' y='186' width='8' height='14' rx='1' fill='currentColor' opacity='0.3' />
      </svg>

      {/* Subtle label */}
      <div className='absolute bottom-3 right-3'>
        <span
          className={classNames(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.6rem] font-medium tracking-wide',
            themed('bg-white/[0.04] text-white/20', 'bg-black/[0.04] text-black/20', theme),
          )}
        >
          <LockIcon />
          Internal Tool
        </span>
      </div>
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

const LockIcon = () => (
  <svg
    width='12'
    height='12'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
    <path d='M7 11V7a5 5 0 0 1 10 0v4' />
  </svg>
)

interface LinksProps {
  liveUrl?: string
  githubUrl?: string
  privateRepo?: boolean
}

const Links: React.FC<LinksProps> = ({ liveUrl, githubUrl, privateRepo }) => {
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
      {privateRepo && !githubUrl && (
        <span
          className={classNames(
            'inline-flex items-center gap-1.5 text-xs font-medium',
            themed('text-white/25', 'text-black/25', theme),
          )}
        >
          <LockIcon />
          Private Repository
        </span>
      )}
    </div>
  )
}

// ─── Compose ──────────────────────────────────────────────

const ProjectCard = {
  Root,
  Layout,
  Gallery,
  Placeholder,
  Content,
  Meta,
  Title,
  Description,
  Highlights,
  Tech,
  Links,
}

export default ProjectCard
