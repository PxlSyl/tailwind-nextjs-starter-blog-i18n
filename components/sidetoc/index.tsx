'use client'

import type { Toc } from 'pliny/mdx-plugins'
import { useRef, type JSX } from 'react'
import { useOuterClick } from '../util/useOuterClick'
import Button from './Button'
import useSidebarStore from './store'
import TocBody from './TocBody'

interface SidetocProps {
  toc: Toc
}

const Sidetoc = ({ toc }: SidetocProps): JSX.Element => {
  const { closeSidebar } = useSidebarStore()
  const menubarRef = useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, closeSidebar)

  return (
    <div ref={menubarRef}>
      <TocBody toc={toc} />
      <Button />
    </div>
  )
}

export default Sidetoc
