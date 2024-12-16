'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import { Monitor, Moon, Sun } from './icons'
import { useTheme } from './ThemeContext'
import { useOuterClick } from '../util/useOuterClick'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { Theme } from './ThemeContext'

const ThemeSwitch = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { theme, setTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(theme === Theme.DARK)
  const menubarRef = useRef<HTMLDivElement | null>(null)

  useOuterClick(menubarRef, () => setMenuOpen(false))

  useEffect(() => {
    setDarkModeChecked(theme === Theme.DARK)
  }, [theme])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <div ref={menubarRef} className="mr-5">
      <Menu as="div" className="relative mt-1 inline-block text-left">
        <MenuButton aria-label={t('theme')}>
          <DarkModeSwitch
            checked={darkModeChecked}
            onChange={(isChecked) => setDarkModeChecked(isChecked)}
            onClick={() => setMenuOpen(!menuOpen)}
            size={24}
          />
        </MenuButton>
        <Transition
          show={menuOpen}
          as={Fragment}
          enter="transition-all ease-out duration-300"
          enterFrom="opacity-0 scale-95 translate-y-[-10px]"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition-all ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-[10px]"
        >
          <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <RadioGroup value={theme} onChange={handleThemeChange}>
              <div className="p-1">
                <Radio value={Theme.LIGHT}>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange(Theme.LIGHT)}
                        className={`${
                          focus
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Sun className="h-6 w-6" />
                        <span className="ml-2">{t('light')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value={Theme.DARK}>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange(Theme.DARK)}
                        className={`${
                          focus
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Moon className="h-6 w-6" />
                        <span className="ml-2">{t('dark')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value={Theme.SYSTEM}>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange(Theme.SYSTEM)}
                        className={`${
                          focus
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Monitor className="h-6 w-6" />
                        <span className="ml-2">{t('system')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch
