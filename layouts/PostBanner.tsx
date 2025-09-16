import Comments from '@/components/comments/Comments'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import Image from '@/components/mdxcomponents/Image'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/scroll'
import SectionContainer from '@/components/SectionContainer'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import Sidetoc from '@/components/sidetoc'
import siteMetadata from '@/data/siteMetadata'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import type { Blog } from 'contentlayer/generated'
import type { Toc } from 'pliny/mdx-plugins'
import Bleed from 'pliny/ui/Bleed'
import type { CoreContent } from 'pliny/utils/contentlayer'
import React, { type ReactNode } from 'react'

interface PostBannerProps {
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

export default function PostMinimal({
  content,
  next,
  prev,
  children,
  params: { locale },
}: PostBannerProps): React.JSX.Element {
  const { slug, title, images, series, toc } = content
  const tableOfContents: Toc = toc as unknown as Toc
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <>
      <ScrollTopAndComment />
      <Sidetoc toc={tableOfContents} />
      <SectionContainer>
        <article>
          <div>
            <div className="space-y-1 pb-10 text-center dark:border-gray-700">
              <div className="w-full">
                <Bleed>
                  <div className="relative aspect-[2/1] w-full">
                    <Image src={displayImage} alt={title} fill className="object-cover" />
                  </div>
                </Bleed>
              </div>
              <div className="relative pt-10">
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
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
            <div className="prose dark:prose-invert max-w-none py-4">{children}</div>
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
        </article>
      </SectionContainer>
    </>
  )
}
