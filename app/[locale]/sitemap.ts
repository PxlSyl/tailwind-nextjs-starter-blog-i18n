import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const blogRoutes = allBlogs.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
  }))
  const blogRoutesFR = allBlogs.map((post) => ({
    url: `${siteUrl}/fr/${post.path}`,
    lastModified: post.lastmod || post.date,
  }))
  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))
  const routesFR = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/fr/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))
  return [...routes, ...routesFR, ...blogRoutes, ...blogRoutesFR]
}
