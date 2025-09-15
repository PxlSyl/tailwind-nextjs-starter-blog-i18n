import ListLayout from '@/layouts/ListLayout'
import { genPageMetadata } from 'app/[locale]/seo'
import { allBlogs } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { ReactElement } from 'react'
import { createTranslation } from '../i18n/server'
import type { LocaleTypes } from '../i18n/settings'

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return genPageMetadata({
    title: 'Blog',
    params: { locale },
  })
}

export default async function BlogPage({ params }: PageProps): Promise<ReactElement> {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return <ListLayout params={{ locale }} posts={filteredPosts} title={t('all')} />
}
