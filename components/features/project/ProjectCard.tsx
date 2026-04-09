'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock } from '@phosphor-icons/react'
import type { Project } from '@/types'
import { cn } from '@/lib/cn'

interface ProjectCardProps {
  project: Project
  index?: number
}

const categoryLabels: Record<string, string> = {
  residential: 'Жилой',
  commercial: 'Коммерческий',
  object: 'Предметный',
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  if (project.isPrivate) {
    return (
      <div className="group relative overflow-hidden rounded-md bg-surface aspect-[4/5]">
        <div className="absolute inset-0 bg-surface-dark/80 backdrop-blur-sm" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <Lock size={28} className="text-muted" />
          <p className="text-label uppercase tracking-[0.12em] text-muted">Приватный проект</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      layout
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-md aspect-[4/5] bg-surface shadow-vibe-sm transition-shadow duration-300 group-hover:shadow-vibe-lg">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-label uppercase tracking-[0.12em] text-accent">
              {categoryLabels[project.category]}
            </p>
            <h3 className="mt-1 font-heading text-h3 text-accent-foreground">{project.title}</h3>
            <p className="mt-1 text-label text-accent-foreground/60">
              {project.location && `${project.location} · `}{project.year}
              {project.area && ` · ${project.area} m²`}
            </p>
          </div>
        </div>
        <div className={cn('mt-4 group-hover:opacity-70 transition-opacity')}>
          <p className="text-label uppercase tracking-[0.12em] text-muted">{categoryLabels[project.category]}</p>
          <h3 className="mt-1 font-heading text-h3 text-foreground">{project.title}</h3>
        </div>
      </Link>
    </motion.div>
  )
}
