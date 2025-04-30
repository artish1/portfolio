import { motion } from 'motion/react'

interface SlideUpProps {
  delay?: number
  duration?: number
  children?: any
  height?: number
  onComplete?: () => void
  className?: string
  display?: boolean;
}

const SlideUp: React.FC<SlideUpProps> = ({ children, delay, duration, height, onComplete, className, display }) => {
  const displayMode = typeof display === 'boolean';
  const hidingY = height || 50;
  const isDisplaying = displayMode ? display : true;
  const currentY = isDisplaying ? 0 : hidingY;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        onAnimationComplete={onComplete}
        initial={{ y: hidingY, opacity: 0 }}
        animate={{ y: currentY, opacity: isDisplaying ? 1 : 0 }}
        transition={{ duration: duration || 0.8, delay: delay || 1, ease: 'easeOut' }}
      >
        <div>{children}</div>
      </motion.div>
    </div>
  )
}

export default SlideUp
