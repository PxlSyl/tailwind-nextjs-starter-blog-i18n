import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import Comments from '@/components/comments/Comments'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/scroll'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import { Toc } from 'pliny/mdx-plugins'
import Sidetoc from '@/components/sidetoc'

interface PostSimpleProps {
  content: CoreContent<Blog>
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
}: PostSimpleProps) {
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
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, language)}</time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                {series && (
                  <div className="not-prose mt-4">
                    <PostSeriesBox data={series} />
                  </div>
                )}
                <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              </div>
              <Share title={title} slug={slug} />
              <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                {siteMetadata.iswaline === true && <WalineComments />}
                {siteMetadata.comments && siteMetadata.iscomments === true && (
                  <Comments slug={slug} />
                )}
              </div>
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.slug && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${locale}/blog/${prev.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.slug && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${locale}/blog/${next.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Next post: ${next.title}`}
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
