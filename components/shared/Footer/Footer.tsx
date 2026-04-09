import Link from 'next/link'
import { footerLinks, socialLinks } from '@/data/navigation'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-dark text-accent-foreground/70">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <span className="font-heading text-h2 tracking-widest text-accent-foreground">FL</span>
            <p className="mt-4 text-sm leading-relaxed text-accent-foreground/50">
              Бюро интерьерного дизайна и архитектуры.
              <br />
              Создаём пространства с характером.
            </p>
          </div>

          <div>
            <p className="mb-4 text-label uppercase tracking-[0.12em] text-muted">Страницы</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-accent-foreground/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-label uppercase tracking-[0.12em] text-muted">Контакты</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@fl-bureau.com"
                className="text-sm text-accent-foreground/60 transition-colors hover:text-accent"
              >
                hello@fl-bureau.com
              </a>
              <a
                href="tel:+74951234567"
                className="text-sm text-accent-foreground/60 transition-colors hover:text-accent"
              >
                +7 495 123-45-67
              </a>
              <div className="mt-2 flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-label text-muted/50">© {year} FL Bureau. Все права защищены.</p>
          <Link
            href="/privacy"
            className="text-label uppercase tracking-[0.12em] text-muted/50 transition-colors hover:text-muted"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}
