import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Diamond from '../decorative/Diamond'
import SlideUp from '../decorative/SlideUp'
import cx from 'classnames'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import classNames from 'classnames'

const MobileNavigation = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { background, text } = useTailwindThemes();

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
      <nav className={classNames('sm:hidden flex items-center justify-center h-full fixed top-0 left-0 w-full z-50', background)}>
        <FontAwesomeIcon
          size='lg'
          icon={faXmark}
          className={`absolute top-7 right-6 ${text}`}
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
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <NavItem>Resume</NavItem>
          </a>
        </ul>
      </nav>
    )

  const className = cx(
    'sm:hidden transition-colors duration-200 fixed top-0 left-0 z-50 py-6 px-6 flex items-center justify-between w-full',
    {
      [background]: scrolled,
    },
  )

  return (
    <div className={className}>
      <SlideUp className='' delay={0.6}>
        <h1 className={classNames(' font-bold text-2xl text-center', text)}>MARK ARTISHUK</h1>
      </SlideUp>
      <SlideUp className='' delay={1}>
        <FontAwesomeIcon
          size='lg'
          icon={faBars}
          className={classNames('cursor-pointer', text)}
          onClick={() => setIsOpen(true)}
        />
      </SlideUp>
    </div>
  )
}

const NavItem = ({ children }) => {
  const { text } = useTailwindThemes();
  return <li className={classNames('font-bold uppercase ', text)}>{children}</li>
}

export default MobileNavigation
