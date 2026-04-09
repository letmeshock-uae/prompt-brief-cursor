'use client'

import { useEffect, useRef, useState } from 'react'

interface Options extends IntersectionObserverInit {
  triggerOnce?: boolean
}

export function useIntersectionObserver<T extends Element>(options: Options = {}) {
  const { triggerOnce = true, ...ioOptions } = options
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        if (triggerOnce) observer.disconnect()
      } else if (!triggerOnce) {
        setIsIntersecting(false)
      }
    }, ioOptions)

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerOnce])

  return { ref, isIntersecting }
}
