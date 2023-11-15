'use client'

import { useParams } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LangSwitch from './LangSwitch'
import SearchButton from './SearchButton'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href={`/${locale}/`} aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={`/${locale}${link.href}`}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {t(`${link.title.toLowerCase()}`)}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <LangSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
