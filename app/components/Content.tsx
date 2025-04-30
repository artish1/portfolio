const Content = ({ divRef }) => {
  return (
    <div
      ref={divRef}
      className='absolute top-[100vh] z-7 left-[50%] translate-x-[-50%] max-w-5xl w-full h-[2500px] flex items-start justify-center '
    >
      <div className='w-[600px] h-[400px] bg-decorative-primary rounded-lg'></div>
    </div>
  )
}
export default Content;