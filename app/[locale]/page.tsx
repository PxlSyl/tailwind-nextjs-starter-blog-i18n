import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import FeaturedLayout from '@/layouts/FeaturedLayout'
import HomeLayout from '@/layouts/HomeLayout'
import { LocaleTypes } from './i18n/settings'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const hasFeaturedPosts = posts.filter((post) => post.language === locale && post.featured)

  return (
    <>
      {hasFeaturedPosts && <FeaturedLayout posts={hasFeaturedPosts} params={{ locale }} />}
      <HomeLayout posts={posts} params={{ locale }} />
    </>
  )
}
