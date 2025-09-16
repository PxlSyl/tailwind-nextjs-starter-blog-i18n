import { BackwardIcon } from '../icons'

interface ButtonProps {
  onClick: () => void
  show: boolean
  icon: React.ReactNode
  label: string
  backLabel: string
}

const Button: React.FC<ButtonProps> = ({ onClick, show, icon, label, backLabel }) => (
  <button
    className="ring-opacity-5 hover:text-primary-500 dark:hover:text-primary-500 flex cursor-pointer flex-row items-center justify-center rounded-md bg-white px-2 py-1 text-gray-700 shadow-lg ring-1 ring-black hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600"
    onClick={onClick}
  >
    {show ? (
      <>
        <span className="mr-2">
          <BackwardIcon />
        </span>
        <div>{backLabel}</div>
      </>
    ) : (
      <>
        <span className="mr-2">{icon}</span>
        <div>{label}</div>
      </>
    )}
  </button>
)

export default Button
