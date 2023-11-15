import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fallbackLng } from './i18n/settings'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((p) => p.language === fallbackLng)
    .map((post) => ({
      url: `${siteUrl}/${fallbackLng}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const blogRoutesFR = allBlogs
    .filter((p) => p.language === 'fr')
    .map((post) => ({
      url: `${siteUrl}/fr/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${fallbackLng}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const routesFR = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/fr/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...routesFR, ...blogRoutes, ...blogRoutesFR]
}
