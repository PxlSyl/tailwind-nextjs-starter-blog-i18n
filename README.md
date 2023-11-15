Still in dev, will add a doc later! I was able to deploy if you want to have a look, but there's still some bugs/issues to fix.

This repository is a fork from [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) with internationalization.

For translations, the chosen library is not next-translate as in the alternative V.1 from [GautierArcin](https://github.com/GautierArcin/tailwind-nextjs-starter-blog/tree/demo/next-translate), but the following libraries :

- i18next
- i18next-browser-languagedetector
- i18next-resources-to-backend

Indeed, with the new version of next-js and the dir app, it was easier for me to find information and
tutorials to make everything works as expected. (I first tried with next-translate, but there are too many unresolved problems currently with this library and the new features linked to the next-js app directory)

To be able to test the code and the translations and be sure that everything works, I translated all the mdx articles - from the original repository - into French.

Things to do/missing :

- Fix translation in the not-found page. This is related to how the not-found function currently works, so we have to wait for a fix on next-js side, see here : [i18n for not-found page](https://github.com/vercel/next.js/discussions/50518)

- Add translation to the search bar (but I don't know to what extent this is possible, since the search modals are taken from external libraries, unless you completely rewrite the search components)

- Tried to update rss.mjs script for first deployment purpose, but don't know if it's correct for language setup (but tried my best) If you're an experienced dev, let me know what you think.

- Fix author not displayed in the new postLayout.

- Fix urls (remove /blog/fr or /blog/en to /blog/ )

- Fix robots.txt file

Everything else is currently working as expected.

I had to make significant changes regarding SEO within the pages, but I ended up finding a solution that worked. Here is another possible solution for i18n integration:

- [next-roots](https://github.com/svobik7/next-roots)

Any help for improvments and/or bug report is welcome!
