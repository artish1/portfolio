import { motion } from 'motion/react'

interface SlideUpProps {
  delay?: number
  duration?: number
  children?: any
  height?: number
  onComplete?: () => void
  className?: string
}

const SlideUp: React.FC<SlideUpProps> = ({ children, delay, duration, height, onComplete, className }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        onAnimationComplete={onComplete}
        initial={{ y: height || 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: duration || 0.8, delay: delay || 1, ease: 'easeOut' }}
      >
        <div>{children}</div>
      </motion.div>
    </div>
  )
}

export default SlideUp
