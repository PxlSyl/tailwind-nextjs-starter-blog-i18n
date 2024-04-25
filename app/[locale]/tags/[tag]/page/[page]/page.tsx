import { Metadata } from 'next'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/[locale]/tag-data.json'
import { genPageMetadata } from 'app/[locale]/seo'
import { maintitle } from '@/data/localeMetadata'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { capitalizeFirstLetter } from '@/components/util/capitalizeFirstLetter'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'

type TagsProps = {
  params: { tag: string; locale: LocaleTypes; page: string }
}

export async function generateMetadata({ params: { tag, locale } }: TagsProps): Promise<Metadata> {
  const capitalizedDtag = capitalizeFirstLetter(tag)
  return genPageMetadata({
    title: capitalizedDtag,
    description: `${maintitle[locale]} ${tag} tagged content`,
    locale: locale,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
    params: { locale: locale },
  })
}

export const generateStaticParams = async ({ params: { tag, locale } }: TagsProps) => {
  const tagCount = tagData[locale][tag] || 0
  const totalPages = Math.ceil(tagCount.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default function TagSingle({ params: { tag, page, locale } }: TagsProps) {
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        return post.language === locale
      })
    ).filter((post) => {
      return post.tags && post.tags.map((t) => slug(t)).includes(tag)
    })
  )
  const pageNumber = parseInt(page as string)
  const indexOfLastPost = pageNumber * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const initialDisplayPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    params: { locale: locale },
  }

  return (
    <ListLayout
      params={{ locale: locale }}
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
