import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { LocaleTypes } from './i18n/settings'

type Props = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: Props) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} params={{ locale: locale }} />
}
