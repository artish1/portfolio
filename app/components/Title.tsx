import { useToggled } from '@/contexts/ToggledContext'
import { motion } from 'motion/react'

const Title = () => {
  const { toggled } = useToggled()
  return (
    <>
      {/* Main headline -- uses mix-blend-difference to interweave with spheres */}
      <motion.div
        initial={{ opacity: 0, bottom: '50%' }}
        animate={{ opacity: toggled ? 1 : 0, bottom: toggled ? '60%' : '58%' }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='absolute right-[50%] bottom-[60%] translate-y-[50%] translate-x-[50%] mix-blend-difference pointer-events-none select-none'
      >
        <h1
          className='text-black filter invert text-center font-extrabold uppercase leading-[0.92]
            text-[clamp(2.4rem,9vw,8rem)] whitespace-nowrap'
        >
          I Build
          <br />
          What&apos;s Next
        </h1>
      </motion.div>

      {/* Subtitle -- frosted glass pill, outside blend-mode so accent color renders */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: toggled ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className='absolute right-[50%] bottom-[60%] translate-x-[50%] translate-y-[calc(50%+clamp(7rem,12vw,11rem))] pointer-events-none select-none'
      >
        <p className='px-6 py-2.5 sm:px-6 sm:py-3 rounded-full bg-surface-bg/60 backdrop-blur-md border border-white/[0.06] text-accent-light text-center uppercase font-bold text-[0.6rem] sm:text-[clamp(0.65rem,0.9vw,0.8rem)] tracking-[0.15em] sm:tracking-[0.25em]'>
          Where Architecture Meets Experience
        </p>
      </motion.div>
    </>
  )
}

export default Title
