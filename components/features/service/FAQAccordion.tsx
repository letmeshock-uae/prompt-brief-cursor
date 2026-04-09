'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="divide-y divide-border">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id
        return (
          <div key={faq.id}>
            <button
              className="flex w-full items-center justify-between py-5 text-left"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
            >
              <span className="font-sans text-base font-medium text-foreground pr-4">{faq.question}</span>
              <span className="shrink-0 text-accent">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-body text-muted">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
