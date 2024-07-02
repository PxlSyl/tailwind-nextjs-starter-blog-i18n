import Link from 'next/link'

type ButtonProps = {
  text: string
  href: string
  style?: string
  rel?: string
}

const Button = ({ text, href }: ButtonProps) => {
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? `_blank` : ''}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-primary-500 px-4 py-1.5 text-xs font-normal text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 dark:bg-primary-500 dark:hover:shadow-purple-500/30"
      style={{ textDecoration: 'none' }}
    >
      <span className="relative z-50 text-lg text-white">{text}</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20" />
      </div>
    </Link>
  )
}

export default Button
