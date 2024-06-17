'use client'

import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import { fallbackLng, secondLng } from 'app/[locale]/i18n/locales'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

type ShareProps = { title: string; description?: string; slug: string; className?: string }

const Share = ({ title, description, slug, className }: ShareProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 10 * 60 * 1000) // Reset copied state after 10 minutes
  }

  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const pathSegments = pathname!.split('/')

  // Choose the appropriate segment based on the locale
  let targetSegment = pathSegments.length >= 2 ? pathSegments[1] : ''

  if (locale === fallbackLng) {
    // If locale is fallbackLng, use the second segment
    targetSegment = pathSegments.length >= 2 ? pathSegments[1] : ''
  } else if (locale === secondLng) {
    // If locale is secondLng, use the third segment
    targetSegment = pathSegments.length >= 3 ? pathSegments[2] : ''
  }

  return (
    <div className="m-4 mt-8 flex flex-col items-center justify-center pt-4 sm:flex-row">
      <div className="mb-4 sm:mb-0">
        <p className="text-highlighted dark:text-darkmode-highlighted mr-3 px-4 font-bold text-primary-500 sm:border-r-2">
          {t('share')}
        </p>
      </div>
      <div>
        <ul className={`grid grid-cols-4 gap-4 ${className}`}>
          <li className="ml-4 inline-block">
            <SocialIcon
              kind="facebook"
              size={5}
              aria-label={t('facebookshare')}
              href={`https://facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}`}
            />
          </li>
          <li className="ml-4 inline-block">
            <SocialIcon
              kind="twitter"
              size={5}
              aria-label={t('twittershare')}
              href={`https://twitter.com/intent/tweet/?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
            />
          </li>
          <li className="ml-4 inline-block">
            <SocialIcon
              kind="threads"
              size={5}
              aria-label={t('threadsshare')}
              href={`https://threads.net/intent/post?text=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}`}
            />
          </li>
          <li className="ml-4 inline-block">
            <SocialIcon
              kind="linkedin"
              size={5}
              aria-label={t('linkedinshare')}
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&title=${title}&summary=${description}&source=${siteMetadata.siteUrl}`}
            />
          </li>
          <li className="ml-4 inline-block">
            <SocialIcon
              kind="reddit"
              size={5}
              aria-label={t('redditshare')}
              href={`https://www.reddit.com/submit?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&title=${title}`}
            />
          </li>
          <li className="ml-4 inline-block">
            <SocialIcon
              kind="whatsapp"
              size={5}
              aria-label={t('whatsappshare')}
              href={`https://wa.me/?text=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
            />
          </li>
          <li className="ml-4 inline-block">
            <SocialIcon
              kind="telegram"
              size={5}
              aria-label={t('telegramshare')}
              href={`https://telegram.me/share/url?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
            />
          </li>
          <li className="relative ml-4 inline-block">
            <button
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
              onClick={handleCopy}
              className="fill-current text-gray-700 outline-none hover:text-primary-500 focus:outline-none dark:text-gray-200 dark:hover:text-primary-400"
            >
              <svg height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 w-32 rounded-md bg-white p-2 text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                <p className={`${copied ? 'text-primary-500 dark:text-primary-400' : ''}`}>
                  {copied ? t('urlcopied') : t('copyurl')}
                </p>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Share
