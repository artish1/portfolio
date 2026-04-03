import VerticalText from '@/components/decorative/VerticalText'
import { useToggled } from '@/contexts/ToggledContext'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import classNames from 'classnames'
import { motion } from 'motion/react'

const Accents = () => {
  const { text } = useTailwindThemes()
  const { toggled } = useToggled()
  return (
    <motion.div
      animate={{ opacity: toggled ? 1 : 0, left: toggled ? '2.5rem' : '1rem' }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className='absolute bottom-0 translate-y-[-50%] left-10'
    >
      <VerticalText text='2026.04.02' className={classNames('text-xs font-bold opacity-80', text)} />
    </motion.div>
  )
}

export default Accents
