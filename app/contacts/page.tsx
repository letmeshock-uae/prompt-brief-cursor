import type { Metadata } from 'next'
import { ContactForm } from '@/components/features/contact/ContactForm'
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с FL Bureau — оставьте заявку или позвоните нам.',
}

export default function ContactsPage() {
  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-16">
        <div className="container mx-auto">
          <ScrollReveal>
            <p className="text-label uppercase tracking-[0.12em] text-accent">Контакты</p>
            <h1 className="mt-3 font-heading text-h1 text-foreground max-w-xl">
              Расскажите нам о вашем проекте
            </h1>
            <p className="mt-4 text-body text-muted max-w-lg">
              Ответим в течение рабочего дня. Первая консультация — бесплатно.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-8 px-6 md:px-16 pb-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form */}
            <ScrollReveal>
              <ContactForm source="contacts" />
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.15} direction="left">
              <div className="space-y-10">
                <div>
                  <p className="text-label uppercase tracking-[0.12em] text-muted mb-3">Email</p>
                  <a
                    href="mailto:hello@fl-bureau.com"
                    className="font-heading text-h3 text-foreground transition-colors hover:text-accent"
                  >
                    hello@fl-bureau.com
                  </a>
                </div>

                <div>
                  <p className="text-label uppercase tracking-[0.12em] text-muted mb-3">Телефон</p>
                  <a
                    href="tel:+74951234567"
                    className="font-heading text-h3 text-foreground transition-colors hover:text-accent"
                  >
                    +7 495 123-45-67
                  </a>
                </div>

                <div>
                  <p className="text-label uppercase tracking-[0.12em] text-muted mb-3">Адрес</p>
                  <p className="text-base text-foreground">
                    Москва, ул. Пятницкая, 1
                    <br />
                    Студия FL Bureau, 3 этаж
                  </p>
                </div>

                <div>
                  <p className="text-label uppercase tracking-[0.12em] text-muted mb-3">Режим работы</p>
                  <p className="text-base text-foreground">Пн–Пт: 10:00 — 19:00</p>
                  <p className="text-sm text-muted mt-1">Встречи по предварительной записи</p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-label uppercase tracking-[0.12em] text-muted mb-4">Соцсети</p>
                  <div className="flex gap-6">
                    {[
                      { label: 'Instagram', href: 'https://instagram.com/fl.bureau' },
                      { label: 'Telegram', href: 'https://t.me/fl_bureau' },
                      { label: 'Pinterest', href: 'https://pinterest.com/fl_bureau' },
                    ].map((s) => (
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
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
