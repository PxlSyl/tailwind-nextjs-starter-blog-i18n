'use client'

import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { Comments as CommentsComponent } from 'pliny/comments'
import { useCallback, useState, type ReactElement } from 'react'

type CommentsProps = {
  slug: string
}

export default function Comments({ slug }: CommentsProps): ReactElement {
  const [loadComments, setLoadComments] = useState(false)

  const handleLoadComments = useCallback(() => {
    setLoadComments(true)
  }, [])
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  return (
    <>
      {!loadComments && <button onClick={handleLoadComments}> {t('comment')}</button>}
      {siteMetadata.comments && loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : null}
    </>
  )
}
