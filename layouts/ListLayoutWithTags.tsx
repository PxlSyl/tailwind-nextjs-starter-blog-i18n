'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import tagData from 'app/[locale]/tag-data.json'
import { fallbackLng } from 'app/[locale]/i18n/locales'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -25, y: 0 },
  show: { opacity: 1, x: 0, y: 0 },
}

function Pagination({ totalPages, currentPage, params: { locale } }: PaginationProps) {
  const { t } = useTranslation(locale, 'home')
  const pathname = usePathname()
  const basePath =
    locale === fallbackLng ? pathname.split('/')[1] : pathname.split('/').slice(1, 3).join('/')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('prevp')}
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            {t('prevp')}
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('nextp')}
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            {t('nextp')}
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  params: { locale },
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const { t } = useTranslation(locale, 'home')
  const pathname = usePathname()

  const tagCountMap = tagData[locale] // Get tag counts based on locale

  const filteredTags = Object.keys(tagCountMap).map((postTag) => {
    return (
      <li key={postTag} className="my-3">
        {pathname.split('/tags/')[1] === slug(postTag) ? (
          <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
            {postTag} ({tagCountMap[postTag]})
          </h3>
        ) : (
          <Link
            href={`/${locale}/tags/${slug(postTag)}`}
            className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
            aria-labelledby={`${t('poststagged')} ${postTag}`}
          >
            {postTag} ({tagCountMap[postTag]})
          </Link>
        )}
      </li>
    )
  })

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith(`/${locale}/blog`) || pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">{t('all')}</h3>
              ) : (
                <Link
                  href={`/${locale}/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                  aria-labelledby={t('all')}
                >
                  {t('all')}
                </Link>
              )}
              <ul>{filteredTags}</ul>
            </div>
          </div>
          <div>
            <motion.ul variants={container} initial="hidden" animate="show">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, language } = post
                if (language === locale) {
                  return (
                    <motion.li variants={item} key={path} className="py-5">
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        <dl>
                          <dt className="sr-only">{t('pub')}</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, language)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/${locale}/${path}`}
                                className="text-gray-900 dark:text-gray-100"
                                aria-labelledby={title}
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags?.map((tag) => (
                                <Tag key={tag} text={tag} params={{ locale: locale }} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                          </div>
                        </div>
                      </article>
                    </motion.li>
                  )
                }
              })}
            </motion.ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                params={{ locale: locale }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
