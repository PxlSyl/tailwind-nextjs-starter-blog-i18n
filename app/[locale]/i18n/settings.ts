import type { InitOptions } from 'i18next'

export const fallbackLng = 'en'
export const locales = [fallbackLng, 'fr'] as const
export type LocaleTypes = (typeof locales)[number]
export const defaultNS = 'common'
export const cookieName = 'i18next'

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
