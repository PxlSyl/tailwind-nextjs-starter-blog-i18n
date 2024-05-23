'use client'

import siteMetadata from '@/data/siteMetadata'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import {
  KBarPortal,
  KBarSearch,
  KBarAnimator,
  KBarPositioner,
  KBarResults,
  useMatches,
  Action,
  useRegisterActions,
} from 'kbar'
import { useContactForm } from '@/components/formspree/useContactForm'
import { ModalBody } from '@/components/formspree/CBody'
import { MailIcon, BackwardIcon, CopyToClipboard, SettingsIcon } from '../icons'
import { Sun, Moon, Monitor } from '@/components/theme/icons'
import { useState } from 'react'
import { useTheme } from '@/components/theme/ThemeContext'

export const KBarModal = ({ actions, isLoading }: { actions: Action[]; isLoading: boolean }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
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
  const [showCopied, setShowCopied] = useState(false)

  const toggleShowEmail = () => {
    if (siteMetadata.formspree === true) {
      setShowEmailForm(!showEmailForm)
    } else {
      const mailtoLink: string = `mailto:${siteMetadata.email}`
      window.location.href = mailtoLink
    }
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 1000)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  if (!mounted) return null;

  return (
    <KBarPortal>
      <KBarPositioner className="bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50">
        <KBarAnimator className="w-full max-w-xl">
          <div
            style={{ zIndex: '100' }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-[#1c1c1c]"
          >
            <div className="flex items-center space-x-4 p-4">
              <span className="block w-5">
                <svg
                  className="text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
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
                <button
                  className="flex flex-row items-center justify-center rounded-md bg-white px-2 py-1 text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 hover:bg-gray-100 hover:text-primary-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 dark:hover:text-primary-500"
                  onClick={toggleShowEmail}
                >
                  {showEmailForm ? (
                    <>
                      <span className="mr-2">
                        <BackwardIcon />
                      </span>
                      <div>{t('back')}</div>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">
                        <MailIcon />
                      </span>
                      <div>{t('contact')}</div>
                    </>
                  )}
                </button>
              )}
              {!showEmailForm && (
                <button
                  className="flex flex-row items-center justify-center rounded-md bg-white px-2 py-1 text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 hover:bg-gray-100  hover:text-primary-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 dark:hover:text-primary-500"
                  onClick={toggleSettings}
                >
                  {showSettings ? (
                    <>
                      <span className="mr-2">
                        <BackwardIcon />
                      </span>
                      <div>{t('back')}</div>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">
                        <SettingsIcon />
                      </span>
                      <div>Theme</div>
                    </>
                  )}
                </button>
              )}
              <div className="relative inline-block">
                {!showEmailForm && !showSettings && (
                  <button
                    className="flex flex-row items-center justify-center rounded-md bg-white px-2 py-1 text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 hover:bg-gray-100  hover:text-primary-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600 dark:hover:text-primary-500"
                    onClick={copyUrl}
                  >
                    <span className="mr-2">
                      <CopyToClipboard />
                    </span>
                    <div className="sm:hidden">Url</div>
                    <div className="hidden sm:block">{t('copyurl')}</div>
                  </button>
                )}
                {showCopied && (
                  <div className="absolute right-0 top-10 z-50 rounded-md bg-white p-2 text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                    <p className="text-primary-500 dark:text-primary-400">{t('urlcopied')}</p>
                  </div>
                )}
              </div>
            </div>
            {showEmailForm && (
              <div className="mb-20 ml-2 mr-2 mt-20">
                <ModalBody
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
              </div>
            )}
            {showSettings && (
              <div className="mb-20 mt-20 flex flex-col space-y-4">
                <button
                  className="flex flex-row py-2 hover:bg-primary-600 hover:text-white"
                  onClick={() => handleThemeChange('light')}
                >
                  <span className="ml-4 mr-2 hover:text-white">
                    <Sun />
                  </span>
                  <div>Light</div>
                </button>
                <button
                  className="flex flex-row py-2 hover:bg-primary-600 hover:text-white"
                  onClick={() => handleThemeChange('dark')}
                >
                  <span className="ml-4 mr-2 hover:text-white">
                    <Moon />
                  </span>
                  <div>Dark</div>
                </button>
                <button
                  className="flex flex-row py-2 hover:bg-primary-600 hover:text-white"
                  onClick={() => handleThemeChange('system')}
                >
                  <span className="ml-4 mr-2 hover:text-white">
                    <Monitor />
                  </span>
                  <div>System</div>
                </button>
              </div>
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
  )
}

const RenderResults = () => {
  const { results } = useMatches()
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  if (results.length) {
    return (
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
              <div
                className={`flex cursor-pointer justify-between px-4 py-2 ${
                  active
                    ? 'bg-primary-600 text-gray-100'
                    : 'bg-transparent text-gray-700 dark:text-gray-100'
                }`}
              >
                <div className={'flex space-x-2'}>
                  {item.icon && <div className={'mb-1 self-center'}>{item.icon}</div>}
                  <div className="block">
                    {item.subtitle && (
                      <div className={`${active ? 'text-gray-200' : 'text-gray-400'} text-xs`}>
                        {item.subtitle}
                      </div>
                    )}
                    <div>{item.name}</div>
                  </div>
                </div>
                {item.shortcut?.length ? (
                  <div aria-hidden className="flex flex-row items-center justify-center gap-x-2">
                    {item.shortcut.map((sc) => (
                      <kbd
                        key={sc}
                        className={`flex h-7 w-6 items-center justify-center rounded border text-xs font-medium ${
                          active ? 'border-gray-200 text-gray-200' : 'border-gray-400 text-gray-400'
                        }`}
                      >
                        {sc}
                      </kbd>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      />
    )
  } else {
    return (
      <div className="block border-t border-gray-100 px-4 py-8 text-center text-gray-400 dark:border-gray-800 dark:text-gray-600">
        {t('noresults')}
      </div>
    )
  }
}
