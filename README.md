Fully operational, let me know if you have some problems or issues.

This repository is a fork from the V.2 version (next-js app router) of [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) with internationalization.

For translations, the chosen library is not next-translate as in the alternative V.1 from [GautierArcin](https://github.com/GautierArcin/tailwind-nextjs-starter-blog/tree/demo/next-translate), but the following libraries :

- i18next
- i18next-browser-languagedetector
- i18next-resources-to-backend
- react-i18next

Indeed, with the new version of next-js and the dir app, it was easier for me to find information and
tutorials to make everything works as expected. (I first tried with next-translate, but there are too many unresolved problems currently with this library and the new features linked to the next-js app directory)

In addition, unlike version v1, I made it possible to display each post and its translation. Let's say you are reading an article, but you prefer to read it in another language, instead of redirecting you to a 404 (V1) error page, this will display the article in the corresponding language!

But for this, you must assign a unique identifier (LocaleID in your MDX files) for the post, and for the corresponding post in the translated language. If no matching post is found, the router will redirect to the blog's overview page.

To be able to test the code and the translations and be sure that everything works, I translated all the mdx articles - from the original repository - into French.

Things to do/missing :

- Fix translation in the not-found page. This is related to how the not-found function currently works, so we have to wait for a fix on next-js side, see here : [i18n for not-found page](https://github.com/vercel/next.js/discussions/50518)

- Tried to update rss.mjs script for first deployment purpose, but don't know if it's correct for language setup (but tried my best) If you're an experienced dev, let me know what you think.

Everything else is currently working as expected.

I had to make significant changes regarding SEO within the pages, but I ended up finding a solution that worked, with a perfect SEO score!

Here is another possible solution for i18n integration regarding SEO, and even translated url :

- [next-roots](https://github.com/svobik7/next-roots)

Any help for improvments and/or bug report is welcome!

Important notes :

- I'm currently busy writing the documentation, which will be available soon on the deployment demo (with main changes, knowns issues etc.)

- Don't update the dependencies : it will break your app since some things have to be fixed on these libraries side.

What's more?

This repository will sometimes be updated with new features (not present in the original repository)

For now :

- Smooth page transitions thanks to framer-motion (see the template.tsx file in app folder, and have a look at next js documentation for [template](https://nextjs.org/docs/app/api-reference/file-conventions/template) features if you want informations about how templates works)

Note : this is a basic but efficient implementation. I strongly encourage you to dig deeper into framer-motion and next app router usage.

- New great audioplayer component for mdx files (in case you do podcasts, or even music), thanks to [react-h5-audio-player](https://github.com/lhz516/react-h5-audio-player)

- Tailwind screen size indicator : little helper for developement mode and responsive design (see TwSizeIndicator.tsx in /components/helper)
