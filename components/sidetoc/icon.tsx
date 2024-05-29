import { SVGProps } from 'react'

export function ArrowRightIcon(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...svgProps}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
