'use client'

import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from '../search/KBarButton'
import { CommentsIcon, ArrowTopIcon } from './icons'
import { SearchIcon } from '../search/icons'

const ScrollTopAndComment = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView()
  }

  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <div
        className={`fixed bottom-8 right-8 z-50 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
      >
        <SearchButtonWrapper aria-label="Search">
          <div className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
            <SearchIcon className="h-5 w-5" />
          </div>
        </SearchButtonWrapper>
        {siteMetadata.comments?.provider && (
          <button
            aria-label={t('scrollcomment')}
            onClick={handleScrollToComment}
            className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <CommentsIcon className="h-5 w-5" />
          </button>
        )}
        <button
          aria-label={t('scrolltop')}
          onClick={handleScrollTop}
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <ArrowTopIcon className="h-5 w-5" />
        </button>
      </div>
    )
  }
}

export default ScrollTopAndComment
