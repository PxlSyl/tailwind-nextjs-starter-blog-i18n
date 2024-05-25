import { MetadataRoute } from 'next';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import siteMetadata from '@/data/siteMetadata';
import { fallbackLng, secondLng } from './i18n/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;
  const today = new Date().toISOString().split('T')[0];

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .flatMap((post) => {
      const mainUrl = `${siteUrl}/blog/${post.slug}`;
      const alternatepostsUrls: { url: string; lang: string }[] = []

      if (post.language !== secondLng) {
        const alternatepostsUrl = `${siteUrl}/${secondLng}/blog/${post.slug}`;
        alternatepostsUrls.push({ url: alternatepostsUrl, lang: secondLng });
      }

      if (post.language !== fallbackLng) {
        const alternatepostsUrl = `${siteUrl}/${post.language}/blog/${post.slug}`;
        alternatepostsUrls.push({ url: alternatepostsUrl, lang: fallbackLng });
      }

      return [
        { url: mainUrl, lastModified: post.lastmod || post.date },
        ...alternatepostsUrls,
      ];
    });

  const authorsRoutes = allAuthors.flatMap((author) => {
    const mainUrl = `${siteUrl}/about/${author.slug}`;
    const alternateauthorsUrls: { url: string; lang: string }[] = []

    if (author.language !== secondLng) {
      const alternateauthorsUrl = `${siteUrl}/${secondLng}/about/${author.slug}`;
      alternateauthorsUrls.push({ url: alternateauthorsUrl, lang: secondLng });
    }

    if (author.language !== fallbackLng) {
      const alternateauthorsUrl = `${siteUrl}/${author.language}/about/${author.slug}`;
      alternateauthorsUrls.push({ url: alternateauthorsUrl, lang: fallbackLng });
    }

    return [{ url: mainUrl }, ...alternateauthorsUrls];
  });

  const routes = ['', 'blog', 'projects', 'tags'].flatMap((route) => {
    const mainUrl = `${siteUrl}/${route}`;
    const alternateUrls: { url: string; lang: string }[] = []

    if (route !== secondLng) {
      const alternateUrl = `${siteUrl}/${secondLng}/${route}`;
      alternateUrls.push({ url: alternateUrl, lang: secondLng });
    }

    if (route !== fallbackLng) {
      const alternateUrl = `${siteUrl}/${route}`;
      alternateUrls.push({ url: alternateUrl, lang: fallbackLng });
    }

    return [
      { url: mainUrl, lastModified: today },
      ...alternateUrls,
    ];
  });

  const combinedRoutes = [...routes, ...blogRoutes, ...authorsRoutes];

  // Filter out duplicate URLs and undefined values
  const uniqueRoutes = Array.from(new Set(combinedRoutes.map(route => route.url)))
    .map(url => {
      return combinedRoutes.find(route => route.url === url);
    })
    .filter(route => route !== undefined);

  return uniqueRoutes as MetadataRoute.Sitemap;
}
