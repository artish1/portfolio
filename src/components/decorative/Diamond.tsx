interface DiamondProps {
  className?: string
}

const Diamond: React.FC<DiamondProps> = ({ className }) => {
  return <div className={`h-1.5 w-1.5  bg-white rotate-45 m-[1px] ${className}`}></div>
}

export default Diamond
