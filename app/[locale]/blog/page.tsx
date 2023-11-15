import { Metadata } from 'next'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'

type Props = {
  params: { locale: any }
}

const POSTS_PER_PAGE = 5

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return genPageMetadata({
    title: 'Blog',
    params: { locale: locale },
  })
}

export default async function BlogPage({ params: { locale } }: Props) {
  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  // Filter posts based on the current locale
  const filteredPosts = posts.filter((post) => post.draft === false && post.language === locale)
  const pageNumber = 1
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
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
      title={t('all')}
    />
  )
}
