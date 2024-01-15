'use client'

import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useParams, usePathname } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import { fallbackLng, secondLng } from 'app/[locale]/i18n/locales'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

type ShareProps = { title: string; description?: string; slug: string; className?: string }

const Share = ({ title, description, slug, className }: ShareProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const pathSegments = pathname.split('/')

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
    <div className="m-4 mt-8 flex items-center justify-center pt-4">
      <h5 className="text-highlighted dark:text-darkmode-highlighted mr-3 text-lg font-bold">
        {t('share')}
      </h5>
      <ul className={className}>
        <li className="inline-block">
          <SocialIcon
            kind="facebook"
            size={6}
            aria-label={t('facebookshare')}
            href={`https://facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}`}
          />
        </li>
        <li className="ml-4 inline-block">
          <SocialIcon
            kind="twitter"
            size={6}
            aria-label={t('twittershare')}
            href={`https://twitter.com/intent/tweet/?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`}
          />
        </li>
        <li className="ml-4 inline-block">
          <SocialIcon
            kind="linkedin"
            size={6}
            aria-label={t('linkedinshare')}
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&title=${title}&summary=${description}&source=${siteMetadata.base_url}`}
          />
        </li>
      </ul>
    </div>
  )
}

export default Share
