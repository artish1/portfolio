import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projectHref, projects } from '@/data/projects'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projects.find((x) => x.slug === params.slug)
  if (!p) return {}
  const title = `${p.title} | Mark Artishuk`
  return {
    title,
    description: p.outcome,
    alternates: { canonical: projectHref(p.slug) },
    openGraph: {
      title,
      description: p.outcome,
      type: 'article',
      url: projectHref(p.slug),
      images: [p.images[0]?.src ?? '/images/projects/huntnhook/01-landing-hero.png'],
    },
    twitter: { card: 'summary_large_image' },
  }
}

// The case study itself is rendered by the (site) layout (see HomePage).
export default function ProjectPage({ params }: { params: { slug: string } }) {
  if (!projects.some((p) => p.slug === params.slug)) notFound()
  return null
}
