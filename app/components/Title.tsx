import { useToggled } from '@/contexts/ToggledContext'
import { motion } from 'motion/react'

const Title = () => {
  const { toggled } = useToggled()
  return (
    <motion.div
      initial={{ opacity: 0, bottom: '50%' }}
      animate={{ opacity: toggled ? 1 : 0, bottom: toggled ? '60%' : '58%' }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className='absolute right-[50%] bottom-[60%] translate-y-[50%] translate-x-[50%] mix-blend-difference pointer-events-none select-none'
    >
      <h1
        className='text-black filter invert text-center font-extrabold uppercase leading-[0.92]
          text-[clamp(4rem,10vw,9rem)]'
      >
        Creative
        <br />
        Developer
      </h1>
      <p className='text-black filter invert text-center uppercase font-medium text-[clamp(0.7rem,1vw,0.875rem)] mt-5 tracking-[0.25em]'>
        Design-driven software engineering
      </p>
    </motion.div>
  )
}

export default Title
