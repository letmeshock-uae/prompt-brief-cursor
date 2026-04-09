'use client'

import { createContext, useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toast } from './Toast'
import type { Toast as ToastType, ToastType as ToastKind } from '@/types'

interface ToastContextValue {
  addToast: (message: string, type?: ToastKind) => void
}

export const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const addToast = useCallback((message: string, type: ToastKind = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-2" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <Toast key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
