import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getArticleBySlug, getAllArticleSlugs, getAllArticles } from '@/lib/content'
import { MDXRenderer } from '@/components/shared/MDXRenderer/MDXRenderer'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs/Breadcrumbs'
import { ArticleCard } from '@/components/features/article/ArticleCard'
import { ReadingProgress } from '@/components/features/article/ReadingProgress'
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getAllArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 3)

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/60" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-16">
          <Breadcrumbs
            crumbs={[
              { label: 'Главная', href: '/' },
              { label: 'Журнал', href: '/journal' },
              { label: article.title },
            ]}
            className="mb-4"
          />
        </div>
      </div>

      {/* Article */}
      <section className="py-16 px-6 md:px-16">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="mb-8">
              {article.category && (
                <span className="text-label uppercase tracking-[0.12em] text-accent">
                  {article.category}
                </span>
              )}
              <h1 className="mt-3 font-heading text-h1 text-foreground">{article.title}</h1>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-label text-muted">{formattedDate}</span>
                <span className="text-muted/30">·</span>
                <span className="text-label text-muted">{article.readTime} мин чтения</span>
              </div>
              <p className="mt-6 text-body text-muted leading-relaxed">{article.excerpt}</p>
            </div>
          </ScrollReveal>

          {article.content && (
            <ScrollReveal delay={0.1}>
              <MDXRenderer source={article.content} />
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 px-6 md:px-16 bg-surface">
          <div className="container mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-h2 text-foreground">Ещё статьи</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((a, i) => (
                <ScrollReveal key={a.slug} delay={i * 0.08}>
                  <ArticleCard article={a} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
