const Base = ({ children }) => {
  return <div className='shadow-sm rounded bg-orange-100 p-4'>{children}</div>
}

const Card = ({ children }) => {
  return <Base>{children}</Base>
}

export default Card
