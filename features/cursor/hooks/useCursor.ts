'use client'

import { useState, useEffect } from 'react'

export type CursorState = 'default' | 'hover' | 'hidden'

export function useCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [state, setState] = useState<CursorState>('default')

  useEffect(() => {
    const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY })
    const enter = () => setState('hover')
    const leave = () => setState('default')

    window.addEventListener('mousemove', move)

    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return { position, state }
}
