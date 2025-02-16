import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Diamond from '../decorative/Diamond'
import SlideUp from '../decorative/SlideUp'
import cx from 'classnames'

const MobileNavigation = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Disable scrolling when the mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden' // Disable scrolling
    } else {
      document.body.style.overflow = 'auto' // Re-enable scrolling
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (isOpen)
    return (
      <nav className='sm:hidden flex items-center justify-center h-full fixed top-0 left-0 w-full bg-decorative-dark1 z-50'>
        <FontAwesomeIcon
          size='lg'
          icon={faXmark}
          className='absolute top-7 right-6 text-white'
          onClick={() => {
            setIsOpen(false)
          }}
        />
        <ul className='grid grid-cols-1 gap-4 justify-items-center items-center w-full h-[50%] text-xl'>
          <NavItem>About</NavItem>
          <Diamond />
          <NavItem>Skills</NavItem>
          <Diamond />
          <NavItem>Projects</NavItem>
          <Diamond />
          <NavItem>Resume</NavItem>
        </ul>
      </nav>
    )

  const className = cx(
    'sm:hidden transition-colors duration-200 fixed top-0 left-0 z-50 py-6 px-6 flex items-center justify-between w-full',
    {
      'bg-decorative-dark1': scrolled,
    },
  )

  return (
    <div className={className}>
      <SlideUp className='' delay={0.6}>
        <h1 className='text-white font-bold text-2xl text-center'>MARK ARTISHUK</h1>
      </SlideUp>
      <SlideUp className='' delay={1}>
        <FontAwesomeIcon
          size='lg'
          icon={faBars}
          className='text-white cursor-pointer'
          onClick={() => setIsOpen(true)}
        />
      </SlideUp>
    </div>
  )
}

const NavItem = ({ children }) => {
  return <li className='font-bold uppercase text-main-1'>{children}</li>
}

export default MobileNavigation
