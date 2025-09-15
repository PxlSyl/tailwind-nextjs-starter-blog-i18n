import siteMetadata from '@/data/siteMetadata'
import { NewsletterAPI } from 'pliny/newsletter'

const handler = NewsletterAPI({
  provider: siteMetadata.newsletter?.provider || 'buttondown',
})

export { handler as GET, handler as POST }
