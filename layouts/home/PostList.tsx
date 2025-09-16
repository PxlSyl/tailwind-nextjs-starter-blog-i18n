import Link from '@/components/mdxcomponents/Link'
import Tag from '@/components/tag'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { formatDate } from 'pliny/utils/formatDate'
import React from 'react'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
}

interface PostListProps {
  posts: Post[]
  locale: LocaleTypes
  t: (key: string) => string
  maxDisplay: number
}

const PostList: React.FC<PostListProps> = ({ posts, locale, t, maxDisplay }) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {!posts.length && <li>{t('noposts')}</li>}
      {posts.slice(0, maxDisplay).map((post) => {
        const { slug, date, title, summary, tags } = post
        return (
          <li key={slug} className="py-12">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <dl>
                  <dt className="sr-only">{t('pub')}</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl leading-8 font-bold tracking-tight">
                        <Link
                          href={`/${locale}/blog/${slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>
                      <ul className="flex flex-wrap">
                        {tags.map((tag: string) => (
                          <li key={tag}>
                            <Tag text={tag} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {summary && summary.length > 149
                        ? `${summary.substring(0, 149)}...`
                        : summary}
                    </div>
                  </div>
                  <div className="text-base leading-6 font-medium">
                    <Link
                      href={`/${locale}/blog/${slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`${t('more')}"${title}"`}
                    >
                      {t('more')} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
