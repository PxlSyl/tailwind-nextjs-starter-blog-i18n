import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { useKBar } from 'kbar'

interface KbarButtonProps {
  children: ReactNode
  [key: string]: any
}

/**
 * Button wrapper component that triggers the KBar modal on click.
 *
 * @return {*}
 */
export const KBarButton: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...rest }: KbarButtonProps) => {
  const { query } = useKBar()

  return (
    <button {...rest} onClick={() => query.toggle()}>
      {children}
    </button>
  )
}
