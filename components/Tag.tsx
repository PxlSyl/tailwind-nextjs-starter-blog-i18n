import Link from 'next/link'
import { slug } from 'github-slugger'

const Tag = ({ text, params: { locale } }) => {
  // Define the link URL based on the locale
  const tagLink = `/${locale}/tags/${slug(text)}`

  return (
    <Link
      href={tagLink}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.replace(/ /g, '-')}
    </Link>
  )
}

export default Tag
