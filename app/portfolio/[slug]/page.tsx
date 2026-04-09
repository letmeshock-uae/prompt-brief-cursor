import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProjectBySlug, getAllProjectSlugs, getAllProjects } from '@/lib/content'
import { MDXRenderer } from '@/components/shared/MDXRenderer/MDXRenderer'
import { ProjectGallery } from '@/components/features/project/ProjectGallery'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs/Breadcrumbs'
import { ProjectCard } from '@/components/features/project/ProjectCard'
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: `${project.category} проект · ${project.year}${project.location ? ` · ${project.location}` : ''}`,
  }
}

const categoryLabels: Record<string, string> = {
  residential: 'Жилой',
  commercial: 'Коммерческий',
  object: 'Предметный',
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const related = getAllProjects()
    .filter((p) => p.slug !== slug && p.category === project.category && !p.isPrivate)
    .slice(0, 3)

  return (
    <>
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/60" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-16">
          <Breadcrumbs
            crumbs={[
              { label: 'Главная', href: '/' },
              { label: 'Портфолио', href: '/portfolio' },
              { label: project.title },
            ]}
            className="mb-4"
          />
          <h1 className="font-heading text-h1 text-accent-foreground">{project.title}</h1>
        </div>
      </div>

      {/* Meta */}
      <section className="border-b border-border py-8 px-6 md:px-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-label uppercase tracking-[0.12em] text-muted">Категория</p>
              <p className="mt-1 text-sm text-foreground">{categoryLabels[project.category]}</p>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.12em] text-muted">Год</p>
              <p className="mt-1 text-sm text-foreground">{project.year}</p>
            </div>
            {project.area && (
              <div>
                <p className="text-label uppercase tracking-[0.12em] text-muted">Площадь</p>
                <p className="mt-1 text-sm text-foreground">{project.area} m²</p>
              </div>
            )}
            {project.location && (
              <div>
                <p className="text-label uppercase tracking-[0.12em] text-muted">Локация</p>
                <p className="mt-1 text-sm text-foreground">{project.location}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      {project.content && (
        <section className="py-16 px-6 md:px-16">
          <div className="container mx-auto max-w-3xl">
            <ScrollReveal>
              <MDXRenderer source={project.content} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.images.length > 0 && (
        <section className="py-8 px-6 md:px-16">
          <div className="container mx-auto">
            <ScrollReveal>
              <ProjectGallery images={project.images} title={project.title} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 px-6 md:px-16 bg-surface">
          <div className="container mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-h2 text-foreground">Похожие проекты</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.08}>
                  <ProjectCard project={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
