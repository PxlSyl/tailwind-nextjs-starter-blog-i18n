import { useState, useEffect } from 'react'
import { useForm } from '@formspree/react'
import toast from 'react-hot-toast'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

export const useContactForm = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const [state, handleSubmit, reset] = useForm('xdojkndq')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (state.succeeded && !state.submitting) {
      toast.success(t('thanks'), {
        position: 'bottom-right',
      })
      setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        reset()
      }, 2000)
    }

    if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error(t('error'))
    }
  }, [state, reset, t])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value)
  }

  return {
    state,
    handleSubmit,
    name,
    email,
    message,
    handleNameChange,
    handleEmailChange,
    handleMessageChange,
    t,
  }
}
