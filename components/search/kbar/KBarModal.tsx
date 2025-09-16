import { useContactForm } from '@/components/formspree/useContactForm'
import { Theme, useTheme } from '@/components/theme/ThemeContext'
import { useTagStore } from '@/components/util/useTagStore'
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import { locales, type LocaleTypes } from 'app/[locale]/i18n/settings'
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  useKBar,
  useRegisterActions,
  type Action,
} from 'kbar'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { MailIcon, SearchIcon, SettingsIcon } from '../icons'
import Button from './Button'
import CopyButton from './CopyButton'
import EmailForm from './Emailform'
import RenderResults from './RenderResults'
import Settings from './Settings'

interface KBarModalProps {
  actions: Action[]
  isLoading: boolean
}

export const KBarModal: React.FC<KBarModalProps> = ({ actions, isLoading }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const { query } = useKBar()

  useRegisterActions(actions, [actions])

  useEffect(() => {
    const inputElement = document.querySelector('[data-kbar-search]') as HTMLInputElement
    if (inputElement) {
      query.inputRefSetter(inputElement)
    }
  }, [query])

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

  const handleThemeChange = (newTheme: string) => {
    switch (newTheme) {
      case 'light':
        setTheme(Theme.LIGHT)
        break
      case 'dark':
        setTheme(Theme.DARK)
        break
      case 'system':
        setTheme(Theme.SYSTEM)
        break
      default:
        setTheme(Theme.SYSTEM)
    }
  }

  const handleEmailButtonClick = useCallback(() => toggleShowEmail(), [])
  const handleSettingsButtonClick = useCallback(() => toggleSettings(), [])

  // Handle back button clicks
  const handleBackFromEmail = useCallback(() => setShowEmailForm(false), [])
  const handleBackFromSettings = useCallback(() => setShowSettings(false), [])
  const handleCopyButtonClick = useCallback(() => copyUrl(), [])
  const handleSettingsThemeChange = useCallback(
    (newTheme: string) => handleThemeChange(newTheme),
    []
  )
  const handleSettingsLinkClick = useCallback((newLocale: string) => handleLinkClick(newLocale), [])

  const mailIcon = <MailIcon />
  const settingsIcon = <SettingsIcon />

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
                    data-kbar-search
                    defaultPlaceholder={t('kbarplaceholder')}
                    className="h-8 w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500"
                  />
                )}
                <kbd className="inline-block rounded border border-gray-400 px-1.5 align-middle text-xs leading-4 font-medium tracking-wide whitespace-nowrap text-gray-400">
                  ESC
                </kbd>
              </div>
              <div className="mb-1 ml-2 flex items-center space-x-2">
                {!showSettings && (
                  <Button
                    onClick={showEmailForm ? handleBackFromEmail : handleEmailButtonClick}
                    show={showEmailForm}
                    icon={mailIcon}
                    label={t('contact')}
                    backLabel={t('back')}
                  />
                )}
                {!showEmailForm && (
                  <Button
                    onClick={showSettings ? handleBackFromSettings : handleSettingsButtonClick}
                    show={showSettings}
                    icon={settingsIcon}
                    label={t('settings')}
                    backLabel={t('back')}
                  />
                )}
                <CopyButton
                  show={showEmailForm || showSettings}
                  copyUrl={handleCopyButtonClick}
                  showCopied={showCopied}
                  t={t}
                />
              </div>
              {showEmailForm ? (
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
              ) : null}
              {showSettings ? (
                <Settings
                  t={t}
                  handleThemeChange={handleSettingsThemeChange}
                  handleLinkClick={handleSettingsLinkClick}
                />
              ) : null}
              {!isLoading && !showEmailForm && !showSettings && <RenderResults />}
              {isLoading ? (
                <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
                  {t('loading')}
                </div>
              ) : null}
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <Toaster />
    </>
  )
}
