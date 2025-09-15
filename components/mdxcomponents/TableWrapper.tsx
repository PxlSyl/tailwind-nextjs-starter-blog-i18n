import type { JSX, ReactNode } from 'react'

interface TableWrapperProps {
  children: ReactNode
}

const TableWrapper = ({ children }: TableWrapperProps): JSX.Element => {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
