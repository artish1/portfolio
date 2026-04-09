import { useToggled } from '@/contexts/ToggledContext'
import { motion } from 'motion/react'

const Title = () => {
  const { toggled } = useToggled()
  return (
    <div className='absolute right-[50%] bottom-[50%] translate-y-[50%] translate-x-[50%] mix-blend-difference flex items-center justify-center flex-col'>
      {/* Main headline -- uses mix-blend-difference to interweave with spheres */}
      <motion.div
        initial={{ opacity: 0, bottom: '50%' }}
        animate={{ opacity: toggled ? 1 : 0, bottom: toggled ? '60%' : '58%' }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className=' mix-blend-difference pointer-events-none select-none'
      >
        <h1
          className='text-black filter invert text-center  uppercase leading-[1.1]
            text-[clamp(2.4rem,8vw,7rem)] whitespace-nowrap italic'
          style={{ fontFamily: "'PP Editorial New', serif" }}
        >
          I Build
          <br />
          What&apos;s Next
        </h1>
      </motion.div>

      {/* Subtitle -- frosted glass pill, outside blend-mode so accent color renders */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: toggled ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className='w-[50%] mt-6 pointer-events-none select-none'
      >
        <p className='px-6 py-2.5 sm:px-6 sm:py-3 rounded-full bg-surface-bg/60 backdrop-blur-3xl border border-white/[0.06] text-accent-light text-center uppercase font-bold text-[0.6rem] sm:text-[clamp(0.65rem,0.9vw,0.8rem)] tracking-[0.15em] sm:tracking-[0.25em]'>
          Where Architecture Meets Experience
        </p>
      </motion.div> */}
    </div>
  )
}

export default Title
