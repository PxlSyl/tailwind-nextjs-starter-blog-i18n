'use client'

import * as React from 'react'
import { Fragment } from 'react'
import { Menu, RadioGroup, Transition } from '@headlessui/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import { Monitor, Moon, Sun } from './icons'
import { useTheme } from './ThemeContext'
import { useOuterClick } from '../util/useOuterClick'

const ThemeSwitch = () => {
  const { theme, setTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [darkModeChecked, setDarkModeChecked] = React.useState(theme === 'dark')
  const menubarRef = React.useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, () => setMenuOpen(false))

  React.useEffect(() => {
    setDarkModeChecked(theme === 'dark')
  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setMenuOpen(false)
  }

  if (!mounted) return null;

  return (
    <div ref={menubarRef} className="mr-5">
      <Menu as="div" className="relative mt-1 inline-block text-left">
        <Menu.Button aria-label="Theme">
          <DarkModeSwitch
            checked={darkModeChecked}
            onChange={(isChecked) => setDarkModeChecked(isChecked)}
            onClick={() => setMenuOpen(!menuOpen)}
            size={24}
          />
        </Menu.Button>
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
          <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <RadioGroup value={theme} onChange={handleThemeChange}>
              <div className="p-1">
                <RadioGroup.Option value="light">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`${
                          active
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Sun />
                        <span className="ml-2">Light</span>
                      </button>
                    )}
                  </Menu.Item>
                </RadioGroup.Option>
                <RadioGroup.Option value="dark">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`${
                          active
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Moon />
                        <span className="ml-2">Dark</span>
                      </button>
                    )}
                  </Menu.Item>
                </RadioGroup.Option>
                <RadioGroup.Option value="system">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleThemeChange('system')}
                        className={`${
                          active
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Monitor />
                        <span className="ml-2">System</span>
                      </button>
                    )}
                  </Menu.Item>
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch
