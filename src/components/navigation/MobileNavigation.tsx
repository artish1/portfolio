import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import SlideUp from '../decorative/SlideUp'
import cx from 'classnames'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import classNames from 'classnames'

const MobileNavigation = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { background, text } = useTailwindThemes()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (isOpen) {
    return (
      <nav
        className={classNames(
          'sm:hidden flex items-center justify-center h-full fixed top-0 left-0 w-full z-50',
          background,
        )}
      >
        <FontAwesomeIcon
          size='lg'
          icon={faXmark}
          className={`absolute top-7 right-6 cursor-pointer ${text}`}
          onClick={() => setIsOpen(false)}
        />
        <ul className='grid grid-cols-1 gap-8 justify-items-center items-center w-full text-xl'>
          <NavItem href='#projects' onClick={() => setIsOpen(false)}>
            Projects
          </NavItem>
          <NavItem href='/resume.pdf' target='_blank' onClick={() => setIsOpen(false)}>
            Resume
          </NavItem>
        </ul>
      </nav>
    )
  }

  const className = cx(
    'sm:hidden transition-colors duration-200 fixed top-0 left-0 z-50 py-6 px-6 flex items-center justify-between w-full',
    {
      [background]: scrolled,
    },
  )

  return (
    <div className={className}>
      <SlideUp delay={0.6}>
        <h1 className={classNames('font-bold text-lg', text)}>MARK ARTISHUK</h1>
      </SlideUp>
      <SlideUp delay={1}>
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

const NavItem = ({
  children,
  href,
  target,
  onClick,
}: {
  children: React.ReactNode
  href: string
  target?: string
  onClick?: () => void
}) => {
  const { text } = useTailwindThemes()
  return (
    <li className={classNames('font-bold uppercase', text)}>
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} onClick={onClick}>
        {children}
      </a>
    </li>
  )
}

export default MobileNavigation
