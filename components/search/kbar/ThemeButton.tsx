import { Theme } from '@/components/theme/ThemeContext'

interface ThemeButtonProps {
  t: (key: string) => string
  handleThemeChange: (theme: Theme) => void
  theme: Theme
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ t, handleThemeChange, theme, Icon }) => (
  <button
    className="flex flex-row py-2 hover:bg-primary-600 hover:text-white"
    onClick={() => handleThemeChange(theme)}
  >
    <span className="ml-4 mr-2">
      <Icon className="h-6 w-6" />
    </span>
    <div>{t(theme)}</div>
  </button>
)

export default ThemeButton
