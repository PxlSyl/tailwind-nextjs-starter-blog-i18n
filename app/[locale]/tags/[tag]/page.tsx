import { Metadata } from 'next'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/[locale]/tag-data.json'
import { genPageMetadata } from 'app/[locale]/seo'
import { maintitle } from '@/data/localeMetadata'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { capitalizeFirstLetter } from '@/components/util/capitalizeFirstLetter'

type TagsProps = {
  params: { tag: string; locale: LocaleTypes }
}

export async function generateMetadata({ params: { tag, locale } }: TagsProps): Promise<Metadata> {
  const dtag = decodeURI(tag)
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

export const generateStaticParams = async ({ params: { locale } }: TagsProps) => {
  const tagCounts = tagData[locale]
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
  return paths
}

export default function TagPage({ params: { tag, locale } }: TagsProps) {
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
