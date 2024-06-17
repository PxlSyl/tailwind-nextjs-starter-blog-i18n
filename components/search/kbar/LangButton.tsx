interface LangButtonProps {
  t: (key: string) => string
  handleLinkClick: (locale: string) => void
  locale: string
  lang: string
}

const LangButton: React.FC<LangButtonProps> = ({ t, handleLinkClick, locale, lang }) => (
  <button
    className="group flex flex-row items-center py-2 hover:bg-primary-600 hover:text-white"
    onClick={() => handleLinkClick(locale)}
  >
    <span className="ml-4 mr-2 w-8 rounded-md bg-black px-1 text-white group-hover:bg-white group-hover:text-primary-500 dark:bg-white dark:text-black">
      {locale}
    </span>
    <div>{t(lang)}</div>
  </button>
)

export default LangButton
