'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { ProjectFilter } from './ProjectFilter'
import type { Project } from '@/types'

type Category = 'all' | 'residential' | 'commercial' | 'object'

interface PortfolioClientPageProps {
  projects: Project[]
}

export function PortfolioClientPage({ projects }: PortfolioClientPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section className="py-16 px-6 md:px-16">
      <div className="container mx-auto">
        <div className="mb-10">
          <ProjectFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted">В этой категории пока нет проектов</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
