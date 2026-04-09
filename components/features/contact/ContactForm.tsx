'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/features/contact/schemas/contactSchema'
import { submitContact } from '@/features/contact/actions/submitContact'
import { FloatingLabel } from './FloatingLabel'
import { useToast } from '@/components/shared/Toast/useToast'
import { cn } from '@/lib/cn'

interface ContactFormProps {
  source?: string
}

export function ContactForm({ source = 'contacts' }: ContactFormProps) {
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitContact({ ...data, source })
    if (result.success) {
      addToast('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success')
      reset()
    } else {
      addToast(result.error ?? 'Ошибка отправки. Попробуйте позже.', 'error')
    }
  }

  const nameProps = register('name')
  const emailProps = register('email')
  const phoneProps = register('phone')
  const messageProps = register('message')

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <FloatingLabel
        label="Имя *"
        type="text"
        autoComplete="name"
        error={errors.name?.message}
        {...nameProps}
      />
      <FloatingLabel
        label="Email *"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...emailProps}
      />
      <FloatingLabel
        label="Телефон"
        type="tel"
        autoComplete="tel"
        error={errors.phone?.message}
        {...phoneProps}
      />
      <FloatingLabel
        label="Сообщение *"
        multiline
        error={errors.message?.message}
        {...messageProps}
      />

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'flex items-center gap-3 rounded-sm bg-accent px-8 py-4 text-label uppercase tracking-[0.12em] text-accent-foreground shadow-accent-glow transition-all duration-300',
          'hover:bg-accent-light',
          'disabled:opacity-60 disabled:cursor-not-allowed'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
            Отправляем...
          </>
        ) : (
          'Отправить заявку'
        )}
      </motion.button>
    </form>
  )
}
