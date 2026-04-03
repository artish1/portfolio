import ProjectsSection from '@/components/projects/ProjectsSection'
import useTailwindThemes from '@/hooks/useTailwindThemes'
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

const Content = ({ divRef }: { divRef: React.RefObject<HTMLDivElement> }) => {
  const { text } = useTailwindThemes()
  return (
    <div
      ref={divRef}
      className={classNames(
        'absolute top-[100vh] z-7 left-[50%] translate-x-[-50%] max-w-7xl w-full pb-32 flex items-start justify-center',
        text,
      )}
    >
      <div className='w-full px-6 md:px-12 lg:px-16'>
        <div id='projects' className='pt-20'>
          <SectionHeader>Selected Work</SectionHeader>
          <ProjectsSection />
        </div>
      </div>
    </div>
  )
}

export default Content
