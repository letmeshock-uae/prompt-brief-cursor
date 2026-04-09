'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { X } from '@phosphor-icons/react'
import { navLinks, socialLinks } from '@/data/navigation'
import { vibeStagger, vibeSlideLeft } from '@/lib/animations'

interface BurgerMenuProps {
  onClose: () => void
}

export function BurgerMenu({ onClose }: BurgerMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col bg-surface-dark"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between px-6 py-6">
        <Link href="/" onClick={onClose} className="font-heading text-h3 tracking-widest text-accent-foreground">
          FL
        </Link>
        <button
          ref={closeRef}
          onClick={onClose}
          className="text-accent-foreground/60 transition-colors hover:text-accent"
          aria-label="Закрыть меню"
        >
          <X size={24} />
        </button>
      </div>

      <motion.nav
        className="flex flex-1 flex-col justify-center px-8 gap-2"
        variants={vibeStagger}
        initial="initial"
        animate="animate"
      >
        {navLinks.map((link, i) => (
          <motion.div key={link.href} variants={vibeSlideLeft} custom={i}>
            <Link
              href={link.href}
              onClick={onClose}
              className="block py-4 font-heading text-h2 text-accent-foreground/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      <div className="flex items-center gap-6 px-8 py-8">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
          >
            {s.label}
          </a>
        ))}
      </div>
    </motion.div>
  )
}
