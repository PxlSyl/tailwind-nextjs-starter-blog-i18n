import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { KBarResults, useMatches, type Action } from 'kbar'
import { useParams } from 'next/navigation'
import { useCallback, type JSX } from 'react'
import ResultItem from './ResultItem'

const RenderResults = (): JSX.Element => {
  const { results } = useMatches()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')

  const renderItem = useCallback(
    ({ item, active }: { item: string | Action; active: boolean }) => (
      <div>
        {typeof item === 'string' ? (
          <div className="pt-3">
            <div className="text-primary-600 block border-t border-gray-100 px-4 pt-6 pb-2 text-xs font-semibold uppercase dark:border-gray-800">
              {item}
            </div>
          </div>
        ) : (
          <ResultItem item={item} active={active} />
        )}
      </div>
    ),
    []
  )

  return results.length ? (
    <KBarResults items={results} onRender={renderItem} />
  ) : (
    <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
      {t('noresults')}
    </div>
  )
}

export default RenderResults
