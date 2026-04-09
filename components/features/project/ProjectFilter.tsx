'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

type Category = 'all' | 'residential' | 'commercial' | 'object'

interface ProjectFilterProps {
  active: Category
  onChange: (cat: Category) => void
}

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'residential', label: 'Жилые' },
  { value: 'commercial', label: 'Коммерческие' },
  { value: 'object', label: 'Предметные' },
]

export function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по категории">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            'relative px-5 py-2 text-label uppercase tracking-[0.12em] rounded-sm transition-colors duration-200',
            active === cat.value
              ? 'text-accent-foreground'
              : 'text-muted hover:text-foreground'
          )}
        >
          {active === cat.value && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-sm bg-accent"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  )
}
