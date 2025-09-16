import Comments from '@/components/comments/Comments'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/scroll'
import SectionContainer from '@/components/SectionContainer'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import Sidetoc from '@/components/sidetoc'
import siteMetadata from '@/data/siteMetadata'
import { createTranslation } from 'app/[locale]/i18n/server'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import type { Blog } from 'contentlayer/generated'
import type { Toc } from 'pliny/mdx-plugins'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import React, { type ReactNode } from 'react'

interface PostSimpleProps {
  content: CoreContent<Blog> & {
    series?: {
      title: string
      order: number
      posts?: Array<{
        title: string
        slug: string
        language: string
        isCurrent: boolean
      }>
    }
  }
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  next,
  prev,
  children,
  params: { locale },
}: PostSimpleProps): Promise<React.JSX.Element> {
  const { slug, date, title, language, series, toc } = content
  const tableOfContents: Toc = toc as unknown as Toc
  const { t } = await createTranslation(locale, 'home')
  return (
    <>
      <ScrollTopAndComment />
      <Sidetoc toc={tableOfContents} />
      <SectionContainer>
        <article>
          <div>
            <header>
              <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
                <dl>
                  <div>
                    <dt className="sr-only">{t('pub')}</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, language)}</time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 dark:divide-gray-700">
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                {series && series.posts ? (
                  <div className="not-prose mt-4">
                    <PostSeriesBox
                      data={
                        series as {
                          title: string
                          posts: Array<{
                            title: string
                            slug: string
                            language: string
                            isCurrent: boolean
                          }>
                        }
                      }
                    />
                  </div>
                ) : null}
                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              </div>
              <Share title={title} slug={slug} />
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                {siteMetadata.iswaline === true && <WalineComments />}
                {siteMetadata.comments && siteMetadata.iscomments === true ? (
                  <Comments slug={slug} />
                ) : null}
              </div>
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.slug ? (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${locale}/blog/${prev.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  ) : null}
                  {next && next.slug ? (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${locale}/blog/${next.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Next post: ${next.title}`}
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  ) : null}
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
