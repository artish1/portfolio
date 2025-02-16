import MobileNavigation from './MobileNavigation'
import DesktopNavigation from './DesktopNavigation'

interface NavigationProps {
  onAnimationComplete: () => void
  scrolled?: boolean
}

const Navigation: React.FC<NavigationProps> = ({ onAnimationComplete, scrolled }) => {
  return (
    <>
      <DesktopNavigation onAnimationComplete={onAnimationComplete} />
      <MobileNavigation scrolled={scrolled} />
    </>
  )
}

export default Navigation
