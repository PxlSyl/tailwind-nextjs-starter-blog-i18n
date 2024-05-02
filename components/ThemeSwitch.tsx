'use client'

import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, RadioGroup, Transition } from '@headlessui/react'
import { DarkModeSwitch } from './DarkModeSwitch'

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-6 w-6 text-gray-900 transition-transform duration-300 dark:text-gray-100"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)
const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-6 w-6 text-gray-900 transition-transform duration-300 dark:text-gray-100"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)
const Monitor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-gray-900 transition-transform duration-300 dark:text-gray-100"
  >
    <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
    <line x1="7" y1="17" x2="13" y2="17"></line>
    <line x1="10" y1="13" x2="10" y2="17"></line>
  </svg>
)

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const [darkModeChecked, setDarkModeChecked] = useState(resolvedTheme === 'dark')

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setDarkModeChecked(newTheme === 'dark')
    setMenuOpen(false)
  }

  return (
    <div className="mr-5">
      <Menu as="div" className="relative mt-1 inline-block text-left">
        <Menu.Button>
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
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Sun />
                        <span className="ml-2">Light</span>
                      </button>
                    )}
                  </Menu.Item>
                </RadioGroup.Option>
                <RadioGroup.Option value="dark">
                  {({ active }) => (
                    <Menu.Item>
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
                    </Menu.Item>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="system">
                  {({ active }) => (
                    <Menu.Item>
                      <button
                        onClick={() => handleThemeChange('system')}
                        className={`${
                          active
                            ? 'bg-gray-100 dark:bg-gray-600'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary-500 dark:hover:text-primary-500`}
                      >
                        <Monitor />
                        <span className="ml-2">System</span>
                      </button>
                    </Menu.Item>
                  )}
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
