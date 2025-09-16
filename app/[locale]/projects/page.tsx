import { genPageMetadata } from 'app/[locale]/seo'
import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import { createTranslation } from '../i18n/server'
import type { LocaleTypes } from '../i18n/settings'
import Project from './project'

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'projects')
  return genPageMetadata({
    title: t('title'),
    params: { locale },
  })
}

export default async function Projects({ params }: PageProps): Promise<ReactElement> {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'projects')
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          {t('title')}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{t('description')}</p>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          <Project />
        </div>
      </div>
    </div>
  )
}
