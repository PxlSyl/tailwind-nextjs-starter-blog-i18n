import { Metadata } from 'next'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { notFound } from 'next/navigation'

type AboutProps = {
  params: { authors: string[]; locale: LocaleTypes }
}

export async function generateMetadata({
  params: { authors, locale },
}: AboutProps): Promise<Metadata | undefined> {
  const authorSlug = decodeURI(authors.join('/'))
  const author = allAuthors.find((a) => a.slug === authorSlug && a.language === locale) as Authors
  if (!author) {
    return
  }
  const { t } = await createTranslation(locale, 'about')

  return genPageMetadata({
    title: `${t('about')} ${author.name}`,
    params: { locale: locale },
  })
}

export default async function Page({ params: { authors, locale } }: AboutProps) {
  const authorSlug = decodeURI(authors.join('/'))
  const author = allAuthors.find((a) => a.slug === authorSlug && a.language === locale) as Authors
  const authorIndex = allAuthors.findIndex((p) => p.slug === authorSlug)
  if (authorIndex === -1) {
    return notFound()
  }
  const mainContent = coreContent(author)

  return (
    <AuthorLayout params={{ locale: locale }} content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}
