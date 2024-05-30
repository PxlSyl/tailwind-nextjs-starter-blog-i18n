'use client'

import { useRef } from 'react'
import { useOuterClick } from '../util/useOuterClick'
import useSidebarStore from './store'
import { Toc } from 'pliny/mdx-plugins'
import TocBody from './TocBody'
import Button from './Button'

interface SidetocProps {
  toc: Toc
}

const Sidetoc = ({ toc }: SidetocProps) => {
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
