import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

type BlogPageProps = {
  params: { locale: LocaleTypes; page: string }
}

export const generateStaticParams = async ({ params: { locale } }: BlogPageProps) => {
  const filteredPosts = allBlogs.filter((post) => post.language === locale)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page({ params: { locale, page } }: BlogPageProps) {
  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  // Filter posts based on the current locale
  const filteredPosts = posts.filter((post) => post.language === locale)
  const pageNumber = parseInt(page as string)
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
