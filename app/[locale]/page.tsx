import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Featured from '@/layouts/Featured'
import Main from './Main'
import { LocaleTypes } from './i18n/settings'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      {posts.filter((post) => post.language === locale).some((post) => post.featured) && (
        <Featured posts={posts} params={{ locale }} />
      )}
      <Main posts={posts} params={{ locale: locale }} />
    </>
  )
}
