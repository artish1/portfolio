interface LineProps {
  className?: string
}

const Line: React.FC<LineProps> = ({ className }) => {
  return <div className={`bg-white w-[1px] h-12 ${className}`}></div>
}

export default Line
