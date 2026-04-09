import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/features/contact/schemas/contactSchema'
import { logger } from '@/lib/logger'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 3
const WINDOW_MS = 60 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= LIMIT) return false

  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Слишком много запросов. Попробуйте позже.', code: 429 },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Некорректный формат запроса', code: 400 },
      { status: 400 }
    )
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? 'Ошибка валидации', code: 400 },
      { status: 400 }
    )
  }

  const { name, email, phone, message, source } = parsed.data

  logger.info('Contact form submission', { name, email, phone, message, source, ip })

  return NextResponse.json({ success: true, data: null })
}
