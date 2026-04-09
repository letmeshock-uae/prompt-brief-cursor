'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

interface MarqueeStripProps {
  text: string
  className?: string
}

export function MarqueeStrip({ text, className }: MarqueeStripProps) {
  const [paused, setPaused] = useState(false)
  const repeated = `${text}${text}${text}${text}`

  return (
    <div
      className={cn(
        'overflow-hidden border-y border-border bg-surface py-4',
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee 30s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        <span className="font-sans text-label uppercase tracking-[0.12em] text-muted px-4">
          {repeated}
        </span>
      </div>
    </div>
  )
}
