'use client'

import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { Authors, allAuthors } from 'contentlayer/generated'
import { Fragment, useRef, useState, useMemo } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { useOuterClick } from '../util/useOuterClick'
import { useParams, usePathname } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { motion } from 'framer-motion'

type AuthorsMenuProps = {
  className: string
}

const AuthorsMenu = ({ className }: AuthorsMenuProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const sections = pathname!.split('/')
  const lastSection = sections[sections.length - 1]
  const filterSections = pathname !== `/${locale}` && pathname !== '/'

  const authors = useMemo(
    () =>
      allAuthors
        .filter((a) => a.language === locale)
        .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)),
    [locale]
  ) as Authors[]

  const mainAuthor = useMemo(
    () => allAuthors.filter((a) => a.default === true && a.language === locale),
    [locale]
  ) as Authors[]

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, closeMenu)

  const isSelected = authors.some((author) => author.slug.includes(lastSection)) && filterSections

  const renderAuthorLink = (author: Authors) => {
    const { name, avatar, slug } = author
    return (
      <Radio key={name} value={name}>
        <MenuItem>
          {({ focus }) => (
            <div
              className={`${
                focus ? 'bg-gray-100 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500`}
            >
              <div className="mr-2">
                <Image
                  className="rounded-full"
                  src={avatar ?? ''}
                  alt="avatar"
                  title="avatar"
                  width={25}
                  height={25}
                />
              </div>
              <Link href={`/${locale}/about/${slug}`} onClick={closeMenu}>
                {name}
              </Link>
            </div>
          )}
        </MenuItem>
      </Radio>
    )
  }

  return (
    <>
      {siteMetadata.multiauthors ? (
        <div ref={menubarRef} className={className}>
          <Menu as="div" className="relative inline-block text-left font-medium leading-5">
            <div>
              <MenuButton
                className="flex transform-gpu items-center space-x-1 transition-transform duration-300"
                onClick={toggleMenu}
              >
                <div
                  className={`hidden font-medium ${
                    isSelected
                      ? 'text-heading-500'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                  } relative rounded-md px-2 py-1 font-medium transition-colors sm:block`}
                >
                  <span className="relative z-10">{t('about')}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="tab"
                      transition={{ type: 'spring', duration: 0.4 }}
                      className="absolute inset-0 z-0 rounded-md bg-gray-100 dark:bg-gray-600"
                    ></motion.span>
                  )}
                </div>
              </MenuButton>
            </div>
            <Transition
              show={isOpen}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <div>
                <MenuItems
                  className="absolute right-0 z-50 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                  as="div"
                >
                  <RadioGroup>
                    <div className="p-1">
                      {authors.map(
                        (author) => author.language === locale && renderAuthorLink(author)
                      )}
                    </div>
                  </RadioGroup>
                </MenuItems>
              </div>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className={className}>
          {mainAuthor.map((author) => {
            const { name, slug } = author
            return (
              <Link
                href={`/${locale}/about/${slug}`}
                key={name}
                className={`${
                  isSelected
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                } relative rounded-md px-2 py-1 font-medium transition-colors sm:block`}
              >
                <span className="relative z-10">{t('about')}</span>
                {isSelected && (
                  <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-md bg-heading-500"
                  ></motion.span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default AuthorsMenu
