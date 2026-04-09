'use client'

import { useEffect, useRef, useState } from 'react'
import type { Stat } from '@/types'

interface StatCounterProps {
  stat: Stat
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function StatCounter({ stat }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    const duration = 1800
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOut(progress) * stat.value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [started, stat.value])

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-heading text-h1 text-foreground">
        {count.toLocaleString('ru-RU')}
        <span className="text-accent">{stat.unit}</span>
      </div>
      <p className="mt-2 text-label uppercase tracking-[0.12em] text-muted">{stat.label}</p>
    </div>
  )
}
