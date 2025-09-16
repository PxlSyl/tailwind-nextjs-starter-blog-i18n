'use client'

import siteMetadata from '@/data/siteMetadata'
import { init } from '@waline/client'
import '@waline/client/style'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState, type ReactElement } from 'react'

export default function WalineComments(): ReactElement {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  const [loadComments, setLoadComments] = useState<boolean>(false)

  const handleLoadComments = useCallback(() => {
    setLoadComments(true)
  }, [])

  useEffect(() => {
    if (loadComments) {
      init({
        el: '#waline',
        lang: locale,
        reaction: true,
        serverURL: siteMetadata.walineServer,
        emoji: [
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
          'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus',
        ],
        requiredMeta: ['nick'],
      })
    }
  }, [loadComments, locale])

  return (
    <>
      {!loadComments && (
        <button
          className="bg-primary-500 mb-6 rounded p-2 text-white hover:opacity-80 dark:hover:opacity-80"
          onClick={handleLoadComments}
        >
          {t('comment')}
        </button>
      )}
      {loadComments ? <div className="mt-6 mb-6" id="waline" /> : null}
    </>
  )
}
