import type { ContactFormData } from '../schemas/contactSchema'

interface SubmitResult {
  success: boolean
  error?: string
}

export async function submitContact(data: ContactFormData): Promise<SubmitResult> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return { success: false, error: body.error ?? 'Произошла ошибка. Попробуйте позже.' }
  }

  return { success: true }
}
