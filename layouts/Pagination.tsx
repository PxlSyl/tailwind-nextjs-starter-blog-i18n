import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  params: { locale: LocaleTypes }
}
export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  params: { locale },
}: PaginationProps) {
  const { t } = useTranslation(locale, 'home')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  const handlePrevPage = () => {
    if (prevPage) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (nextPage) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('prevp')}
          </button>
        )}
        {prevPage && <button onClick={handlePrevPage}> {t('prevp')}</button>}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('nextp')}
          </button>
        )}
        {nextPage && <button onClick={handleNextPage}>{t('nextp')}</button>}
      </nav>
    </div>
  )
}
