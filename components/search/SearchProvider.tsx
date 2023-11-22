'use client'
// use this component in layout.tsx to customize kbar search
import { ReactNode } from 'react'
import { KBarSearchProvider } from './components/KBar'
import { useParams, useRouter } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

interface Props {
  children: ReactNode
}

export const SearchProvider = ({ children }: Props) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const router = useRouter()

  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        // uncomment and complete this if you want to use in your app
        /* defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: '',
            shortcut: ['h'],
            section: t('home'),
            perform: () => router.push(`/`),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: '',
            shortcut: ['p'],
            section: t('projects'),
            perform: () => router.push(`/projects`),
          },
        ], */
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
