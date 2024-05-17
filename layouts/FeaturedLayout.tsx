import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
  featured?: boolean
}

interface HomeProps {
  posts: Post[]
  params: { locale: LocaleTypes }
}

const MAX_DISPLAY = 2

export default async function FeaturedLayout({ posts, params: { locale } }: HomeProps) {
  const { t } = await createTranslation(locale, 'home')
  return (
    <>
      <div className="divide-y divide-gray-200 border-b border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-heading-400 dark:text-heading-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('featured')}
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && t('noposts')}
          {posts
            .filter((p) => p.language === locale && p.featured === true)
            .slice(0, MAX_DISPLAY)
            .map((post) => {
              const { slug, date, title, summary, tags, language } = post
              if (language === locale) {
                return (
                  <li key={slug} className="py-12">
                    <article>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">{t('pub')}</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, locale)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/${locale}/blog/${slug}`}
                                  className="text-gray-900 dark:text-gray-100"
                                >
                                  {title}
                                </Link>
                              </h2>
                              <ul className="flex flex-wrap">
                                {tags.map((tag: string) => (
                                  <li key={tag} className="my-1">
                                    <Tag text={tag} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                            </div>
                          </div>
                          <div className="text-base font-medium leading-6">
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
              }
            })}
        </ul>
      </div>
    </>
  )
}
