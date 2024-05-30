'use client'

import { useEffect, useState } from 'react'
import TOCInline from 'pliny/ui/TOCInline'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import useSidebarStore from './store'
import { Toc } from 'pliny/mdx-plugins'

interface TocBodyProps {
  toc: Toc
}

const TocBody = ({ toc }: TocBodyProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { sidebarOpen} = useSidebarStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || sidebarOpen === false) {
    return null
  }

  return (
      <div className="fixed left-0 top-0 z-50 hidden h-screen md:flex">
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-gray-100 px-2 py-4 dark:bg-gray-800`}
        >
          <div className="mt-20">
            <div className="text-xl font-bold text-heading-400">{t('sidetoc')}</div>
            <div className="my-auto mt-5 overflow-y-auto text-black dark:text-white">
              <TOCInline
                toc={toc}
                ulClassName="space-y-2 overflow-y-auto my-auto text-primary-500"
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default TocBody
