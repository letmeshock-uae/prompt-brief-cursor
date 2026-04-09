import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroVideo } from '@/components/features/hero/HeroVideo'
import { MarqueeStrip } from '@/components/shared/MarqueeStrip/MarqueeStrip'
import { ProjectCard } from '@/components/features/project/ProjectCard'
import { StatCounter } from '@/components/features/stat/StatCounter'
import { ArticleCard } from '@/components/features/article/ArticleCard'
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal'
import { getFeaturedProjects, getLatestArticles } from '@/lib/content'
import { stats } from '@/data/stats'
import { services } from '@/data/services'
import { marqueeText } from '@/data/navigation'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'FL Bureau — Дизайн интерьера и архитектура',
}

export default function HomePage() {
  const featuredProjects = getFeaturedProjects()
  const latestArticles = getLatestArticles(3)

  return (
    <>
      <HeroVideo />
      <MarqueeStrip text={marqueeText} />

      {/* Featured Projects */}
      <section className="py-24 px-6 md:px-16">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-label uppercase tracking-[0.12em] text-accent">Портфолио</p>
              <h2 className="mt-2 font-heading text-h2 text-foreground">Избранные проекты</h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden items-center gap-2 text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent md:flex"
            >
              Все проекты
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <Link
              href="/portfolio"
              className="flex items-center gap-2 text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
            >
              Все проекты <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.id} delay={i * 0.1}>
                <StatCounter stat={stat} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 md:px-16">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Услуги</p>
            <h2 className="mt-2 font-heading text-h2 text-foreground max-w-xl">
              Полный цикл — от идеи до авторского надзора
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 0.08}>
                <div className="group rounded-md border border-border p-8 transition-all duration-300 hover:border-accent hover:shadow-vibe-md">
                  <span className="text-label uppercase tracking-[0.12em] text-accent">
                    0{service.order}
                  </span>
                  <h3 className="mt-3 font-heading text-h3 text-foreground group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted line-clamp-2">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10">
            <Link
              href="/services"
              className="flex items-center gap-2 text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
            >
              Подробнее об услугах <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Journal */}
      {latestArticles.length > 0 && (
        <section className="py-24 px-6 md:px-16 bg-surface">
          <div className="container mx-auto">
            <ScrollReveal className="mb-12 flex items-end justify-between">
              <div>
                <p className="text-label uppercase tracking-[0.12em] text-accent">Журнал</p>
                <h2 className="mt-2 font-heading text-h2 text-foreground">Последние статьи</h2>
              </div>
              <Link
                href="/journal"
                className="hidden items-center gap-2 text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent md:flex"
              >
                Все статьи <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {latestArticles.map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 0.08}>
                  <ArticleCard article={article} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-surface-dark py-28 px-6 text-center">
        <ScrollReveal>
          <p className="text-label uppercase tracking-[0.12em] text-accent">Начнём?</p>
          <h2 className="mt-4 font-heading text-h1 text-accent-foreground max-w-2xl mx-auto">
            Расскажите нам о вашем проекте
          </h2>
          <p className="mt-6 text-body text-accent-foreground/60 max-w-lg mx-auto">
            Ответим в течение рабочего дня. Первая консультация — бесплатно.
          </p>
          <Link
            href="/contacts"
            className="mt-10 inline-flex items-center gap-3 rounded-sm bg-accent px-8 py-4 text-label uppercase tracking-[0.12em] text-accent-foreground shadow-accent-glow transition-all duration-300 hover:bg-accent-light"
          >
            Оставить заявку <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
