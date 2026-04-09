import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HeroStatic } from '@/components/features/hero/HeroStatic'
import { TeamCard } from '@/components/features/team/TeamCard'
import { StatCounter } from '@/components/features/stat/StatCounter'
import { ScrollReveal } from '@/components/shared/ScrollReveal/ScrollReveal'
import { team } from '@/data/team'
import { stats } from '@/data/stats'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'О бюро',
  description: 'История, философия и команда FL Bureau — бюро интерьерного дизайна и архитектуры.',
}

export default function AboutPage() {
  return (
    <>
      <HeroStatic title="О бюро" subtitle="Наша история" />

      {/* Philosophy */}
      <section className="py-24 px-6 md:px-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <ScrollReveal>
              <p className="text-label uppercase tracking-[0.12em] text-accent">Философия</p>
              <h2 className="mt-4 font-heading text-h2 text-foreground">
                Мы создаём пространства, а не декорации
              </h2>
              <div className="mt-6 space-y-4 text-body text-muted">
                <p>
                  FL Bureau — это команда архитекторов и дизайнеров, объединённых одной идеей: каждое пространство должно отражать характер тех, кто в нём живёт или работает.
                </p>
                <p>
                  Мы не следуем трендам — мы создаём интерьеры, которые останутся актуальными через 10 лет. Работаем с натуральными материалами, уделяем особое внимание свету и пропорциям.
                </p>
                <p>
                  За 12 лет работы мы реализовали более 120 проектов — от городских квартир до загородных вилл и коммерческих объектов.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
                  alt="FL Bureau — студия"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-surface">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.id} delay={i * 0.1}>
                <StatCounter stat={stat} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-16">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Принципы</p>
            <h2 className="mt-2 font-heading text-h2 text-foreground">Как мы работаем</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { num: '01', title: 'Слушаем', desc: 'Каждый проект начинается с глубокого погружения в задачу клиента. Мы задаём много вопросов, прежде чем брать карандаш.' },
              { num: '02', title: 'Проектируем', desc: 'Функция первична. Красота — следствие грамотно выстроенного пространства, пропорций и света.' },
              { num: '03', title: 'Реализуем', desc: 'Авторский надзор на всех этапах. Мы остаёмся в проекте до финальной расстановки и фотосъёмки.' },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 0.1}>
                <div className="border-t border-border pt-6">
                  <span className="text-label uppercase tracking-[0.12em] text-accent">{item.num}</span>
                  <h3 className="mt-3 font-heading text-h3 text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-16 bg-surface">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12">
            <p className="text-label uppercase tracking-[0.12em] text-accent">Команда</p>
            <h2 className="mt-2 font-heading text-h2 text-foreground">Люди бюро</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {team.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.08}>
                <TeamCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-h2 text-foreground">Начнём ваш проект?</h2>
          <p className="mt-4 text-body text-muted max-w-md mx-auto">
            Расскажите нам о задаче. Первая консультация — бесплатно.
          </p>
          <Link
            href="/contacts"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-label uppercase tracking-[0.12em] text-accent-foreground shadow-accent-glow transition-colors hover:bg-accent-light"
          >
            Связаться <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}
