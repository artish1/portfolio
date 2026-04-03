import ProjectsSection from '@/components/projects/ProjectsSection'
import ExperienceSection from '@/components/experience/ExperienceSection'
import useTailwindThemes from '@/hooks/useTailwindThemes'
import { useTheme } from '@/theme/ThemeContext'
import classNames from 'classnames'
import { motion } from 'motion/react'

const SectionHeader = ({ children, id }: { children: React.ReactNode; id?: string }) => {
  return (
    <motion.div
      id={id}
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

// ─── About Section ────────────────────────────────────────

const techAreas: { label: string; items: string[] }[] = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS', 'Apollo'] },
  {
    label: 'Backend', items: ['Node.js', 'Rust', 'GraphQL', 'C#', 'VB.NET', 'SQL', 'NoSQL', 'Redis', 'Kafka', 'BullMQ', 'tRPC', 'Prisma', 'Drizzle']
  },
  { label: 'Infrastructure', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Cloudflare'] },
]

const About = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className='mb-24'
    >
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16'>
        {/* Left -- prose */}
        <div className='lg:col-span-3'>
          <p
            className={classNames(
              'text-lg md:text-xl leading-relaxed mb-6',
              isDark ? 'text-white/80' : 'text-black/80',
            )}
          >
            I architect and ship products end-to-end, from system design down to the pixels a user touches. I care about
            the full stack, not just one layer of it.
          </p>
          <p
            className={classNames(
              'text-sm md:text-base leading-relaxed mb-6',
              isDark ? 'text-white/50' : 'text-black/50',
            )}
          >
            Professionally, I lead feature development, drive architectural decisions, and mentor engineers at
            production-scale companies. I take ambiguous requirements, break them into deliverables, and see them
            through to release. I think about systems holistically: how they scale, how they fail, and how other
            engineers will maintain them long after the initial build. Outside of work, I design and build my own
            products end-to-end because I genuinely enjoy the craft.
          </p>
        </div>

        {/* Right -- tech areas */}
        <div className='lg:col-span-2 space-y-5'>
          {techAreas.map((area) => (
            <div key={area.label}>
              <p
                className={classNames(
                  'text-xs font-medium uppercase tracking-[0.15em] mb-2.5',
                  isDark ? 'text-white/30' : 'text-black/30',
                )}
              >
                {area.label}
              </p>
              <div className='flex flex-wrap gap-1.5'>
                {area.items.map((tech) => (
                  <span
                    key={tech}
                    className={classNames(
                      'inline-block px-3 py-1.5 text-[0.75rem] font-medium rounded-full transition-colors duration-200',
                      isDark
                        ? 'bg-white/[0.05] text-white/50 hover:bg-accent/10 hover:text-accent'
                        : 'bg-black/[0.05] text-black/50 hover:bg-black/[0.1] hover:text-black/70',
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// ─── Footer ───────────────────────────────────────────────

const Footer = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className={classNames('mt-32 pt-16 pb-12 border-t', isDark ? 'border-white/[0.06]' : 'border-black/[0.06]')}
    >
      {/* CTA Section */}
      <div id='contact' className='text-center mb-16'>
        <p className='text-sm font-medium uppercase tracking-[0.2em] text-accent/60 mb-4'>What&apos;s Next?</p>
        <h3
          className={classNames(
            'text-3xl md:text-4xl lg:text-5xl font-bold mb-6',
            isDark ? 'text-white' : 'text-black',
          )}
        >
          Let&apos;s build something
        </h3>
        <p
          className={classNames(
            'text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed',
            isDark ? 'text-white/45' : 'text-black/45',
          )}
        >
          I&apos;m currently open to new opportunities -- whether it&apos;s a full-time role, a contract, or an
          interesting collaboration. If you think we&apos;d be a good fit, I&apos;d love to hear from you.
        </p>
        <a
          href='mailto:markyshuk@gmail.com'
          className='inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full bg-accent text-surface-bg hover:bg-accent-light transition-all duration-200'
        >
          markyshuk@gmail.com
          <svg
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
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
            className='hover:text-accent transition-colors duration-200'
          >
            GitHub
          </a>
          <a
            href='https://linkedin.com/in/mark-artishuk'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-accent transition-colors duration-200'
          >
            LinkedIn
          </a>
          <a href='mailto:markyshuk@gmail.com' className='hover:text-accent transition-colors duration-200'>
            Email
          </a>
        </div>
      </div>
    </motion.footer>
  )
}

// ─── Content ──────────────────────────────────────────────

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
        {/* About */}
        <div id='about' className='pt-20'>
          <SectionHeader>About</SectionHeader>
          <About />
        </div>

        {/* Experience */}
        <div id='experience'>
          <SectionHeader>Experience</SectionHeader>
          <ExperienceSection />
        </div>

        {/* Projects */}
        <div id='projects'>
          <SectionHeader>Selected Work</SectionHeader>
          <ProjectsSection />
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Content
