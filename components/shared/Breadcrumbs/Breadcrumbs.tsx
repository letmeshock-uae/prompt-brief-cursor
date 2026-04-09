import Link from 'next/link'
import type { Breadcrumb } from '@/types'
import { cn } from '@/lib/cn'

interface BreadcrumbsProps {
  crumbs: Breadcrumb[]
  className?: string
}

export function Breadcrumbs({ crumbs, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Навигационная цепочка" className={cn('flex items-center gap-2', className)}>
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={crumb.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted/40 text-label">/</span>}
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={cn('text-label uppercase tracking-[0.12em]', isLast ? 'text-foreground' : 'text-muted')}>
                {crumb.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
