import type { JSX } from 'react'
import NewsletterForm, { type NewsletterFormProps } from './NewsletterForm'

const BlogNewsletterForm = ({ title, apiUrl }: NewsletterFormProps): JSX.Element => (
  <div className="flex items-center justify-center">
    <div className="bg-gray-100 p-6 sm:px-14 sm:py-8 dark:bg-gray-800">
      <NewsletterForm title={title} apiUrl={apiUrl} />
    </div>
  </div>
)

export default BlogNewsletterForm
