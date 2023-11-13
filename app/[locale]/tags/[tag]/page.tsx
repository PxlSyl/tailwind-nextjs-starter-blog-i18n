import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/[locale]/tag-data.json'
import { genPageMetadata } from 'app/[locale]/seo'
import { Metadata } from 'next'

export async function generateMetadata({ params: { tag, locale } }): Promise<Metadata> {
  const dtag = decodeURI(tag)
  return genPageMetadata({
    title: dtag,
    description: `${siteMetadata.title} ${dtag} tagged content`,
    locale: locale,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${dtag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async ({ params: { locale } }) => {
  const tagCounts = tagData[locale]
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }))
  return paths
}

export default function TagPage({ params: { tag, locale } }) {
  const dtag = decodeURI(tag)
  // Capitalize first letter and convert space to dash
  const title = dtag[0].toUpperCase() + dtag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        return post.language === locale
      })
    ).filter((post) => {
      return post.tags && post.tags.map((t) => slug(t)).includes(dtag)
    })
  )

  return <ListLayout posts={filteredPosts} title={title} params={{ locale: locale }} />
}
