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

export async function generateMetadata({ 
  params 
}: BlogPageProps): Promise<Metadata> {
  const locale = (await params).locale
  return genPageMetadata({
    title: 'Blog',
    params: { locale },
  })
}

export default async function BlogPage({ 
  params 
}: BlogPageProps) {
  const locale = (await params).locale
  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return <ListLayout params={{ locale }} posts={filteredPosts} title={t('all')} />
}
