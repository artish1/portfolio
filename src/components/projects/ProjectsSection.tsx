import { projects, type Project } from '@/data/projects'
import ProjectCard from './ProjectCard'
import { useTheme } from '@/theme/ThemeContext'
import classNames from 'classnames'

const FeaturedProject = ({
  project,
  index,
  reversed = false,
}: {
  project: Project
  index: number
  reversed?: boolean
}) => (
  <ProjectCard.Root index={index}>
    <ProjectCard.Layout direction={reversed ? 'row-reverse' : 'row'}>
      <ProjectCard.Gallery images={project.images} className='lg:w-[55%]' />
      <ProjectCard.Content className='lg:w-[45%] lg:p-10'>
        <ProjectCard.Meta role={project.role} year={project.year} />
        <ProjectCard.Title>{project.title}</ProjectCard.Title>
        <ProjectCard.Description>{project.description}</ProjectCard.Description>
        {project.highlights && <ProjectCard.Highlights items={project.highlights} />}
        <ProjectCard.Tech items={project.tech} />
        <ProjectCard.Links liveUrl={project.liveUrl} githubUrl={project.githubUrl} privateRepo={project.privateRepo} />
      </ProjectCard.Content>
    </ProjectCard.Layout>
  </ProjectCard.Root>
)

const CompactProject = ({ project, index }: { project: Project; index: number }) => (
  <ProjectCard.Root index={index}>
    <ProjectCard.Layout direction='column'>
      {project.images.length > 0 ? (
        <ProjectCard.Gallery images={project.images} />
      ) : (
        <ProjectCard.Placeholder type={project.placeholder} />
      )}
      <ProjectCard.Content>
        <ProjectCard.Meta role={project.role} year={project.year} />
        <ProjectCard.Title className='text-xl md:text-2xl'>{project.title}</ProjectCard.Title>
        <ProjectCard.Description>{project.description}</ProjectCard.Description>
        {project.highlights && <ProjectCard.Highlights items={project.highlights} />}
        <ProjectCard.Tech items={project.tech} />
        <ProjectCard.Links liveUrl={project.liveUrl} githubUrl={project.githubUrl} privateRepo={project.privateRepo} />
      </ProjectCard.Content>
    </ProjectCard.Layout>
  </ProjectCard.Root>
)

const SectionDivider = () => {
  const { theme } = useTheme()
  return (
    <div className='flex items-center gap-4 py-6'>
      <div className={classNames('flex-1 h-px', theme === 'dark' ? 'bg-white/[0.06]' : 'bg-black/[0.06]')} />
      <span
        className={classNames(
          'text-[0.65rem] font-medium uppercase tracking-[0.2em]',
          theme === 'dark' ? 'text-white/20' : 'text-black/20',
        )}
      >
        More Projects
      </span>
      <div className={classNames('flex-1 h-px', theme === 'dark' ? 'bg-white/[0.06]' : 'bg-black/[0.06]')} />
    </div>
  )
}

const ProjectsSection = () => {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <div className='space-y-6'>
      {/* Featured projects -- large, alternating layout */}
      <div className='space-y-6'>
        {featured.map((project, i) => (
          <FeaturedProject key={project.slug} project={project} index={i} reversed={i % 2 !== 0} />
        ))}
      </div>

      {/* Grid for remaining projects */}
      {others.length > 0 && (
        <>
          <SectionDivider />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {others.map((project, i) => (
              <CompactProject key={project.slug} project={project} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectsSection
