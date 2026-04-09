'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from './NavLink'
import { BurgerMenu } from '../BurgerMenu/BurgerMenu'
import { navLinks } from '@/data/navigation'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { cn } from '@/lib/cn'

export function Navbar() {
  const scrollY = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)
  const isScrolled = scrollY > 40

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          isScrolled ? 'glass py-4 shadow-vibe-sm' : 'py-6'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="font-heading text-h3 tracking-widest text-foreground">
            FL
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <span className="block h-px w-6 bg-foreground transition-transform" />
            <span className="block h-px w-4 bg-foreground transition-transform" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <BurgerMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
