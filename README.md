🙋‍♂️ I'm open for freelance offers.

💫If you don't need a freelancer, a small tip will still be appreciated, so I'll be able to create more repositories (or improve the existing ones) and spend some time to help the community! 

The other way to support me, is to buy me some artworks, thank you!

IMPORTANT NOTE: 

This is still a WIP (Work In Progress).

I recently changed all the complex server logic for pagination and tags, with the use of Zustand library, and moved it all to two components (pagination, and ListLayout)
While it's not optimal for SEO purposes, the goal of these changes is to find a solution for managing all the url in a better way (translated urls are very bad for SEO)
Also, I don't think that the impact of these first changes is really bad for SEO, because most users will use this repository and code for their personal dev blog.

So for now, blog page and tags logic is entirely managed on client side (also resulting in a faster UI for users). This also means less complex server side code and pages.

sitemap.xml and robots.txt are now handled perfectly. I made all the necessary changes, next step is to fix rss.

How can YOU help? You can help this project by making PR. I need help to optimize the performances on mobile

## Introduction

In this post we will discuss the i18n implementation and how it changes compared to the original V.2.
For a better understanding of the basic functionalities, you will need to consult the other posts, or the original documentation
on [timlrx](https://github.com/timlrx/tailwind-nextjs-starter-blog) github.

Using the repo? Let me know and I'll start a list if you want your own blog listed there.

If you find this project useful, please give it a ⭐ to show your support.

## Motivation

The original model is amazing, and all major credits for it go to its creator @Timlrx. I was using V.1 of the i18n version, which was rather complicated to use and which it seems that the creator has unfortunately abandoned. So this is my participation and my donation to the community!

Also, I am currently redesigning my own website, which uses the router page, and part of the code for the internationalized blog of V.1.
I wanted to migrate to the app router, but for that, I first had to learn how to internationalize a site with the router app, so I took this repository as training.

I love the idea of helping other developers to quickly start sharing their precious knowledge with the whole world, making the internet better, whether in their native language, or in English 😌

I also designed a much more complete template for artists, content creators and developers, which I m'using for my own site and which is available here :

Normal version :

- [Pablo Pikassiet Next Starter](https://github.com/PxlSyl/pablo-pikassiet-next-starter)

I18 version :

- [Pablo Pikassiet Next Starter I18n](https://github.com/PxlSyl/pablo-pikassiet-next-starter-i18n)

My own website based on this new template :

- [PxlSyl.art](https://www.pxlsyl.art/)

# Changes:

## New features

This repository will sometimes be updated with new features (not present in the original repository)
All this can sometimes seem obsessive regarding the UI and details, -maybe too neat or a little overkill- but I also use this repository as a play and learning space.

For now :
- New "WebsiteEmbed" MDX component : Embed your demo templates from github with ease, and show them on your website! (Don't forget to update your Content Security Policy in the config files of your templates)
- New "sidetoc" component :  display automatically the table of contents of your posts in a dedicated sidebar.
- Integration of email, theme, as well as a button to quickly copy the URL of the page you are on, with the kbar palette command.
The motivation for this is having explored other command palette libraries, with some offering nested elements for 'Actions'. Unfortunately this is not possible with kbar, but it gave me new ideas!
- Multi-authors feature for "about" section: each author can have it's own about page available inside a dropdown menu on large screens, or displayed directly on small screens. If you want to turn it off and only use the "normal", classical about section, go to sitemetadata.js and set multiauthors to false. In any case, your main author now needs to have the field "default" set to true.
- Featured section on home page for posts you want to pin to top : set featured to true (max two posts by default, can be modified in Featured.tsx file, in component folder) The program will pick the latest two posts with "featured : true." If no featured posts are available, this section will simply not be displayed!
- Each tag now has its own pagination! If the number of posts is greater than the one you have defined (by default, set to 5) then a new page is automatically created for subsequent posts including the same tag.
- Waline comment system now supported! It's probably the best open source comment system right now, with even i18n and many other great features! First, follow [the official tutorial](https://waline.js.org/en/guide/get-started/) to set up the comments database and your vercel server. There's many options available, so take the time to read their documentation. Since it's Vue based, it's still compatible with Next.js, and I created a new comment component. You'll find it in "walinecomponents" folder. I also added a new css file, and you can modify the style here if needed. Once you have deployed your application for comments, modify the sitemetadata.js file. Set "iscomments" property to false, set "iswaline"
to true and set the url of your comments server accordingly in "walineServer". If your language is not supported by waline, make a PR to their repository or ask them kindly to add your own translation (provide it yourself first). This is what I did for supporting french, and this how we work in open source world!

- Series for your posts is now supported, see the deployed demo!

Example of including this new feature : 

```mdx
title: Internationalization of V 2.0
series:
  order: 4 // You must add a number for the actual order of your post in your series
  title: "Blog Starter" // You must add the same title to all of your posts from the same series
date: '2023-11-17'
lastmod: '2023-11-17'
language: en
tags: ['next-js', 'tailwind', 'guide', 'features', 'i18n']
authors: ['default']
images: ['/static/images/twitter-card.png']
draft: false
summary: Presentation of the Starter Blog Tailwind Next-js v2.0, with addition and support for multiple languages.
```

- Share component : you or your users can share your blog posts on Facebook, Twitter, Linkedin, WhatsApp, Threads or Telegram with ease! What's a 2024 modern blog without this possibility?

- Smooth page transitions thanks to [Framer Motion](https://github.com/framer/motion) (see the template.tsx file in the app folder and take a look at the following next.js documentation
  for file functionality [template](https://nextjs.org/docs/app/api-reference/file-conventions/template))
  I strongly encourage you to experiment with framer-motion and its use within the new
  router. I also added some Framer Motion flavor to the formspree contact modal, and to the ListLayoutWithTags.tsx component

  Note : the template.tsx file is now removed, because there's performances issues with it. I'll try to implement animations handled in a better way. If you don't care about mobile performance and like this animation, you can stick with it, here's the code :

```ts:template.tsx
'use client'

import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: -50, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: 'linear' }}
    >
      {children}
    </motion.main>
  )
}
```

- New MDX component: excellent audio player for mdx files (in case you make podcasts, or even music), thanks to [react-h5-audio-player](https://github.com/lhz516/react-h5-audio-player)

- Tailwind screen size indicator: a little help for development mode and responsive design (see TwSizeIndicator.tsx in /components/helper)

- [Formspree](https://formspree.io/) support for the mail icon, with a beautiful modal dialog. Formspree allows your users to contact you and send you messages directly from your site, with anti-spam protection. Simply create a free basic account, read the docs and get the key from your formspree account and then replace the key with your own here, in components/formspree/index.tsx :

```ts:formspree/useContactForm.ts
/* Line 11*/
 const [state, handleSubmit, reset] = useForm('xdojkndq')
```

IMPORTANT NOTE: you must replace the key in useform like this : useform('[your key]'). The provided key is
a test one of mine. You can use it to verify if the toast box is functional for example, but you must know
that I'll receive all your test messages. (You can still send me a friendly hello message!)

If you don't want to use Formspree, go to the siteMetadata.js file and set formspree to "false".

## Libraries

For translations, the chosen library is not next-translate as in V.1 of GautierArcin, but the following libraries:

- i18next
- i18next-browser-languagedetector
- i18next-resources-to-backend
- React-i18next

Indeed, with the new version of next-js and the router app, it was easier for me to find information and tutorials to make everything work as expected. (I first tried with next-translate, but there are too many unresolved issues currently with this library and the features related to the new router)

## Configuration

Within the app folder, all content has been moved to a new folder [locale]: this is the official way recommended by next.js. An i18n folder has also been added:

```
app
  │
 [locale]
    │
    ├── i18n
    │     │
    │     ├──locales
    │     │     │
    │     │     ├── en
    │     │     │   ├── about.json
    │     │     │   │
    │     │     │   ├── home.json
    │     │     │   │
    │     │     │   └── ...
    │     │     └── fr
    │     │         ├── about.json
    │     │         │
    │     │         ├── home.json
    │     │         │
    │     │         └── ...
    │     │
    │     │
    │     ├── client.ts
    │     ├── locales.js
    │     ├── server.ts
    │     └── settings.ts
    │
    └── ...
```

It is therefore in this i18n folder that the main logic for the internationalization of the application is located.

- Json files:

The "locales" subfolder contains the .json files where you will define your translations, the convention being to define one file per page of your site, with the name of the page concerned for the name of the json file.
There is also a "common" file: if you do not specify a "namespace" or ns (the name of the file without the json extension) in your pages or components, the translations will be taken from this file by default.

\*Important: for each language there must be a corresponding file with the same name, for example an "about" file for "fr" and for "en", etc. As well as translation keys with the same name within
of each file.

Example :

In English in the "en" folder:

```json:projects.json
{
   "title": "Projects",
   "description": "Showcase your projects with a hero image (16 x 9)",
   "learn": "Learn more",
   "subtitle": "Here you will find information about my current projects",
   "linkto": "Link to"
}
```

In French in the "fr" folder:

```json:projects.json
{
  "title": "Projets",
  "description": "Présentez vos projets avec une image (16 x 9)",
  "learn": "En savoir plus",
  "subtitle": "Ici vous trouverez des informations sur mes projets actuels.",
  "linkto": "Lien vers"
}
```

- locales.js:

This is the file where you will define the languages you want to use, as well as the default language:

```js:locales.js
const fallbackLng = 'en' // default language
const secondLng = 'fr'

module.exports = { fallbackLng, secondLng }
```

You can add as many languages as you want:

```js:locales.js
/* Example of adding a 3rd language:*/
const fallbackLng = 'en'
const secondLng = 'fr'
const thirdLng = 'es'

module.exports = { fallbackLng, secondLng, thirdLng }
```

However, this will require some additional configuration steps within other files (mainly files that are discussed here)

You can also swap the default language and the second language:

```js:locales.js
/* Example of changing default language:*/
const fallbackLng = 'fr'
const secondLng = 'en'

module.exports = { fallbackLng, secondLng}
```

- settings.ts

This is a configuration file, which allows you to define a locales object as well as the corresponding options:

```ts:settings.ts
import type { InitOptions } from 'i18next'
import { fallbackLng, secondLng } from './locales'

/* Locales object, which defines all the languages that will be used in the application: */
export const locales = [fallbackLng, secondLng] as const
/* Typescript definition of type for our locales:*/
export type LocaleTypes = (typeof locales)[number]
/* “Namespace” (or ns) by default: translations will be taken from the file
common.json if no ns is specified in your components or pages: */
export const defaultNS = 'common'
/* Function that will be reused in client.ts and server.ts files: */
export function getOptions(locale = fallbackLng, ns = defaultNS): InitOptions {
   return {
     debug:true,
     supportedLngs: locales,
     fallbackLng,
     lng: locale,
     fallbackNS:defaultNS,
     defaultNS,
     ns,
   }
}
```

- client.ts and server.ts:

Without going into complex details, these two files each export
a function for translation (useTranslation on the client side, createTranslation on the server side),
reusable in your pages and components:

```ts:client.ts
export function useTranslation(lng: LocaleTypes, ns: string) {
   const translator = useTransAlias(ns)
   const { i18n } = translator

   /* Executed when content is rendered server-side: */
   if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
     i18n.changeLanguage(lng)
   } else {
     /* Use our custom implementation when running client-side: */
     // eslint-disable-next-line react-hooks/rules-of-hooks
     useCustomTranslationImplem(i18n, lng)
   }
   return translator
}
```

```ts:server.ts
export async function createTranslation(lang: LocaleTypes, ns: string) {
   const i18nextInstance = await initI18next(lang, ns)

   return {
     /* The "t" translation function that we will use in our components: */
     // e.g. t('greeting')
     t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0]: ns),
   }
}
```

Example of client-side component, with translation of the button's aria-label:

```ts:ThemeSwitch.tsx
'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
/*Import the hook provided by next.js to retrieve the language
defined by the user, and the client-side translation function: */
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

const ThemeSwitch = () => {
   /* Using the hook provided by next.js to retrieve the currently defined language: */
   const locale = useParams()?.locale as LocaleTypes
   /* Using the client-side translation function:
    no namespace (ns) defined (empty square brackets), therefore the translation will be drawn
    in the common.json file */
   const { t } = useTranslation(locale, '')
   const [mounted, setMounted] = useState(false)
   const { theme, setTheme, resolvedTheme } = useTheme()

   useEffect(() => setMounted(true), [])

   if (!mounted) {
     return null
   }

   return(
     <button
     /* Translation of aria-label */
       aria-label={t('darkmode')}
       onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
     >
       <svg
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 20 20"
         fill="currentColor"
         className="h-6 w-6 text-gray-900 dark:text-gray-100"
       >
         {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
           <path
             fillRule="evenodd"
             d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-. 707- .707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.7 07.707zm1.414 8.486 l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
             clipRule="evenodd"
           />
         ): (
           <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
         )}
       </svg>
     </button>
   )
}

export default ThemeSwitch
```

Example of server-side component:

```ts:footer.tsx
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
/*Importing the server-side translation function: */
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

Props type = {
   params: { locale: LocaleTypes }
}
/* the current language is passed as the page settings prop: */
export default async function Footer({ params: { locale } }: Props) {
/* Using the server-side translation function, with the "footer" namespace */
   const { t } = await createTranslation(locale, 'footer')
   return(
     <footer>
       <div className="mt-16 flex flex-col items-center">
         <div className="mb-3 flex space-x-4">
           <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
           <SocialIcon kind="github" href={siteMetadata.github} size={6} />
           <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
           <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
           <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
           <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
         </div>
         <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
           <div>{siteMetadata.author}</div>
           <div>{` • `}</div>
           <div>{`© ${new Date().getFullYear()}`}</div>
           <div>{` • `}</div>
           <Link href="/">{siteMetadata.title}</Link>
         </div>
         <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
           <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
        {t('theme')}
           </Link>
         </div>
       </div>
     </footer>
   )
}
```

For the creation of new components or pages, you will therefore have to rely on these two
functions concerning your translations, depending on whether the component is rendered client-side or server-side.

- Middleware.ts:

Since I18n is not natively supported within the new router, it is an essential file for proper
operation of the whole. It is also essential to use the "matcher"
(here with inverted values which allow you to exclude folders and files which should not
be supported by middleware)

```ts:middleware.ts
import { NextResponse, NextRequest } from 'next/server'
import { locales } from 'app/[locale]/i18n/settings'
import { fallbackLng } from 'app/[locale]/i18n/locales'

export function middleware(request: NextRequest) {
   /* Check if a language is supported in the pathname: */
   const pathname = request.nextUrl.pathname

   /* Check if default language is in pathname: */
   if (pathname.startsWith(`/${fallbackLng}/`) || pathname === `/${fallbackLng}`) {
     /* ex: the incoming request is: /en/about
     The new path name is now: /about */
     return NextResponse.redirect(
       new URL(
         pathname.replace(`/${fallbackLng}`, pathname === `/${fallbackLng}` ? '/' : ''),
         request.url
       )
     )
   }

   const pathnameIsMissingLocale = locales.every(
     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
   )

   if (pathnameIsMissingLocale) {
     /* We are on the default language
     Rewriting so that next.js understands */

     // ex: incoming request is: /about
     // Inform Next.js that it should behave as if it were: /en/about
     return NextResponse.rewrite(new URL(`/${fallbackLng}${pathname}`, request.url))
   }
}

export const config = {
   /* Do not execute middleware on the following paths: */
   // prettier-ignore
   match:
   '/((?!api|static|data|css|scripts|.*\\..*|_next).*|sitemap.xml)',
}
```

## Posts

All posts are grouped within the “data/blog” folder.

They are organized into subfolders: "data/blog/en" for English, and "data/blog/fr" for French. 
You can name the subfolders for your languages as you want : with the current configuration in contentlayer.config.ts file, the slug for your posts is the filename of your post, without the .mdx extension. All your translated posts must have the same name as the originals ones, for handling purposes of translation.

Example : 

En: "data/blog/en/code-sample.mdx"
Fr: "data/blog/fr/code-sample.mdx"

Etc.

- Headers of your posts:

```mdx:article.mdx
---
title: article title
date: creation date
lastmod: last modified date
language: article language
tags: tags
authors: authors
pictures: pictures
draft: under construction or not
summary: summary
---
```

- contentlayer.config.ts:

Within the "contentlayer.config.ts" file there are therefore minor changes due to
internationalization:

```
export const Blog = defineDocumentType(() => ({
   name: 'Blog',
   filePathPattern: 'blog/**/*.mdx',
   contentType: 'mdx',
   fields: {
     title: { type: 'string', required: true },
     series: { type: 'nested', of: Series },
     date: { type: 'date', required: true },
     language: { type: 'string', required: true }, // New required field
     tags: { type: 'list', of: { type: 'string' }, default: [] },
     lastmod: { type: 'date' },
     featured: { type: 'boolean' },
     draft: { type: 'boolean' },
     summary: { type: 'string' },
     images: { type: 'json' },
     authors: { type: 'list', of: { type: 'string' }, required: true },
     layout: { type: 'string' },
     bibliography: { type: 'string' },
     canonicalUrl: { type: 'string' },
   },
   ...
)})
```

For the “authors” field:

```
export const Authors = defineDocumentType(() => ({
   name: 'Authors',
   filePathPattern: 'authors/**/*.mdx',
   contentType: 'mdx',
   fields: {
     name: { type: 'string', required: true },
     language: { type: 'string', required: true }, // New required field
     default: {type: 'boolean'},
     avatar: { type: 'string' },
     occupation: { type: 'string' },
     company: { type: 'string' },
     email: { type: 'string' },
     twitter: { type: 'string' },
     linkedin: { type: 'string' },
     github: { type: 'string' },
     layout: { type: 'string' },
   },
```

-Generation of tags:

Here too, it was necessary to make modifications in order to generate a .json object
with tags for each language.

```
function createTagCount(allBlogs) {
   const tagCount = {
     [fallbackLng]: {},
     [secondLng]: {},
   }

   allBlogs.forEach((file) => {
     if (file.tags && (!isProduction || file.draft !== true)) {
       file.tags.forEach((tag: string) => {
         const formattedTag = GithubSlugger.slug(tag)
         if (file.language === fallbackLng) { // tags for default language
           tagCount[fallbackLng][formattedTag] = (tagCount[fallbackLng][formattedTag] || 0) + 1
         } else if (file.language === secondLng) { // tags for the second language
           tagCount[secondLng][formattedTag] = (tagCount[secondLng][formattedTag] || 0) + 1
         }
       })
     }
   })

   writeFileSync('./app/[locale]/tag-data.json', JSON.stringify(tagCount))
}
```

Note: If you want to add other languages (3, 4 or even 5 languages), you will need to modify the logic to support
these new languages.

## Authors

Folders containing authors are organized by language, and author information can be translated.

The implementation is quite simple and straightforward: if you want to change or add a language, just change or add
folders with your corresponding translations for new languages.

## SiteMetadata file and new localeMetadata file

The siteMetadata.js file present in the "/data" folder does not require modifications related to internationalization.

On the other hand, in order to best manage the metadata, it was necessary to create a new file, for the title
and the description:

```ts:localeMetadata.ts
Metadata type = {
   [locale: string]: string
}
/* Add or modify the title here depending on the chosen languages: */
export const maintitle: Metadata = {
   en: 'Next.js i18n Starter Blog',
  fr: 'Starter Blog Next.js i18n',
}
/* Add or modify the description here depending on the chosen languages: */
export const maindescription: Metadata = {
   en: 'A blog created with Next.js, i18n and Tailwind.css',
  fr: 'Un blog crée avec tailwind, i18n et next.js',
}
```

## “Projects” tab

The logic needed for the "projects" tab resides in the following file, also present in the "/data" folder:

```ts:projectsData.ts
type Project = {
   title: string
   description: string
   imgSrc: string
   href: string
}

type ProjectsData = {
   [locale:string]:Project[]
}

const projectsData: ProjectsData = {
   en: [
     {
       title: 'A Search Engine',
       description: `What if you could look up any information in the world? Webpages, images, videos
         and more. Google has many features to help you find exactly what you're looking for
         for.`,
       imgSrc: '/static/images/google.png',
       href: 'https://www.google.com',
     },
     {
       title: 'The Time Machine',
       description: `Imagine being able to travel back in time or to the future. Simple turn the knob
         to the desired date and press “Go”. No more worrying about lost keys or
         forgotten headphones with this simple yet affordable solution.`,
       imgSrc: '/static/images/time-machine.jpg',
       href: '/blog/the-time-machine',
     },
   ],

    fr: [
    {
      title: 'Un moteur de recherche',
      description: `Et si vous pouviez rechercher n'importe quelle information dans le monde ? Pages Web, images, vidéos
        et plus. Google propose de nombreuses fonctionnalités pour vous aider à trouver exactement ce que vous cherchez.`,
      imgSrc: '/static/images/google.png',
      href: 'https://www.google.com',
    },
    {
      title: 'La Machine à remonter le temps',
      description: `Imaginez pouvoir voyager dans le temps ou vers le futur. Tournez simplement le bouton
        à la date souhaitée et appuyez sur "Go". Ne vous inquiétez plus des clés perdues ou
        écouteurs oubliés avec cette solution simple mais abordable.`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/the-time-machine',
    },
  ],
}

export default projectsData
```

Again, simply modify the logic keeping the same general structure, and according to your chosen languages/and/or number of languages.

## Search bar :

The original repository allows support for kbar and algolia.

Here, the search bar relies on the kbar library, and Algolia support is not planned.
If you prefer to use Algolia, it will be up to you to implement it on your site, instead of kbar.

There's an issue when using regular translations, so I implemented a workaround for that problem. Just modify the name in each menu item, as well as the navigationSection object, based on the languages you're using.

```ts:SearchProvider.ts
  export const SearchProvider = ({ children }: SearchProviderProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, '')
  const router = useRouter()
   const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const authorSearchItems = authors.map((author) => {
    const { name, slug } = author
    return {
      id: slug,
      name: name,
      keywords: '',
      shortcut: [],
      section: locale === fallbackLng ? 'Authors' : 'Auteurs',
      perform: () => router.push(`/${locale}/about/${slug}`),
      icon: (
        <i>
          <AboutIcon />
        </i>
      ),
    }
  })

  const showAuthorsSearch = siteMetadata.multiauthors
  const authorsActions = [
    ...(showAuthorsSearch ? authorSearchItems : []),
    ...(showAuthorsSearch
      ? []
      : [
          {
            id: 'about',
            name: locale === fallbackLng ? 'About' : 'À propos',
            keywords: '',
            shortcut: ['a'],
            section: locale === fallbackLng ? 'Navigate' : 'Naviguer',
            perform: () => router.push(`/${locale}/about`),
            icon: (
              <i>
                <AboutIcon />
              </i>
            ),
          },
        ]),
  ]
  /* issue when using regular translations, this is a workaround to show how to implement section titles */
   /*Modify the following line based on your implemented languages: */
  const navigationSection = locale === fallbackLng ? 'Navigate' : 'Naviguer'
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        /* issue when using regular translations, this is a workaround to show how to implement translated menu titles */
        defaultActions: [
          {
            id: 'home',
            name: locale === fallbackLng ? 'Home' : 'Accueil',
            keywords: '',
            shortcut: ['h'],
            section: navigationSection,
            perform: () => router.push(`/${locale}`),
            icon: (
              <i>
                <HomeIcon />
              </i>
            ),
          },
          {
            id: 'blog',
            name: locale === fallbackLng ? 'Blog' : 'Blog',
            keywords: '',
            shortcut: ['b'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/blog`),
            icon: (
              <i>
                <BlogIcon />
              </i>
            ),
          },
          {
            id: 'tags',
            name: locale === fallbackLng ? 'Tags' : 'Tags',
            keywords: '',
            shortcut: ['t'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/tags`),
            icon: (
              <i>
                <TagsIcon />
              </i>
            ),
          },
          {
            id: 'projects',
            name: locale === fallbackLng ? 'Projects' : 'Projets',
            keywords: '',
            shortcut: ['p'],
            section: navigationSection,
            perform: () => router.push(`/${locale}/projects`),
            icon: (
              <i>
                <ProjectsIcon />
              </i>
            ),
          },
          ...authorsActions,
        ],
        onSearchDocumentsLoad(json) {
          return json
            .filter((post: CoreContent<Blog>) => post.language === locale)
            .map((post: CoreContent<Blog>) => ({
              id: post.path,
              name: post.title,
              keywords: post?.summary || '',
              section: t('content'),
              subtitle: post.tags.join(', '),
              perform: () => router.push(`/${locale}/blog/${post.slug}`),
            }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
```

## Things to do :

- Fix rss.mjs. If you find a solution on your side, don't hesitate to open a PR!

Everything else is currently working as expected.

Here is another possible solution for i18n integration regarding SEO, and even the translated URL:

- [next-roots](https://github.com/svobik7/next-roots)

Any help for improvements and/or bug reports is welcome!

Important notes:

- I use a custom Link component for language selection: I prefer this to the HTML selection element (easier to customize).
  The small downside is that it requires more code. If you prefer, you are free to adapt and use the select element instead, but I
  I'll keep it as is for the template.

- Do not update dependencies: this will break your application since some things need to be fixed on the side of these libraries
  ​

Author: [pxlsyl](https://pxlsyl.art)
