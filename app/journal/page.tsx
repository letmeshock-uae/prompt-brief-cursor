import type { Metadata } from 'next'
import { HeroStatic } from '@/components/features/hero/HeroStatic'
import { ArticleGrid } from '@/components/features/article/ArticleGrid'
import { getAllArticles } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Журнал',
  description: 'Статьи о дизайне интерьера, архитектуре и процессе создания пространств.',
}

export default function JournalPage() {
  const articles = getAllArticles()

  return (
    <>
      <HeroStatic title="Журнал" subtitle="Наши мысли" />

      <section className="py-16 px-6 md:px-16">
        <div className="container mx-auto">
          <ArticleGrid articles={articles} />
        </div>
      </section>
    </>
  )
}
