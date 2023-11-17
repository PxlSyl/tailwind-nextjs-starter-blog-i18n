import React from 'react'
import { useRouter, usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { allBlogs } from '.contentlayer/generated'

const LangSwitch = () => {
  const pathname = usePathname()
  const router = useRouter()
  const urlSegments = useSelectedLayoutSegments()
  const locale = useParams()?.locale as LocaleTypes

  const { t } = useTranslation(locale, '')

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value
    const newUrl = `/${newLocale}/${urlSegments.join('/')}`
    const postpath = allBlogs.find((p) => pathname.includes(p.slug) && p.language === locale)

    if (postpath) {
      const newpath = allBlogs.find(
        (p) => p.localeid === postpath.localeid && p.language === newLocale
      )
      if (newpath) {
        router.push(`/${newLocale}/blog/${newpath.slug}`)
      } else {
        router.push(`/${newLocale}/blog`)
      }
    } else if (pathname !== newUrl) {
      router.push(newUrl)
    }
  }

  return (
    <div>
      <label htmlFor={t('lang')} className="sr-only">
        {t('lang')}
      </label>
      <select
        id={t('lang')}
        aria-label={t('lang')}
        onChange={handleLocaleChange}
        defaultValue={locale}
        className="cursor-pointer rounded-md font-semibold dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {locales.map((e: string) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LangSwitch
