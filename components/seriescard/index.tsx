'use client'

import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { JSX } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './seriesCard'

interface SeriesPost {
  slug: string
  title: string
  isCurrent: boolean
}

interface SeriesData {
  title: string
  posts: SeriesPost[]
}

export type PostSeriesProps = {
  data: SeriesData
}

export const PostSeriesBox = ({ data }: PostSeriesProps): JSX.Element => {
  const currentIndex = data.posts.findIndex((post: SeriesPost) => post.isCurrent) + 1
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {t('series')} {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {t('episodes')} ({currentIndex}/{data.posts.length})
        <ul>
          {data.posts.map((p) => (
            <li
              key={p.slug}
              className={`relative my-3 list-none pl-7 text-sm before:absolute before:top-[9px] before:left-1 before:h-1.5 before:w-1.5 before:rounded-full ${
                p.isCurrent
                  ? 'before:bg-accent-foreground/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10'
                  : 'hover:before:bg-accent-foreground/90 before:bg-primary-500/30 hover:before:ring-primary-500 dark:hover:before:ring-primary-500 font-bold hover:before:ring-[3px] hover:before:ring-offset-1 hover:before:ring-offset-black/10'
              }`}
            >
              {p.isCurrent ? (
                <span>{p.title}</span>
              ) : (
                <Link
                  className="hover:text-primary-500 dark:hover:text-primary-500 transition-colors duration-200 ease-in-out"
                  href={`/${locale}/blog/${p.slug}`}
                >
                  {p.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
