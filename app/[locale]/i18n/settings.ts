import type { InitOptions } from 'i18next'

export const fallbackLng = 'en'
export const secondLng = 'fr'
// define other languages here. Example :
// export const thirdLng= 'es' and then add it to "locales" object
export const locales = [fallbackLng, secondLng] as const
export type LocaleTypes = (typeof locales)[number]
export const defaultNS = 'common'

export function getOptions(locale = fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug: true,
    supportedLngs: locales,
    fallbackLng,
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
