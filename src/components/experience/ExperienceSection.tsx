import { experience, type Experience } from '@/data/experience'
import { useTheme } from '@/theme/ThemeContext'
import classNames from 'classnames'
import { motion } from 'motion/react'

const TypeBadge = ({ type }: { type: Experience['type'] }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const labels: Record<Experience['type'], string> = {
    fulltime: 'Full-time',
    cofounded: 'Co-founded',
    contract: 'Contract',
  }

  return (
    <span
      className={classNames(
        'inline-block px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider rounded-full',
        isDark ? 'bg-accent/10 text-accent' : 'bg-black/[0.06] text-black/50',
      )}
    >
      {labels[type]}
    </span>
  )
}

const ExperienceCard = ({ item, index }: { item: Experience; index: number }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={classNames(
        'relative pl-8 pb-12 last:pb-0',
        // Timeline line
        'before:absolute before:left-[3px] before:top-[10px] before:bottom-0 before:w-px last:before:hidden',
        isDark ? 'before:bg-white/[0.08]' : 'before:bg-black/[0.08]',
      )}
    >
      {/* Timeline dot */}
      <div
        className={classNames(
          'absolute left-0 top-[6px] w-[7px] h-[7px] rounded-full',
          isDark ? 'bg-accent' : 'bg-black/30',
        )}
      />

      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3'>
        <div className='flex items-center gap-3'>
          <h3 className={classNames('text-lg font-bold', isDark ? 'text-white' : 'text-black')}>{item.company}</h3>
          <TypeBadge type={item.type} />
        </div>
        <span
          className={classNames(
            'text-xs font-medium tracking-wide sm:ml-auto',
            isDark ? 'text-white/30' : 'text-black/30',
          )}
        >
          {item.period}
        </span>
      </div>

      {/* Role */}
      <p className={classNames('text-sm font-medium mb-3', isDark ? 'text-accent/80' : 'text-black/60')}>{item.role}</p>

      {/* Description */}
      <p className={classNames('text-sm leading-relaxed mb-4', isDark ? 'text-white/50' : 'text-black/50')}>
        {item.description}
      </p>

      {/* Highlights */}
      <ul className='space-y-2'>
        {item.highlights.map((highlight, i) => (
          <li key={i} className='flex items-start gap-2.5'>
            <span
              className={classNames(
                'mt-[7px] flex-shrink-0 w-1 h-1 rounded-full',
                isDark ? 'bg-accent/40' : 'bg-black/25',
              )}
            />
            <span className={classNames('text-[0.8rem] leading-relaxed', isDark ? 'text-white/40' : 'text-black/40')}>
              {highlight}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

const ExperienceSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className='mb-24'
    >
      <div className='max-w-3xl'>
        {experience.map((item, i) => (
          <ExperienceCard key={item.company} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  )
}

export default ExperienceSection
