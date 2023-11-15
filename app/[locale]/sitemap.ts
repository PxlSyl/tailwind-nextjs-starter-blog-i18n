import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fallbackLng } from './i18n/settings'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const secondLng = 'fr'

  const blogRoutes = allBlogs
    .filter((p) => p.language === fallbackLng)
    .map((post) => ({
      url: `${siteUrl}/${fallbackLng}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const secondBlogRoutes = allBlogs
    .filter((p) => p.language === secondLng)
    .map((post) => ({
      url: `${siteUrl}/${secondLng}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${fallbackLng}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const secondRoutes = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${secondLng}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...secondRoutes, ...blogRoutes, ...secondBlogRoutes]
}
