import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import SlideUp from '../decorative/SlideUp'
import cx from 'classnames'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '@/theme/ThemeContext'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '/resume.pdf', external: true },
]

const StatusIndicator = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-wider',
        isDark ? 'text-white/35' : 'text-black/35',
      )}
    >
      <span className='relative flex h-1.5 w-1.5'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
        <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400' />
      </span>
      Available for work
    </span>
  )
}

const MobileNavigation = ({ scrolled }: { scrolled: boolean }) => {
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

  const barClassName = cx(
    'sm:hidden transition-colors duration-200 fixed top-0 left-0 z-50 py-6 px-6 flex items-center justify-between w-full',
    {
      [background]: scrolled,
    },
  )

  return (
    <>
      {/* Top bar -- always rendered */}
      <div className={barClassName}>
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

      {/* Fullscreen overlay -- animated */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={classNames('sm:hidden flex items-center justify-center h-full fixed inset-0 z-50', background)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className='absolute top-7 right-6'
            >
              <FontAwesomeIcon
                size='lg'
                icon={faXmark}
                className={`cursor-pointer ${text}`}
                onClick={() => setIsOpen(false)}
              />
            </motion.div>

            <div className='flex flex-col items-center gap-10'>
              <ul className='grid grid-cols-1 gap-8 justify-items-center items-center w-full text-xl'>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                    className={classNames('font-bold uppercase', text)}
                  >
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.35 }}>
                <StatusIndicator />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className='absolute bottom-10 left-0 right-0 flex justify-center items-center gap-6'
            >
              <a
                href='https://github.com/artish1'
                target='_blank'
                rel='noopener noreferrer'
                className={classNames('opacity-40 hover:opacity-100 transition-opacity', text)}
                aria-label='GitHub'
              >
                <svg width='22' height='22' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
              <a
                href='https://linkedin.com/in/mark-artishuk'
                target='_blank'
                rel='noopener noreferrer'
                className={classNames('opacity-40 hover:opacity-100 transition-opacity', text)}
                aria-label='LinkedIn'
              >
                <svg width='22' height='22' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileNavigation
