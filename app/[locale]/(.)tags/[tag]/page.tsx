import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

type Props = {
  params: { tag: string; locale: LocaleTypes }
}

export default function TagPage({ params: { tag, locale } }: Props) {
  const dtag = decodeURI(tag)
  // Capitalize first letter and convert space to dash
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => {
        return post.language === locale
      })
    ).filter((post) => {
      return post.tags && post.tags.map((t) => slug(t)).includes(dtag)
    })
  )

  return (
    <>
      <pre>{JSON.stringify(filteredPosts, null, 2)}</pre>
    </>
  )
}
