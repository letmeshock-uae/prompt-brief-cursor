'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHover, setIsHover] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleEnter = () => setIsHover(true)
    const handleLeave = () => setIsHover(false)

    window.addEventListener('mousemove', move)

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    }

    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9999] rounded-full bg-accent"
        style={{ width: 10, height: 10 }}
        animate={{ x: pos.x - 5, y: pos.y - 5, scale: isHover ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="custom-cursor pointer-events-none fixed z-[9998] rounded-full border border-accent"
        style={{ width: 36, height: 36 }}
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: isHover ? 1.5 : 1,
          opacity: isHover ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }}
      />
    </>
  )
}
