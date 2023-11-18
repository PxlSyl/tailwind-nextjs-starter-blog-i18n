import { useRouter, usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { allBlogs } from '.contentlayer/generated'
import slugMap from 'app/[locale]/localeid-map.json'

const LangSwitch = () => {
  const pathname = usePathname()
  const router = useRouter()
  const urlSegments = useSelectedLayoutSegments()
  const locale = useParams()?.locale as LocaleTypes

  const { t } = useTranslation(locale, '')

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value
    const newUrl = `/${newLocale}/${urlSegments.join('/')}`

    // Find the current post based on the current locale and slug
    const currentPost = allBlogs.find((p) => pathname.includes(p.slug) && p.language === locale)

    if (currentPost) {
      // Find the corresponding slug in the new language
      const newSlug = slugMap[currentPost.localeid]?.[newLocale]

      if (newSlug) {
        router.push(`/${newLocale}/blog/${newSlug}`)
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
