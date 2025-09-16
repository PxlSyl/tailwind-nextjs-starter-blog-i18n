import Image from '@/components/mdxcomponents/Image'
import SocialIcon from '@/components/social-icons'
import type { Authors } from 'contentlayer/generated'
import React, { type ReactNode } from 'react'

import { createTranslation } from 'app/[locale]/i18n/server'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

interface AuthorLayoutProps {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  params: { locale: LocaleTypes }
}

export default async function AuthorLayout({
  children,
  content,
  params: { locale },
}: AuthorLayoutProps): Promise<React.JSX.Element> {
  const { name, avatar, occupation, company, twitter, linkedin, github } = content
  const { t } = await createTranslation(locale, 'about')

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-heading-400 dark:text-heading-400 text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('about')}
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
        <div className="flex flex-col items-center space-x-2 pt-8">
          {avatar ? (
            <Image
              src={avatar}
              alt="avatar"
              title="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
          ) : null}
          <h2 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h2>
          <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
          <div className="text-gray-500 dark:text-gray-400">{company}</div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={twitter} />
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">{children}</div>
      </div>
    </div>
  )
}
