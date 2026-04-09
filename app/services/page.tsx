import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroStatic } from '@/components/features/hero/HeroStatic'
import { ServiceAccordion } from '@/components/features/service/ServiceAccordion'
import { FAQAccordion } from '@/components/features/service/FAQAccordion'
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal'
import { services, faqs } from '@/data/services'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Услуги',
  description: 'Дизайн интерьера, архитектурное проектирование, предметный дизайн и комплектация.',
}

export default function ServicesPage() {
  return (
    <>
      <HeroStatic title="Услуги" subtitle="Чем мы занимаемся" />

      {/* Services */}
      <section className="py-16 px-6 md:px-16">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal className="mb-10">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Направления</p>
            <h2 className="mt-2 font-heading text-h2 text-foreground">Полный цикл работ</h2>
          </ScrollReveal>

          <div>
            {services.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 0.05}>
                <ServiceAccordion service={service} defaultOpen={i === 0} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 md:px-16 bg-surface">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Процесс</p>
            <h2 className="mt-2 font-heading text-h2 text-foreground">Как строится работа</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Знакомство', desc: 'Созвон, осмотр объекта, бриф и техническое задание.' },
              { step: '02', title: 'Концепция', desc: 'Планировка, материалы, палитра, коллажи настроения.' },
              { step: '03', title: 'Документация', desc: 'Рабочие чертежи, спецификации, узлы для строителей.' },
              { step: '04', title: 'Надзор', desc: 'Контроль на стройке, стайлинг, финальная съёмка.' },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.08}>
                <div className="rounded-md border border-border p-6">
                  <span className="font-heading text-h2 text-accent/30">{item.step}</span>
                  <h3 className="mt-2 font-heading text-h4 text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-16">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal className="mb-10">
            <p className="text-label uppercase tracking-[0.12em] text-accent">FAQ</p>
            <h2 className="mt-2 font-heading text-h2 text-foreground">Частые вопросы</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <FAQAccordion faqs={faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-dark py-24 px-6 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-h2 text-accent-foreground">Готовы обсудить проект?</h2>
          <p className="mt-4 text-body text-accent-foreground/60 max-w-md mx-auto">
            Напишите нам — ответим в течение рабочего дня.
          </p>
          <Link
            href="/contacts"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-label uppercase tracking-[0.12em] text-accent-foreground shadow-accent-glow transition-colors hover:bg-accent-light"
          >
            Оставить заявку <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
