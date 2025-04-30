import { useTheme } from "@/theme/ThemeContext"
import classNames from "classnames"

interface DiamondProps {
  className?: string
}

const Diamond: React.FC<DiamondProps> = ({ className }) => {
  const { theme } = useTheme()

  const cx = classNames(`h-1.5 w-1.5 rotate-45 m-[1px] ${className}`, {
    'bg-white': theme === 'dark',
    'bg-black': theme === 'light',
  })
  return <div className={cx}></div>
}

export default Diamond
