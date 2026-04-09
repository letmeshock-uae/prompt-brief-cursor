import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project, ProjectFrontmatter, Article, ArticleFrontmatter } from '@/types'

const projectsDir = path.join(process.cwd(), 'content/projects')
const articlesDir = path.join(process.cwd(), 'content/articles')

function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'))

  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(projectsDir, file), 'utf8')
    const { data, content } = matter(raw)
    const fm = data as ProjectFrontmatter

    return {
      id: slug,
      slug,
      title: fm.title,
      category: fm.category,
      area: fm.area,
      year: fm.year,
      location: fm.location,
      isPrivate: fm.isPrivate ?? false,
      coverImage: fm.coverImage,
      images: fm.images ?? [],
      description: content,
      tags: fm.tags ?? [],
      featured: fm.featured ?? false,
      content,
    } satisfies Project
  })

  return projects.sort((a, b) => b.year - a.year)
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as ProjectFrontmatter

  return {
    id: slug,
    slug,
    title: fm.title,
    category: fm.category,
    area: fm.area,
    year: fm.year,
    location: fm.location,
    isPrivate: fm.isPrivate ?? false,
    coverImage: fm.coverImage,
    images: fm.images ?? [],
    description: content,
    tags: fm.tags ?? [],
    featured: fm.featured ?? false,
    content,
  }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured && !p.isPrivate)
}

export function getProjectsByCategory(category: string): Project[] {
  return getAllProjects().filter((p) => p.category === category)
}

export function getAllProjectSlugs(): string[] {
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.mdx'))

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(articlesDir, file), 'utf8')
    const { data, content } = matter(raw)
    const fm = data as ArticleFrontmatter

    return {
      id: slug,
      slug,
      title: fm.title,
      excerpt: fm.excerpt,
      coverImage: fm.coverImage,
      category: fm.category,
      publishedAt: fm.publishedAt,
      readTime: fm.readTime ?? calcReadTime(content),
      content,
    } satisfies Article
  })

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as ArticleFrontmatter

  return {
    id: slug,
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    coverImage: fm.coverImage,
    category: fm.category,
    publishedAt: fm.publishedAt,
    readTime: fm.readTime ?? calcReadTime(content),
    content,
  }
}

export function getLatestArticles(n = 3): Article[] {
  return getAllArticles().slice(0, n)
}

export function getAllArticleSlugs(): string[] {
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
