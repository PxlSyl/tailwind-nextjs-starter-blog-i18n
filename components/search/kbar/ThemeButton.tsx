import type { Theme } from '@/components/theme/ThemeContext'
import { useCallback, type JSX } from 'react'

interface ThemeButtonProps {
  t: (key: string) => string
  handleThemeChange: (theme: Theme) => void
  theme: Theme
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  t,
  handleThemeChange,
  theme,
  Icon,
}): JSX.Element => {
  const handleClick = useCallback(() => {
    handleThemeChange(theme)
  }, [handleThemeChange, theme])

  return (
    <button
      className="hover:bg-primary-600 flex cursor-pointer flex-row py-2 hover:text-white"
      onClick={handleClick}
    >
      <span className="mr-2 ml-4">
        <Icon className="h-6 w-6" />
      </span>
      <div>{t(theme)}</div>
    </button>
  )
}

export default ThemeButton
