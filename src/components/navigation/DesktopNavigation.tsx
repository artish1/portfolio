import Diamond from '../decorative/Diamond'
import SlideUp from '../decorative/SlideUp'

const headerAnimationOffset = 0.6
const staggerDelay = 0.2

interface DesktopNavigationProps {
  onAnimationComplete: () => void
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onAnimationComplete }) => {
  return (
    <div className='absolute z-5 top-0 left-[50%] translate-x-[-50%] max-w-4xl w-full h-full flex items-start justify-center'>
      <div className='flex items-center justify-center mt-8 w-full '>
        <nav className='hidden sm:grid sm:gap-0 gap-2 grid-cols-1 sm:grid-cols-[auto,auto,auto,auto,auto,auto,auto] justify-items-center items-center text-main-1 text-xs font-bold w-full md:mx-12 sm:mx-8 mx-4'>
          <SlideUp delay={staggerDelay * 3 + headerAnimationOffset} onComplete={onAnimationComplete}>
            <p className='font-bold'>ABOUT</p>
          </SlideUp>
          <SlideUp delay={staggerDelay * 2 + headerAnimationOffset}>
            <Diamond />
          </SlideUp>

          <SlideUp delay={staggerDelay + headerAnimationOffset}>
            <p className='font-bold'>SKILLS</p>
          </SlideUp>

          <SlideUp className='sm:col-start-4 col-start-1 sm:row-start-auto row-start-1' delay={headerAnimationOffset}>
            <h1 className='text-white text-2xl text-center w-60'>MARK ARTISHUK</h1>
          </SlideUp>

          <SlideUp delay={staggerDelay + headerAnimationOffset}>
            <p className='font-bold'>PROJECTS</p>
          </SlideUp>

          <SlideUp delay={staggerDelay * 2 + headerAnimationOffset}>
            <Diamond />
          </SlideUp>

          <SlideUp delay={staggerDelay * 3 + headerAnimationOffset}>
            <p className='font-bold'>RESUME</p>
          </SlideUp>
        </nav>
      </div>
    </div>
  )
}

export default DesktopNavigation
