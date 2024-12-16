import { RefObject, useEffect } from 'react'

export function useOuterClick(dom: RefObject<HTMLElement | null>, cb: () => void): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dom.current && !dom.current.contains(event.target as Node)) {
        cb()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dom, cb])
}
