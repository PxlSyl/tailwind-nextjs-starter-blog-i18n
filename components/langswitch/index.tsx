import { useTagStore } from '@/components/util/useTagStore'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { locales, type LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef, useState, type JSX } from 'react'
import { useOuterClick } from '../util/useOuterClick'
import { ChevronDownIcon } from './icon'

const LangSwitch = (): JSX.Element => {
  const pathname = usePathname()
  const params = useParams()
  const locale = (params.locale as string) || ''
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, () => setIsMenuOpen(false))

  const handleLocaleChange = useCallback(
    (newLocale: string): string => {
      const segments = pathname.split('/')
      const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleTypes))
      if (localeIndex !== -1) {
        segments[localeIndex] = newLocale
      } else {
        segments.splice(1, 0, newLocale)
      }
      const newPath = segments.join('/').replace(/\/$/, '')
      return newPath
    },
    [pathname]
  )

  const handleLinkClick = useCallback(
    (newLocale: string) => {
      setSelectedTag('')
      const resolvedUrl = handleLocaleChange(newLocale)
      router.push(resolvedUrl)
      setIsMenuOpen(false)
    },
    [handleLocaleChange, router, setSelectedTag]
  )

  const currentLocale = useMemo(() => locale.charAt(0).toUpperCase() + locale.slice(1), [locale])

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen])

  const handleMenuBlur = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const createLocaleClickHandler = useCallback(
    (newLocale: string) => {
      return () => handleLinkClick(newLocale)
    },
    [handleLinkClick]
  )

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <div>
            <MenuButton
              className="inline-flex cursor-pointer rounded-md px-1 py-2 leading-5 font-bold text-gray-700 shadow-sm dark:text-white"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={handleMenuToggle}
            >
              {currentLocale}
              <ChevronDownIcon
                className={`mt-1 ml-1 transform transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
              />
            </MenuButton>
            <Transition
              show={open}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <MenuItems
                className="ring-opacity-5 absolute right-0 z-50 mt-2 w-12 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-800"
                aria-orientation="vertical"
                onBlur={handleMenuBlur}
              >
                <RadioGroup>
                  <div
                    className="py-1"
                    role="none"
                    style={{ listStyle: 'none', margin: 0, padding: 0 }}
                  >
                    {locales.map((newLocale: string) => (
                      <Radio key={newLocale} value={newLocale}>
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={createLocaleClickHandler(newLocale)}
                              className={`${
                                focus
                                  ? 'bg-gray-100 dark:bg-gray-600'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                              } hover:text-primary-500 dark:hover:text-primary-500 cursor-pointer rounded-md px-4 py-2 text-sm text-gray-700 dark:text-white`}
                              role="menuitem"
                              style={{ display: 'block', width: '100%', textDecoration: 'none' }}
                            >
                              {newLocale.charAt(0).toUpperCase() + newLocale.slice(1)}
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </MenuItems>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  )
}

export default LangSwitch
