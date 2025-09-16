import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import Image from '../mdxcomponents/Image'
import Link from '../mdxcomponents/Link'

import { useTranslation } from 'app/[locale]/i18n/client'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: -25 },
  enter: { opacity: 1, x: 0, y: 0 },
}

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
}

const Card: React.FC<CardProps> = ({ title, description, imgSrc, href }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'projects')
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'tween', duration: 0.3 }}
      className="md max-w-[544px] p-4 md:w-1/2"
    >
      <div
        className={`${
          imgSrc && 'h-full'
        } border-opacity-60 overflow-hidden rounded-md border-2 border-gray-200 dark:border-gray-700`}
      >
        {imgSrc ? (
          href ? (
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              aria-label={`${t('linkto')}${title}`}
            >
              <Image
                alt={title}
                title={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              title={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          )
        ) : null}
        <div className="p-6">
          <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
            {href ? (
              <Link
                href={href.startsWith('http') ? href : `/${locale}${href}`}
                aria-label={`${t('linkto')}${title}`}
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href ? (
            <Link
              href={href.startsWith('http') ? href : `/${locale}${href}`}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
              aria-label={`${t('linkto')}${title}`}
            >
              {href.startsWith('http') ? `${t('visit')}` : `${t('read')}`} &rarr;
            </Link>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}
export default Card
