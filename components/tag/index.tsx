'use client'

import { useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTagStore } from '../util/useTagStore'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const locale = useParams()?.locale as LocaleTypes
  const { setSelectedTag } = useTagStore()

  const handleClick = useCallback(() => {
    setSelectedTag(text)
  }, [text, setSelectedTag])

  return (
    <Link
      href={`/${locale}/blog`}
      onClick={handleClick}
      className="mr-3 cursor-pointer text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
