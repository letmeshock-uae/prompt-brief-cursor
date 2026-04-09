import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, error: 'Invalid secret', code: 401 }, { status: 401 })
  }

  const { path } = await req.json().catch(() => ({ path: '/' }))
  revalidatePath(path ?? '/')

  return NextResponse.json({ success: true, data: { revalidated: path } })
}
