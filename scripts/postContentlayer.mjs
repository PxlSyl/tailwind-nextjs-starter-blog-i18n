import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import siteMetadata from '../data/siteMetadata.js'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
export async function createTagCount() {
  const tagCount = {
    fr: {},
    en: {},
  }

  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (file.language === 'fr') {
          tagCount.fr[formattedTag] = (tagCount.fr[formattedTag] || 0) + 1
        } else if (file.language === 'en') {
          tagCount.en[formattedTag] = (tagCount.en[formattedTag] || 0) + 1
        }
      })
    }
  })

  writeFileSync('./app/[locale]/tag-data.json', JSON.stringify(tagCount))
}

export async function createSearchIndex() {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

async function postContentlayer() {
  await createTagCount()
  await createSearchIndex()
}

postContentlayer()
