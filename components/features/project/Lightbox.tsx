'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight } from '@phosphor-icons/react'

interface LightboxProps {
  images: string[]
  initialIndex?: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = [initialIndex, () => {}]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center glass-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-md shadow-vibe-xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[index]}
              alt={`Изображение ${index + 1} из ${images.length}`}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute right-6 top-[-48px] text-accent-foreground/70 transition-colors hover:text-accent"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <X size={28} />
        </button>

        {images.length > 1 && (
          <>
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-foreground transition-colors hover:text-accent"
              onClick={() => {}}
              aria-label="Предыдущее"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-foreground transition-colors hover:text-accent"
              onClick={() => {}}
              aria-label="Следующее"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}

        <p className="mt-4 text-center text-label text-accent-foreground/50">
          {index + 1} / {images.length}
        </p>
      </div>
    </motion.div>,
    document.body
  )
}
