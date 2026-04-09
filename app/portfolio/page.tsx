import type { Metadata } from 'next'
import { HeroStatic } from '@/components/features/hero/HeroStatic'
import { PortfolioClientPage } from '@/components/features/project/PortfolioClientPage'
import { getAllProjects } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Портфолио',
  description: 'Проекты FL Bureau — жилые интерьеры, коммерческие объекты, предметный дизайн.',
}

export default function PortfolioPage() {
  const projects = getAllProjects()

  return (
    <>
      <HeroStatic title="Портфолио" subtitle="Наши работы" />
      <PortfolioClientPage projects={projects} />
    </>
  )
}
