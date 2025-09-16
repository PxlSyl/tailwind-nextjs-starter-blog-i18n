import { useCallback, type JSX } from 'react'

interface LangButtonProps {
  t: (key: string) => string
  handleLinkClick: (locale: string) => void
  locale: string
  lang: string
}

const LangButton: React.FC<LangButtonProps> = ({
  t,
  handleLinkClick,
  locale,
  lang,
}): JSX.Element => {
  const handleClick = useCallback(() => {
    handleLinkClick(locale)
  }, [handleLinkClick, locale])

  return (
    <button
      className="group hover:bg-primary-600 flex cursor-pointer flex-row items-center py-2 hover:text-white"
      onClick={handleClick}
    >
      <span className="group-hover:text-primary-500 mr-2 ml-4 w-8 rounded-md bg-black px-1 text-white group-hover:bg-white dark:bg-white dark:text-black">
        {locale}
      </span>
      <div>{t(lang)}</div>
    </button>
  )
}

export default LangButton
