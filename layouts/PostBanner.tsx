import { ReactNode } from 'react'
import Image from '@/components/mdxcomponents/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/comments/Comments'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/scroll'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { Toc } from 'pliny/mdx-plugins'
import Sidetoc from '@/components/sidetoc'

interface PostBannerProps {
  content: CoreContent<Blog>
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
}: PostBannerProps) {
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
            {series && (
              <div className="not-prose mt-4">
                <PostSeriesBox data={series} />
              </div>
            )}
            <div className="prose max-w-none py-4 dark:prose-invert">{children}</div>
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
        </article>
      </SectionContainer>
    </>
  )
}
