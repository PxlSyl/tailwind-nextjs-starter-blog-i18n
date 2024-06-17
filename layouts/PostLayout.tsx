import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/comments/Comments'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/mdxcomponents/Image'
import Tag from '@/components/tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/scroll'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import { Toc } from 'pliny/mdx-plugins'
import Sidetoc from '@/components/sidetoc'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  params: { locale },
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, language, series, toc } = content
  const basePath = path.split('/')[0]
  const { t } = await createTranslation(locale, 'home')
  const tableOfContents: Toc = toc as unknown as Toc
  return (
    <>
      <ScrollTopAndComment />
      <Sidetoc toc={tableOfContents} />
      <SectionContainer>
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">{t('pub')}</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(language, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
              <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">{t('authors')}</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Link href={`/${locale}/about/${author.slug}`}>
                            <Image
                              src={author.avatar}
                              width={38}
                              height={38}
                              alt="avatar"
                              title="avatar"
                              className="h-10 w-10 rounded-full"
                            />
                          </Link>
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">{t('name')}</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter.replace('https://twitter.com/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                {series && (
                  <div className="not-prose mt-4">
                    <PostSeriesBox data={series} />
                  </div>
                )}
                <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
                <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                  <Link href={discussUrl(path)} rel="nofollow">
                    {t('twitter')}
                  </Link>
                  {` • `}
                  <Link href={editUrl(filePath)}>{t('github')}</Link>
                </div>
                <Share title={title} slug={slug} />
                <div
                  className="mt-10 pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  {siteMetadata.iswaline === true && <WalineComments />}
                  {siteMetadata.comments && siteMetadata.iscomments === true && (
                    <Comments slug={slug} />
                  )}
                </div>
              </div>
              <footer>
                <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                  {tags && (
                    <div className="py-4 xl:py-8">
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Tags
                      </p>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      {prev && prev.slug && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {t('preva')}
                          </p>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/${locale}/blog/${prev.slug}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && next.slug && (
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            {t('nexta')}
                          </p>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/${locale}/blog/${next.slug}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${locale}/${basePath}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label="Back to the blog"
                  >
                    &larr;{t('back')}
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
