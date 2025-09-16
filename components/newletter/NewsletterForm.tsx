'use client'

import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import React, { useCallback, useRef, useState, type JSX } from 'react'

export interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm = ({ apiUrl = '/api/newsletter' }: NewsletterFormProps): JSX.Element => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'newsletter')
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const subscribe = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const emailValue = inputEl.current?.value
      if (!emailValue) {
        setError(true)
        setMessage(t('messageError'))
        return
      }

      const res = await fetch(apiUrl, {
        body: JSON.stringify({
          email: emailValue,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { error } = await res.json()
      if (error) {
        setError(true)
        setMessage(t('messageError'))
      } else {
        if (inputEl.current) {
          inputEl.current.value = ''
        }
        setError(false)
        setSubscribed(true)
      }
    },
    [apiUrl, t]
  )

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t('title')}
      </div>
      <form
        className="flex flex-col sm:flex-row"
        onSubmit={useCallback((e) => subscribe(e), [subscribe])}
      >
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">{t('mail')}</span>
            <input
              autoComplete="email"
              className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:ring-2 focus:outline-none dark:bg-black"
              id="email-input"
              name="email"
              placeholder={`${subscribed ? t('placeholderSuccess') : t('placeholderDefault')}`}
              ref={inputEl}
              required
              type="email"
              disabled={subscribed}
            />
          </label>
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className={`group bg-primary-500 dark:bg-primary-500 relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-purple-500/30 ${subscribed ? 'cursor-default' : ''}`}
            type="submit"
            disabled={subscribed}
          >
            <span className="relative z-50 text-lg text-white">
              {subscribed ? t('buttonSuccess') : t('buttonDefault')}
            </span>
            <div className="absolute inset-0 flex h-full w-full [transform:skew(-13deg)_translateX(-100%)] justify-center group-hover:[transform:skew(-13deg)_translateX(100%)] group-hover:duration-1000">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </button>
        </div>
      </form>
      {error ? (
        <div className="w-72 pt-2 text-sm text-red-500 sm:w-96 dark:text-red-400">{message}</div>
      ) : null}
    </div>
  )
}

export default NewsletterForm
