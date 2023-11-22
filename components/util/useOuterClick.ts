import { RefObject, useEffect } from 'react'

export function useOuterClick(dom: RefObject<HTMLElement>, cb: () => void): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dom.current && !dom.current.contains(event.target as Node)) {
        cb()
      }
    }

    // Attach the event listener during component mount
    window.addEventListener('mousedown', handleClickOutside)

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dom, cb])
}
