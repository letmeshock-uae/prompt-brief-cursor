import { ArticleCard } from './ArticleCard'
import type { Article } from '@/types'

interface ArticleGridProps {
  articles: Article[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (!articles.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted">Статьи скоро появятся</p>
      </div>
    )
  }

  const [featured, ...rest] = articles

  return (
    <div className="space-y-12">
      {featured && <ArticleCard article={featured} featured />}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
