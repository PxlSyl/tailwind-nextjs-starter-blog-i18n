import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'
import { MailIcon } from '../search/icons'
import { useOuterClick } from '../util/useOuterClick'

interface cModalProps {
  isOpen?: boolean
  onClose: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  disabled?: boolean
}

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export const CModal: React.FC<cModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  disabled,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null)

  useOuterClick(modalContentRef, onClose)

  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    onClose()
  }, [disabled, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/50 p-4 backdrop-blur backdrop-filter dark:bg-black/50"
    >
      <div className="relative mx-auto my-3 h-full w-full sm:h-auto sm:w-2/5 sm:max-w-xl">
        <div
          ref={modalContentRef}
          className="relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none lg:h-auto dark:bg-black"
        >
          <div className="flex items-center justify-between p-6">
            <div className="text-heading-400 ml-2 flex flex-row items-center text-3xl font-semibold">
              <span>
                <MailIcon className="mr-2 h-6 w-6" />
              </span>
              <div>{title}</div>
            </div>
            <button
              aria-label="contact"
              onClick={handleClose}
              className="ml-auto border-0 p-1 transition hover:opacity-70"
            >
              <p className="text-lg font-bold" style={{ fontSize: '1.5rem' }}>
                &times;
              </p>
            </button>
          </div>
          <div className="relative flex-auto p-6">{body}</div>
          <div className="flex flex-col gap-2 p-6">{footer}</div>
        </div>
      </div>
    </motion.div>
  )
}
