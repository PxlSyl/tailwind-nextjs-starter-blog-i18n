import { KBarResults, useMatches } from 'kbar'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import ResultItem from './ResultItem'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

const RenderResults = () => {
  const { results } = useMatches()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')

  return results.length ? (
    <KBarResults
      items={results}
      onRender={({ item, active }) => (
        <div>
          {typeof item === 'string' ? (
            <div className="pt-3">
              <div className="block border-t border-gray-100 px-4 pb-2 pt-6 text-xs font-semibold uppercase text-primary-600 dark:border-gray-800">
                {item}
              </div>
            </div>
          ) : (
            <ResultItem item={item} active={active} />
          )}
        </div>
      )}
    />
  ) : (
    <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
      {t('noresults')}
    </div>
  )
}

export default RenderResults
