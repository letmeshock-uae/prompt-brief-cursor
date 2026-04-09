'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'
import type { Service } from '@/types'

interface ServiceAccordionProps {
  service: Service
  defaultOpen?: boolean
}

export function ServiceAccordion({ service, defaultOpen = false }: ServiceAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-accent"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <h3 className="font-heading text-h3 text-foreground">{service.title}</h3>
        <span className="text-accent ml-4 shrink-0">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <p className="text-body text-muted mb-6">{service.description}</p>
              <div className="space-y-4">
                {service.stages.map((stage) => (
                  <div key={stage.step} className="flex gap-4">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-label text-accent font-medium">
                      {stage.step}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{stage.title}</p>
                      <p className="mt-1 text-sm text-muted">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
