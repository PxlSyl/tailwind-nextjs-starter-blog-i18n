import { Metadata } from 'next'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/[locale]/tag-data.json'
import { genPageMetadata } from 'app/[locale]/seo'
import { maintitle } from '@/data/localeMetadata'

type Props = {
  params: { tag: string; locale: any }
}

export async function generateMetadata({ params: { tag, locale } }: Props): Promise<Metadata> {
  const dtag = decodeURI(tag)
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const capitalizedDtag = capitalizeFirstLetter(dtag)
  return genPageMetadata({
    title: capitalizedDtag,
    description: `${maintitle[locale]} ${dtag} tagged content`,
    locale: locale,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${dtag}/feed.xml`,
      },
    },
    params: { locale: locale },
  })
}

export const generateStaticParams = async ({ params: { locale } }: Props) => {
  const tagCounts = tagData[locale]
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default function TagPage({ params: { tag, locale } }: Props) {
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
