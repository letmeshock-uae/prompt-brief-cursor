'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from '@phosphor-icons/react'
import type { Toast as ToastType } from '@/types'
import { cn } from '@/lib/cn'

interface ToastProps {
  toast: ToastType
  onDismiss: (id: string) => void
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
}

const styles = {
  success: 'border-l-4 border-l-green-500',
  error: 'border-l-4 border-l-red-500',
  info: 'border-l-4 border-l-accent',
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = icons[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 48 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'flex items-start gap-3 rounded-md bg-surface-dark px-4 py-3 shadow-vibe-lg',
        styles[toast.type]
      )}
    >
      <Icon
        size={20}
        weight="fill"
        className={cn(
          'mt-0.5 shrink-0',
          toast.type === 'success' && 'text-green-400',
          toast.type === 'error' && 'text-red-400',
          toast.type === 'info' && 'text-accent'
        )}
      />
      <p className="flex-1 text-sm text-accent-foreground">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-muted transition-colors hover:text-accent-foreground"
        aria-label="Закрыть"
      >
        <X size={16} />
      </button>
    </motion.div>
  )
}
