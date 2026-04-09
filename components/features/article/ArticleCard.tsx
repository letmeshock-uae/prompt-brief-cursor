import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/types'
import { cn } from '@/lib/cn'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link href={`/journal/${article.slug}`} className="group block">
      <div
        className={cn(
          'relative overflow-hidden rounded-md bg-surface shadow-vibe-sm transition-shadow duration-300 group-hover:shadow-vibe-lg',
          featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
        )}
      >
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-3">
          {article.category && (
            <span className="text-label uppercase tracking-[0.12em] text-accent">
              {article.category}
            </span>
          )}
          <span className="text-label text-muted/50">·</span>
          <span className="text-label text-muted">{article.readTime} мин</span>
        </div>
        <h3
          className={cn(
            'mt-2 font-heading text-foreground transition-colors group-hover:text-accent',
            featured ? 'text-h2' : 'text-h3'
          )}
        >
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-muted line-clamp-2">{article.excerpt}</p>
        <p className="mt-3 text-label text-muted/60">{formattedDate}</p>
      </div>
    </Link>
  )
}
