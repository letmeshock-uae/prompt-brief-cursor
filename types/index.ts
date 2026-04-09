export interface Project {
  id: string
  slug: string
  title: string
  category: 'residential' | 'commercial' | 'object'
  area?: number
  year: number
  location?: string
  isPrivate: boolean
  coverImage: string
  images: string[]
  description: string
  tags?: string[]
  featured: boolean
  content?: string
}

export interface ProjectFrontmatter {
  title: string
  category: 'residential' | 'commercial' | 'object'
  area?: number
  year: number
  location?: string
  isPrivate?: boolean
  coverImage: string
  images?: string[]
  tags?: string[]
  featured?: boolean
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category?: string
  publishedAt: string
  readTime: number
  content?: string
}

export interface ArticleFrontmatter {
  title: string
  excerpt: string
  coverImage: string
  category?: string
  publishedAt: string
  readTime?: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  order: number
}

export interface ServiceStage {
  step: number
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  description: string
  stages: ServiceStage[]
  order: number
}

export interface Stat {
  id: string
  label: string
  value: number
  unit: string
  order: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface Breadcrumb {
  label: string
  href?: string
}

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  message: string
  source?: string
}

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}
