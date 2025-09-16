'use client'

import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { useTagStore } from '../util/useTagStore'

interface Props {
  text: string
}

const Tag = ({ text }: Props): React.JSX.Element => {
  const locale = useParams()?.locale as LocaleTypes
  const { setSelectedTag } = useTagStore()

  const handleClick = useCallback(() => {
    setSelectedTag(text)
  }, [text, setSelectedTag])

  return (
    <Link
      href={`/${locale}/blog`}
      onClick={handleClick}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 cursor-pointer text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
