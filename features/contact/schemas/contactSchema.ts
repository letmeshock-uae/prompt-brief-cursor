import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(100, 'Имя слишком длинное'),
  email: z.string().email('Введите корректный email'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s\-()]{7,20}$/.test(val),
      'Введите корректный номер телефона'
    ),
  message: z
    .string()
    .min(10, 'Сообщение должно содержать не менее 10 символов')
    .max(2000, 'Сообщение слишком длинное'),
  source: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
