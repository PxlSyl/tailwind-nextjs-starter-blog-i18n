'use client'

import React, { useRef, useState } from 'react'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

export interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm = ({ apiUrl = '/api/newsletter' }: NewsletterFormProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'newsletter')
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
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
      inputEl.current!.value = ''
      setError(false)
      setSubscribed(true)
    }
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t('title')}
      </div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">{t('mail')}</span>
            <input
              autoComplete="email"
              className="w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
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
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
          <button
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary-500 px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 dark:bg-primary-500 dark:hover:shadow-purple-500/30 ${subscribed ? 'cursor-default' : ''}`}
            type="submit"
            disabled={subscribed}
          >
            <span className="relative z-50 text-lg text-white">
              {subscribed ? t('buttonSuccess') : t('buttonDefault')}
            </span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </button>
        </div>
      </form>
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{message}</div>
      )}
    </div>
  )
}

export default NewsletterForm
