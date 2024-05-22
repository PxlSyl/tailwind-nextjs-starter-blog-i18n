'use client'

import 'react-toastify/dist/ReactToastify.css'
import { useContactModal } from './store'
import { ToastContainer } from 'react-toastify'
import { CModal } from './CModal'
import { ModalBody } from './CBody'
import { useContactForm } from './useContactForm'

export const ContactModal = (): JSX.Element => {
  const contactModal = useContactModal()
  const {
    state,
    handleSubmit,
    name,
    email,
    message,
    handleNameChange,
    handleEmailChange,
    handleMessageChange,
    t,
  } = useContactForm()

  return (
    <>
      <CModal
        title={t('title')}
        isOpen={contactModal.isOpen}
        onClose={contactModal.onClose}
        body={
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
        }
      />
      <ToastContainer autoClose={2000} />
    </>
  )
}
