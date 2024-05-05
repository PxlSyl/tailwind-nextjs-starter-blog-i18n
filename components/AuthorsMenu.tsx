'use client'

import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { Authors, allAuthors } from 'contentlayer/generated'
import { Fragment, useRef, useState } from 'react'
import { Menu, RadioGroup, Transition } from '@headlessui/react'
import { useOuterClick } from './util/useOuterClick'
import { useParams, usePathname } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

type AuthorsMenuProps = {
  className: string
}

const AuthorsMenu = ({ className }: AuthorsMenuProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const mainAuthor = allAuthors.filter(
    (a) => a.default === true && a.language === locale
  ) as Authors[]

  const pathname = usePathname()
  const sections = pathname.split('/')
  const lastSection = sections[sections.length - 1]
  const filterSections = pathname !== `/${locale}` && pathname !== '/'
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  return (
    <>
      {siteMetadata.multiauthors && (
        <div ref={menubarRef} className={className}>
          <Menu as="div" className="relative inline-block text-left font-medium leading-5">
            <div
              className={
                authors.some((author) => author.slug.includes(lastSection)) && filterSections
                  ? 'text-primary-500 dark:text-primary-500'
                  : ''
              }
            >
              <Menu.Button
                className="flex transform-gpu items-center space-x-1 transition-transform duration-300"
                onClick={toggleMenu}
              >
                {t('about')}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              show={isOpen}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <Menu.Items
                className="absolute right-0 z-50 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                as="div"
              >
                <RadioGroup>
                  <div className="p-1">
                    {authors.map((author) => {
                      const { name, avatar, language, slug } = author
                      if (language === locale) {
                        return (
                          <RadioGroup.Option key={name} value={name}>
                            {({ active }) => (
                              <Menu.Item>
                                <button
                                  className={`${
                                    active
                                      ? 'bg-gray-100 dark:bg-gray-600'
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm  hover:text-primary-500 dark:hover:text-primary-500`}
                                >
                                  <div className="mr-2">
                                    <Image
                                      className="rounded-full"
                                      src={avatar ?? ''}
                                      alt=""
                                      width={25}
                                      height={25}
                                    />
                                  </div>
                                  <Link href={`/${slug}`} onClick={closeMenu}>
                                    {name}
                                  </Link>
                                </button>
                              </Menu.Item>
                            )}
                          </RadioGroup.Option>
                        )
                      }
                      return null
                    })}
                  </div>
                </RadioGroup>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )}
      {siteMetadata.multiauthors === false && (
        <div className={className}>
          {mainAuthor.map((author) => {
            const { name, language, slug } = author
            if (language === locale) {
              return (
                <Link
                  href={`/${slug}`}
                  key={name}
                  className={`${authors.some((author) => author.slug.includes(lastSection)) && filterSections ? 'text-primary-500 dark:text-primary-500' : ''}relative inline-block text-left font-medium leading-5`}
                >
                  {t('about')}
                </Link>
              )
            }
            return null
          })}
        </div>
      )}
    </>
  )
}

export default AuthorsMenu
