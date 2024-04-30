/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://tailwind-nextjs-starter-blog-i18n.vercel.app',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: '. /public' }