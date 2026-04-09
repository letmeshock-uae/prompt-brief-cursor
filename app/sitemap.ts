import type { MetadataRoute } from 'next'
import { getAllProjectSlugs, getAllArticleSlugs } from '@/lib/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fl-bureau.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/journal`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/contacts`, lastModified: new Date(), priority: 0.7 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  const articleRoutes: MetadataRoute.Sitemap = getAllArticleSlugs().map((slug) => ({
    url: `${BASE_URL}/journal/${slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...articleRoutes]
}
