import siteMetadata from './siteMetadata'

type Metadata = {
  [locale: string]: string
}

export const title: Metadata = {
  en: siteMetadata.titleEn,
  fr: siteMetadata.titleFr,
}

export const description: Metadata = {
  en: siteMetadata.descriptionEn,
  fr: siteMetadata.descriptionFr,
}
