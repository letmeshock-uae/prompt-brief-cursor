'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/cn'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>
type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>

interface FloatingLabelBaseProps {
  label: string
  name: string
  multiline?: boolean
  error?: string
  className?: string
}

type FloatingLabelProps = FloatingLabelBaseProps & (InputProps | TextareaProps)

export const FloatingLabel = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FloatingLabelProps
>(function FloatingLabel({ label, name, multiline = false, error, className, ...props }, ref) {
  const [focused, setFocused] = useState(false)
  const value = (props as { value?: unknown }).value
  const hasValue = Boolean(value)
  const isFloating = focused || hasValue

  const inputClass = cn(
    'peer w-full border-b border-border bg-transparent pb-2 pt-6 text-base text-foreground outline-none transition-colors duration-200',
    'placeholder-transparent',
    focused ? 'border-accent' : 'hover:border-muted',
    error && 'border-red-500',
    className
  )

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={name}
          name={name}
          rows={4}
          className={cn(inputClass, 'resize-none')}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            const textareaProps = props as TextareaProps
            if (textareaProps.onBlur) textareaProps.onBlur(e)
          }}
          {...(props as TextareaProps)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={name}
          name={name}
          className={inputClass}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            const inputProps = props as InputProps
            if (inputProps.onBlur) inputProps.onBlur(e)
          }}
          {...(props as InputProps)}
        />
      )}
      <label
        htmlFor={name}
        className={cn(
          'pointer-events-none absolute left-0 text-muted transition-all duration-200',
          isFloating
            ? 'top-0 text-label uppercase tracking-[0.12em]'
            : 'top-6 text-base',
          focused && isFloating && 'text-accent'
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
})
