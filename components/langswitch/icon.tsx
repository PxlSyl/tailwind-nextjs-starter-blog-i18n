import { SVGProps } from 'react'

export function ChevronDownIcon(svgProps: SVGProps<SVGSVGElement>) {
  return (
    <svg {...svgProps} width="1em" height="1em" viewBox="0 0 15 15">
      <path
        fill="#3b82f6"
        fillRule="evenodd"
        d="M3.135 6.158a.5.5 0 0 1 .707-.023L7.5 9.565l3.658-3.43a.5.5 0 0 1 .684.73l-4 3.75a.5.5 0 0 1-.684 0l-4-3.75a.5.5 0 0 1-.023-.707"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
