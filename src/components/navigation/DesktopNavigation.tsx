import classNames from 'classnames'
import SlideUp from '../decorative/SlideUp'
import useTailwindThemes from '@/hooks/useTailwindThemes'

const headerAnimationOffset = 0.6
const staggerDelay = 0.2

interface DesktopNavigationProps {
  onAnimationComplete: () => void
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onAnimationComplete }) => {
  const { text } = useTailwindThemes()
  return (
    <div className='absolute z-5 top-0 left-[50%] translate-x-[-50%] max-w-7xl w-full h-full flex items-start justify-center'>
      <div className='flex items-center justify-between mt-8 w-full px-6 md:px-12 lg:px-16'>
        <nav className={classNames('hidden sm:flex items-center justify-between w-full text-xs font-bold', text)}>
          <SlideUp className='' delay={headerAnimationOffset} onComplete={onAnimationComplete}>
            <h1 className={classNames('text-lg font-bold tracking-wide', text)}>MARK ARTISHUK</h1>
          </SlideUp>

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
