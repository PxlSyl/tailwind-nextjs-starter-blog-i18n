'use client'

import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import type { TocItem as OriginalTocItem, Toc } from 'pliny/mdx-plugins/remark-toc-headings'
import TOCInline from 'pliny/ui/TOCInline'
import React from 'react'
import useSidebarStore from './store'

interface TocBodyProps {
  toc: Toc
}

interface TocItem extends OriginalTocItem {
  children?: TocItem[]
}

const filterToc = (toc: TocItem[]): TocItem[] => {
  return toc.map((item) => {
    const modifiedValue = item.url.replace(/-\d+$/, '')

    return {
      ...item,
      url: modifiedValue,
    }
  })
}

const TocBody = ({ toc }: TocBodyProps): React.JSX.Element | null => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { sidebarOpen } = useSidebarStore()

  if (!sidebarOpen) {
    return null
  }

  const filteredToc = filterToc(toc as TocItem[])

  return (
    <div className="fixed top-0 left-0 z-50 h-screen md:flex">
      <div className="sticky top-0 left-0 z-50 flex h-screen w-64 flex-col overflow-y-auto bg-gray-100 px-2 py-4 dark:bg-gray-800">
        <div className="mt-20 mb-20">
          <div className="text-heading-400 text-xl font-bold">{t('sidetoc')}</div>
          <div className="my-auto mt-5 overflow-y-auto">
            <TOCInline
              toc={filteredToc}
              ulClassName="space-y-2 overflow-y-auto my-auto text-primary-500"
              liClassName="pl-3 hover:text-heading-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TocBody
