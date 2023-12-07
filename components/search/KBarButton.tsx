import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useKBar } from 'kbar'

/**
 * Button wrapper component that triggers the KBar modal on click.
 *
 * @return {*}
 */
export const KBarButton: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...rest }) => {
  const { query } = useKBar()

  return (
    <button {...rest} onClick={() => query.toggle()}>
      {children}
    </button>
  )
}
