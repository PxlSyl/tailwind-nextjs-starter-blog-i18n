import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { locales, fallbackLng } from './i18n/settings'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const generateLocalizedUrl = (path: string, locale: string): string => {
    return locale === fallbackLng ? `${siteUrl}/${path}` : `${siteUrl}/${locale}/${path}`
  }

  const blogRoutes = allBlogs.map((post) => ({
    url: generateLocalizedUrl(post.path, post.language),
    lastModified: post.lastmod || post.date,
  }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: generateLocalizedUrl(route, fallbackLng),
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
