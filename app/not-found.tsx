import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Страница не найдена',
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-label uppercase tracking-[0.12em] text-accent">404</p>
      <h1 className="mt-4 font-heading text-h1 text-foreground">Страница не найдена</h1>
      <p className="mt-4 text-body text-muted max-w-md">
        Возможно, страница была перемещена или удалена. Вернитесь на главную или посмотрите портфолио.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-sm bg-accent px-6 py-3 text-label uppercase tracking-[0.12em] text-accent-foreground transition-colors hover:bg-accent-light"
        >
          На главную
        </Link>
        <Link
          href="/portfolio"
          className="rounded-sm border border-border px-6 py-3 text-label uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          Портфолио
        </Link>
      </div>
    </div>
  )
}
