import ProjectsSection from '@/components/projects/ProjectsSection'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import { useTheme } from '@/theme/ThemeContext'
import classNames from 'classnames'
import { motion } from 'motion/react'

const SectionHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className='mb-10'
    >
      <h2 className='text-sm font-medium uppercase tracking-[0.2em] text-accent/60'>{children}</h2>
    </motion.div>
  )
}

const Footer = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className='mt-32 pt-16 pb-12 border-t border-white/[0.06]'
    >
      {/* CTA Section */}
      <div className='text-center mb-16'>
        <p className='text-sm font-medium uppercase tracking-[0.2em] text-accent/60 mb-4'>Get in Touch</p>
        <h3
          className={classNames(
            'text-3xl md:text-4xl lg:text-5xl font-bold mb-6',
            isDark ? 'text-white' : 'text-black',
          )}
        >
          Let&apos;s work together
        </h3>
        <p
          className={classNames(
            'text-sm md:text-base max-w-md mx-auto mb-8',
            isDark ? 'text-white/45' : 'text-black/45',
          )}
        >
          Have a project in mind? I&apos;m always open to discussing new opportunities and ideas.
        </p>
        <a
          href='mailto:hello@markartishuk.com'
          className='inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 hover:border-accent/30 transition-all duration-200'
        >
          Say Hello
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='7' y1='17' x2='17' y2='7' />
            <polyline points='7 7 17 7 17 17' />
          </svg>
        </a>
      </div>

      {/* Bottom bar */}
      <div
        className={classNames(
          'flex flex-col sm:flex-row items-center justify-between gap-4 text-xs',
          isDark ? 'text-white/25' : 'text-black/25',
        )}
      >
        <p>Mark Artishuk {new Date().getFullYear()}</p>
        <div className='flex items-center gap-5'>
          <a
            href='https://github.com/artish1'
            target='_blank'
            rel='noopener noreferrer'
            className={classNames('hover:text-accent transition-colors duration-200')}
          >
            GitHub
          </a>
          <a
            href='https://linkedin.com/in/mark-artishuk'
            target='_blank'
            rel='noopener noreferrer'
            className={classNames('hover:text-accent transition-colors duration-200')}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

const Content = ({ divRef }: { divRef: React.RefObject<HTMLDivElement> }) => {
  const { text } = useTailwindThemes()
  return (
    <div
      ref={divRef}
      className={classNames(
        'absolute top-[100vh] z-7 left-[50%] translate-x-[-50%] max-w-7xl w-full pb-16 flex items-start justify-center',
        text,
      )}
    >
      <div className='w-full px-6 md:px-12 lg:px-16'>
        <div id='projects' className='pt-20'>
          <SectionHeader>Selected Work</SectionHeader>
          <ProjectsSection />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Content
