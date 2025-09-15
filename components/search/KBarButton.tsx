import { useKBar } from 'kbar'
import React, {
  useCallback,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from 'react'

interface KbarButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode
}

/**
 * Button wrapper component that triggers the KBar modal on click.
 *
 * @return {*}
 */
export const KBarButton: React.FC<KbarButtonProps> = ({ children, ...rest }): JSX.Element => {
  const { query } = useKBar()

  const handleClick = useCallback(() => {
    query.toggle()
  }, [query])

  return (
    <button {...rest} onClick={handleClick}>
      {children}
    </button>
  )
}
