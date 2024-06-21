import { motion } from 'framer-motion'

type ShimmerButtonProps = {
  text: string
  href: string
}

const ShimmerButton = ({ text, href }: ShimmerButtonProps) => {
  return (
    <motion.button
      className="inline-flex overflow-hidden rounded-lg bg-[linear-gradient(120deg,#FF98A4_calc(var(--shimmer-button-x)-25%),#f6f6f6_var(--shimmer-button-x),#FF98A4_calc(var(--shimmer-button-x)+25%))] [--shimmer-button-x:0%]"
      initial={
        {
          scale: 1,
          '--shimmer-button-x': '-100%',
        } as any
      }
      animate={
        {
          '--shimmer-button-x': '200%',
        } as any
      }
      transition={{
        stiffness: 500,
        damping: 20,
        type: 'spring',
        '--shimmer-button-x': {
          duration: 3,
          repeat: Infinity,
          ease: [0.445, 0.05, 0.55, 0.95],
        },
      }}
      whileTap={{
        scale: 0.95,
      }}
      whileHover={{
        scale: 1.05,
      }}
    >
      <a href={href}>
        <span className="m-[0.125rem] rounded-[calc(0.5rem-0.125rem)] bg-primary-500 px-4 py-1 text-lg text-[#f6f6f6] backdrop-blur-sm">
          {text}
        </span>
      </a>
    </motion.button>
  )
}

export default ShimmerButton
