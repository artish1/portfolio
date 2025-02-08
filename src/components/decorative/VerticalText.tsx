interface VerticalTextProps {
  text: string
  className?: string
}

const VerticalText: React.FC<VerticalTextProps> = ({ text, className }) => {
  const textArray = text.split('')

  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      {textArray.map((letter, index) => {
        return (
          <p key={index} className='transform text-main-1 py-1'>
            {letter}
          </p>
        )
      })}
    </div>
  )
}

export default VerticalText
