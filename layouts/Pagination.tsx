'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import { fallbackLng } from 'app/[locale]/i18n/locales'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}
export default function Pagination({
  totalPages,
  currentPage,
  params: { locale },
}: PaginationProps) {
  const { t } = useTranslation(locale, 'home')
  const pathname = usePathname()
  // Split the pathname into segments
  const segments = pathname.split('/')

  // Determine the base path based on the original logic
  let basePath = ''
  if (segments.includes('tags')) {
    if (locale === fallbackLng) {
      basePath = segments.slice(1, 3).join('/')
    } else {
      basePath = segments.slice(1, 4).join('/')
    }
  } else {
    basePath = locale === fallbackLng ? segments[1] : segments.slice(1, 3).join('/')
  }

  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('prevp')}
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            {t('prevp')}
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('nextp')}
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            {t('nextp')}
          </Link>
        )}
      </nav>
    </div>
  )
}
