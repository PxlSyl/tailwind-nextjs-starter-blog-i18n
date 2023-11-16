//This file is the most important for SEO purposes so be sure to configure it perfectly with your project settings
import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { fallbackLng, secondLng } from './i18n/locales'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  // blog route for english
  const blogRoutes = allBlogs
    .filter((p) => p.language === fallbackLng)
    .map((post) => ({
      url: `${siteUrl}/${fallbackLng}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))
  // blog route for french (or your own second language)
  const secondBlogRoutes = allBlogs
    .filter((p) => p.language === secondLng)
    .map((post) => ({
      url: `${siteUrl}/${secondLng}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))
  // all routes for english
  const routes = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${fallbackLng}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))
  // all routes for french (or your own second language)
  const secondRoutes = ['', 'blog', 'projects', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${secondLng}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...secondRoutes, ...blogRoutes, ...secondBlogRoutes]
}
