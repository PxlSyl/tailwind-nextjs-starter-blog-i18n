import siteMetadata from './siteMetadata'

type Metadata = {
  [locale: string]: string
}

export const maintitle: Metadata = {
  en: siteMetadata.titleEn,
  fr: siteMetadata.titleFr,
}

export const maindescription: Metadata = {
  en: siteMetadata.descriptionEn,
  fr: siteMetadata.descriptionFr,
}
