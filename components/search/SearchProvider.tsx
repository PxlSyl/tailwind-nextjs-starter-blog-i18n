'use client'
// use this component in layout.tsx to customize kbar search
import { ReactNode } from 'react'
import { KBarSearchProvider } from './components/KBar'
import { useParams, useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { fallbackLng } from 'app/[locale]/i18n/locales'

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const router = useRouter()
  /* issue when using regular translations, this is a workaround to show how to implement section titles */
  const navigationSection = locale === fallbackLng ? 'Navigate' : 'Naviguer'
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        /* issue when using regular translations, this is a workaround to show how to implement translated menu titles */
        defaultActions: [
          {
            id: 'home',
            name: locale === fallbackLng ? 'Home' : 'Accueil',
            keywords: '',
            shortcut: ['h'],
            section: navigationSection,
            perform: () => router.push(`/${locale}`),
          },
          {
            id: 'blog',
            name: locale === fallbackLng ? 'Blog' : 'Blog',
            keywords: '',
            shortcut: ['b'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/blog`),
          },
          {
            id: 'tags',
            name: locale === fallbackLng ? 'Tags' : 'Tags',
            keywords: '',
            shortcut: ['t'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/tags`),
          },
          {
            id: 'projects',
            name: locale === fallbackLng ? 'Projects' : 'Projets',
            keywords: '',
            shortcut: ['p'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/projects`),
          },
          {
            id: 'about',
            name: locale === fallbackLng ? 'About' : 'À propos',
            keywords: '',
            shortcut: ['a'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/about`),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json
            .filter((post: CoreContent<Blog>) => post.language === locale)
            .map((post: CoreContent<Blog>) => ({
              id: post.path,
              name: post.title,
              keywords: post?.summary || '',
              section: t('content'),
              subtitle: post.tags.join(', '),
              perform: () => router.push(`/${locale}/${post.path}`),
            }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
