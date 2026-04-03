import classNames from 'classnames'
import SlideUp from '../decorative/SlideUp'
import useTailwindThemes from '@/hooks/useTailwindThemes'

const headerAnimationOffset = 0.6
const staggerDelay = 0.2

interface DesktopNavigationProps {
  onAnimationComplete: () => void
}

const StatusIndicator = () => (
  <span className='inline-flex items-center gap-1.5 text-[0.65rem] font-medium uppercase tracking-wider text-white/35'>
    <span className='relative flex h-1.5 w-1.5'>
      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
      <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400' />
    </span>
    Available
  </span>
)

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onAnimationComplete }) => {
  const { text } = useTailwindThemes()
  return (
    <div className='absolute z-5 top-0 left-[50%] translate-x-[-50%] max-w-7xl w-full h-full flex items-start justify-center'>
      <div className='flex items-center justify-between mt-8 w-full px-6 md:px-12 lg:px-16'>
        <nav className={classNames('hidden sm:flex items-center justify-between w-full text-xs font-bold', text)}>
          <div className='flex items-center gap-4'>
            <SlideUp delay={headerAnimationOffset} onComplete={onAnimationComplete}>
              <h1 className={classNames('text-lg font-bold tracking-wide', text)}>MARK ARTISHUK</h1>
            </SlideUp>
            <SlideUp delay={headerAnimationOffset + 0.1}>
              <StatusIndicator />
            </SlideUp>
          </div>

          <div className='flex items-center gap-8'>
            <SlideUp delay={staggerDelay + headerAnimationOffset}>
              <a href='#projects' className='font-bold hover:text-accent transition-colors duration-200'>
                PROJECTS
              </a>
            </SlideUp>

            <SlideUp delay={staggerDelay * 2 + headerAnimationOffset}>
              <a
                href='/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold hover:text-accent transition-colors duration-200'
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
