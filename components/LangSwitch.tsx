import { useRef, useState } from 'react'
import { usePathname, useParams, useSelectedLayoutSegments } from 'next/navigation'
import { useOuterClick } from './util/useOuterClick'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { fallbackLng, secondLng } from 'app/[locale]/i18n/locales'
import { allBlogs } from '.contentlayer/generated'
import slugMap from 'app/[locale]/localeid-map.json'
import Link from 'next/link'

const LangSwitch = () => {
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const locale = useParams()?.locale as LocaleTypes

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLocaleChange = (newLocale: string): string => {
    const newUrl = `/${newLocale}/${urlSegments.join('/')}`

    // Find the current post based on the current locale and slug
    const currentPost = allBlogs.find((p) => pathname.includes(p.slug))

    if (currentPost) {
      // Find the corresponding slug in the new language
      const newSlug = slugMap[currentPost.localeid]?.[newLocale]

      if (newSlug) {
        return `/${newLocale}/blog/${newSlug}`
      } else {
        return `/${newLocale}/blog`
      }
    }

    return newUrl
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-white"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          {locale}
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-12 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          onBlur={closeMenu}
        >
          <div className="py-1" role="none">
            {locales.map((newLocale: string) => (
              <Link key={newLocale} href={handleLocaleChange(newLocale)} locale={false}>
                <button
                  className="dark: block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                  onClick={closeMenu}
                >
                  {newLocale}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LangSwitch
