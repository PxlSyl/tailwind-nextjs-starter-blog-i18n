import { ValidationError } from '@formspree/react'

interface FormInputsProps {
  name: string
  email: string
  message: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  state: any
  t: (key: string) => string
}

export const FormInputs: React.FC<FormInputsProps> = ({
  name,
  email,
  message,
  handleNameChange,
  handleEmailChange,
  handleMessageChange,
  state,
  t,
}) => {
  return (
    <>
      <input
        required
        autoComplete="name"
        id="fullName"
        type="text"
        name="fullName"
        placeholder={t('name')}
        value={name}
        onChange={handleNameChange}
        className="mb-2 w-full rounded-md border-black bg-white p-2 text-black outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:bg-black dark:text-white"
      />
      <input
        required
        autoComplete="email"
        id="email"
        type="email"
        name="email"
        placeholder={t('mail')}
        value={email}
        onChange={handleEmailChange}
        className="mb-2 w-full rounded-md border-black bg-white p-2 text-base text-black outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:bg-black dark:text-white"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea
        required
        id="message"
        name="message"
        placeholder={t('message')}
        value={message}
        onChange={handleMessageChange}
        className="mb-2 w-full rounded-md border-black bg-white p-2 text-base text-black outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:bg-black dark:text-white"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
    </>
  )
}
