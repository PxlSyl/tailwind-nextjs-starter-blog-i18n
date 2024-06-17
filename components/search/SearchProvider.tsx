'use client'

import { ReactNode } from 'react'
import { KBarSearchProvider } from './kbar'
import { useParams, useRouter } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import { Authors, allAuthors } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { fallbackLng } from 'app/[locale]/i18n/locales'
import { HomeIcon, BlogIcon, TagsIcon, ProjectsIcon, AboutIcon } from './icons'

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const router = useRouter()
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const authorSearchItems = authors.map((author) => {
    const { name, slug } = author
    return {
      id: slug,
      name: name,
      keywords: '',
      shortcut: [],
      section: locale === fallbackLng ? 'Authors' : 'Auteurs',
      perform: () => router.push(`/${locale}/about/${slug}`),
      icon: (
        <i>
          <AboutIcon />
        </i>
      ),
    }
  })

  const showAuthorsSearch = siteMetadata.multiauthors
  const authorsActions = [
    ...(showAuthorsSearch ? authorSearchItems : []),
    ...(showAuthorsSearch
      ? []
      : [
          {
            id: 'about',
            name: locale === fallbackLng ? 'About' : 'À propos',
            keywords: '',
            shortcut: ['a'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
            perform: () => router.push(`/${locale}/about`),
            icon: (
              <i>
                <AboutIcon />
              </i>
            ),
          },
        ]),
  ]
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
            icon: (
              <i>
                <HomeIcon />
              </i>
            ),
          },
          {
            id: 'blog',
            name: locale === fallbackLng ? 'Blog' : 'Blog',
            keywords: '',
            shortcut: ['b'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/blog`),
            icon: (
              <i>
                <BlogIcon />
              </i>
            ),
          },
          {
            id: 'tags',
            name: locale === fallbackLng ? 'Tags' : 'Tags',
            keywords: '',
            shortcut: ['t'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/tags`),
            icon: (
              <i>
                <TagsIcon />
              </i>
            ),
          },
          {
            id: 'projects',
            name: locale === fallbackLng ? 'Projects' : 'Projets',
            keywords: '',
            shortcut: ['p'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/projects`),
            icon: (
              <i>
                <ProjectsIcon />
              </i>
            ),
          },
          ...authorsActions,
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
              perform: () => router.push(`/${locale}/blog/${post.slug}`),
            }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
