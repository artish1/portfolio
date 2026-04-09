import classNames from 'classnames'
import SlideUp from '../decorative/SlideUp'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import { useTheme } from '@/theme/ThemeContext'

const headerAnimationOffset = 0.6
const staggerDelay = 0.15

interface DesktopNavigationProps {
  onAnimationComplete: () => void
}

const StatusIndicator = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-wider',
        isDark ? 'text-white/35' : 'text-black/35',
      )}
    >
      <span className='relative flex h-1.5 w-1.5'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
        <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400' />
      </span>
      Available
    </span>
  )
}

const leftLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'GITHUB', href: 'https://github.com/artish1', external: true },
]

const rightLinks = [
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
]

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onAnimationComplete }) => {
  const { text } = useTailwindThemes()
  return (
    <div className='absolute z-5 top-0 left-[50%] translate-x-[-50%] max-w-7xl w-full h-full flex items-start justify-center'>
      <div className='flex items-center justify-between mt-8 w-full px-6 md:px-12 lg:px-16'>
        <nav className={classNames('hidden sm:flex items-center justify-between w-full text-xs font-bold', text)}>
          {/* Left links */}
          <div className='flex items-center gap-12 flex-1 justify-end'>
            {leftLinks.map((link, i) => (
              <SlideUp key={link.label} delay={staggerDelay * (i + 1) + headerAnimationOffset}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className='font-bold hover:text-accent transition-colors duration-200'
                >
                  {link.label}
                </a>
              </SlideUp>
            ))}
          </div>

          {/* Center -- name + status */}
          <div className='flex flex-col items-center gap-1 mx-16'>
            <SlideUp delay={headerAnimationOffset} onComplete={onAnimationComplete}>
              <h1 className={classNames('text-lg font-bold tracking-wide', text)}>MARK ARTISHUK</h1>
            </SlideUp>
            <SlideUp delay={headerAnimationOffset + 0.1}>
              <StatusIndicator />
            </SlideUp>
          </div>

          {/* Right links + Resume CTA */}
          <div className='flex items-center gap-12 flex-1 justify-start'>
            {rightLinks.map((link, i) => (
              <SlideUp key={link.label} delay={staggerDelay * (i + leftLinks.length + 1) + headerAnimationOffset}>
                <a href={link.href} className='font-bold hover:text-accent transition-colors duration-200'>
                  {link.label}
                </a>
              </SlideUp>
            ))}
            <SlideUp delay={staggerDelay * (leftLinks.length + rightLinks.length + 1) + headerAnimationOffset}>
              <a
                href='/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold px-4 py-2 rounded-full border border-white/20 hover:border-accent hover:text-accent transition-all duration-200'
              >
                RESUME
              </a>
            </SlideUp>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default DesktopNavigation
