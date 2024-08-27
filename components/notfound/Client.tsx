'use client'

import Button from './Button'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
export default function NotFoundclient() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'notfound')
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">{t('title')}</p>
        <p className="mb-8">{t('description')}</p>
        <Button href={`/${locale}`} text={t('back')} />
      </div>
    </div>
  )
}
