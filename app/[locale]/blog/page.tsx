import { Metadata } from 'next'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

type BlogPageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: BlogPageProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'Blog',
    params: { locale: locale },
  })
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return <ListLayout params={{ locale: locale }} posts={filteredPosts} title={t('all')} />
}
