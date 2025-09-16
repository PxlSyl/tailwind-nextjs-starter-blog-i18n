import { CopyToClipboard } from '../icons'

interface CopyButtonProps {
  show: boolean
  copyUrl: () => void
  showCopied: boolean
  t: (key: string) => string
}

const CopyButton: React.FC<CopyButtonProps> = ({ show, copyUrl, showCopied, t }) => (
  <div className="relative inline-block">
    {!show && (
      <button
        className="ring-opacity-5 hover:text-primary-500 dark:hover:text-primary-500 flex cursor-pointer flex-row items-center justify-center rounded-md bg-white px-2 py-1 text-gray-700 shadow-lg ring-1 ring-black hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
        onClick={copyUrl}
      >
        <span className="mr-2">
          <CopyToClipboard />
        </span>
        <div className="sm:hidden">Url</div>
        <div className="hidden sm:block">{t('copyurl')}</div>
      </button>
    )}
    {showCopied ? (
      <div className="ring-opacity-5 absolute top-10 right-0 z-50 rounded-md bg-white p-2 text-center shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-800">
        <p className="text-primary-500 dark:text-primary-400">{t('urlcopied')}</p>
      </div>
    ) : null}
  </div>
)

export default CopyButton
