import { maindescription, maintitle } from '@/data/localeMetadata'
import siteMetadata from '@/data/siteMetadata'
import type { Metadata } from 'next'
import type { LocaleTypes } from './i18n/settings'

interface PageSEOProps {
  title: string
  description?: string
  image?: string

  params: { locale: LocaleTypes }
  [key: string]: unknown
}

export function genPageMetadata({
  title,
  description,
  image,
  params: { locale },
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description: description || maindescription[locale],
    openGraph: {
      title: `${title} | ${maintitle[locale]}`,
      description: description || maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: image ? [image] : [siteMetadata.socialBanner],
      locale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${maintitle[locale]}`,
      description: description ? description : maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
