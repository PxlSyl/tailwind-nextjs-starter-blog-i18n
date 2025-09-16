import siteMetadata from '@/data/siteMetadata'
import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import type { JSX } from 'react'
import { SearchIcon } from './icons'
import { KBarButton } from './KBarButton'

const SearchButton = (): JSX.Element | null => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper aria-label="Search">
        <SearchIcon className="h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-100" />
      </SearchButtonWrapper>
    )
  }

  return null
}

export default SearchButton
