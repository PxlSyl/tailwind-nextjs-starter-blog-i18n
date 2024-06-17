import { useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useTheme } from '@/components/theme/ThemeContext'
import { useTagStore } from '@/components/util/useTagStore'
import { useContactForm } from '@/components/formspree/useContactForm'
import { useRegisterActions } from 'kbar'
import siteMetadata from '@/data/siteMetadata'
import EmailForm from './Emailform'
import Settings from './Settings'
import Button from './Button'
import CopyButton from './CopyButton'
import RenderResults from './RenderResults'
import { KBarPortal, KBarAnimator, KBarPositioner, KBarSearch } from 'kbar'
import { Toaster } from 'react-hot-toast'
import { SearchIcon, MailIcon, SettingsIcon } from '../icons'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'

interface KBarModalProps {
  actions: any
  isLoading: boolean
}

export const KBarModal: React.FC<KBarModalProps> = ({ actions, isLoading }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)

  useRegisterActions(actions, [actions])

  const {
    state,
    handleSubmit,
    name,
    email,
    message,
    handleNameChange,
    handleEmailChange,
    handleMessageChange,
  } = useContactForm()

  const { setTheme, mounted } = useTheme()
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showCopied, setShowCopied] = useState<boolean>(false)

  const toggleShowEmail = () => {
    if (siteMetadata.formspree) {
      setShowEmailForm(!showEmailForm)
    } else {
      window.location.href = `mailto:${siteMetadata.email}`
    }
  }

  const toggleSettings = () => setShowSettings(!showSettings)

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 1000)
  }

  const handleLocaleChange = (newLocale: string) => {
    const segments = pathname.split('/')
    const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleTypes))
    if (localeIndex !== -1) {
      segments[localeIndex] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    return segments.join('/')
  }

  const handleLinkClick = (newLocale: string) => {
    setSelectedTag('')
    const resolvedUrl = handleLocaleChange(newLocale)
    router.push(resolvedUrl)
  }

  const handleThemeChange = (newTheme: string) => setTheme(newTheme)

  if (!mounted) return null

  return (
    <>
      <KBarPortal>
        <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
          <KBarAnimator className="w-full max-w-xl">
            <div
              style={{ zIndex: '100' }}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-[#1c1c1c]"
            >
              <div className="flex items-center space-x-4 p-4">
                <span className="block w-5">
                  <SearchIcon className="text-gray-400 dark:text-gray-300" />
                </span>
                {showEmailForm || showSettings ? (
                  <div className="h-8 w-full bg-transparent" />
                ) : (
                  <KBarSearch
                    defaultPlaceholder={t('kbarplaceholder')}
                    className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500"
                  />
                )}
                <kbd className="inline-block whitespace-nowrap rounded border border-gray-400 px-1.5 align-middle text-xs font-medium leading-4 tracking-wide text-gray-400">
                  ESC
                </kbd>
              </div>
              <div className="mb-1 ml-2 flex items-center space-x-2">
                {!showSettings && (
                  <Button
                    onClick={toggleShowEmail}
                    show={showEmailForm}
                    icon={<MailIcon />}
                    label={t('contact')}
                    backLabel={t('back')}
                  />
                )}
                {!showEmailForm && (
                  <Button
                    onClick={toggleSettings}
                    show={showSettings}
                    icon={<SettingsIcon />}
                    label={t('settings')}
                    backLabel={t('back')}
                  />
                )}
                <CopyButton
                  show={showEmailForm || showSettings}
                  copyUrl={copyUrl}
                  showCopied={showCopied}
                  t={t}
                />
              </div>
              {showEmailForm && (
                <EmailForm
                  state={state}
                  handleSubmit={handleSubmit}
                  name={name}
                  email={email}
                  message={message}
                  handleNameChange={handleNameChange}
                  handleEmailChange={handleEmailChange}
                  handleMessageChange={handleMessageChange}
                  t={t}
                />
              )}
              {showSettings && (
                <Settings
                  t={t}
                  handleThemeChange={handleThemeChange}
                  handleLinkClick={handleLinkClick}
                />
              )}
              {!isLoading && !showEmailForm && !showSettings && <RenderResults />}
              {isLoading && (
                <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
                  {t('loading')}
                </div>
              )}
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <Toaster />
    </>
  )
}
