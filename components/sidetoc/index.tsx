'use client'

import { useState } from 'react'
import TOCInline from 'pliny/ui/TOCInline'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'

const Sidetoc = ({ toc }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-screen">
        <div
          className={`flex w-16 flex-col items-center justify-between bg-gray-100 px-2 py-4 text-transparent opacity-0 transition-all duration-300 ease-in-out dark:bg-gray-800 ${sidebarOpen ? 'w-64 opacity-100' : ''}`}
        >
          <div className="mt-20">
            <div className={`${sidebarOpen ? 'text-xl font-bold text-heading-400' : ''}`}>
              {t('sidetoc')}
            </div>
            <div
              className={`${sidebarOpen ? 'my-auto mt-5 overflow-y-auto text-black dark:text-white' : ''}`}
            >
              <TOCInline toc={toc} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 left-6 z-50">
        <button
          onClick={handleClick}
          className="rounded-full bg-gray-200 p-2 text-gray-500 opacity-100 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <ArrowRightIcon
            className={`h-6 w-6 transform transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </>
  )
}

export default Sidetoc

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
