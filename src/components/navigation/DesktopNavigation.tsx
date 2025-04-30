import classNames from 'classnames'
import Diamond from '../decorative/Diamond'
import SlideUp from '../decorative/SlideUp'
import useTailwindThemes from '@/hooks/useTailwindThemes'

const headerAnimationOffset = 0.6
const staggerDelay = 0.2

interface DesktopNavigationProps {
  onAnimationComplete: () => void
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onAnimationComplete }) => {
  const { text } = useTailwindThemes();
  return (
    <div className='absolute z-5 top-0 left-[50%] translate-x-[-50%] max-w-4xl w-full h-full flex items-start justify-center'>
      <div className='flex items-center justify-center mt-8 w-full '>
        <nav className={classNames('hidden sm:grid sm:gap-0 gap-2 grid-cols-1 sm:grid-cols-[auto,auto,auto,auto,auto,auto,auto] justify-items-center items-center text-xs  font-bold w-full md:mx-12 sm:mx-8 mx-4', text)}>
          <SlideUp delay={staggerDelay * 3 + headerAnimationOffset} onComplete={onAnimationComplete}>
            <a href="#about">
              <p className='font-bold'>ABOUT</p>
            </a>
          </SlideUp>
          <SlideUp delay={staggerDelay * 2 + headerAnimationOffset}>
            <Diamond />
          </SlideUp>

          <SlideUp delay={staggerDelay + headerAnimationOffset}>
            <a href="#skills">
              <p className='font-bold'>SKILLS</p>
            </a>
          </SlideUp>

          <SlideUp className='sm:col-start-4 col-start-1 sm:row-start-auto row-start-1' delay={headerAnimationOffset}>
            <h1 className={classNames(`text-2xl text-center w-60`, text)}>MARK ARTISHUK</h1>
          </SlideUp>

          <SlideUp delay={staggerDelay + headerAnimationOffset}>
            <a href="#projects">
              <p className='font-bold'>PROJECTS</p>
            </a>
          </SlideUp>

          <SlideUp delay={staggerDelay * 2 + headerAnimationOffset}>
            <Diamond />
          </SlideUp>

          <SlideUp delay={staggerDelay * 3 + headerAnimationOffset}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <p className='font-bold'>RESUME</p>
            </a>
          </SlideUp>
        </nav>
      </div>
    </div>
  )
}

export default DesktopNavigation
