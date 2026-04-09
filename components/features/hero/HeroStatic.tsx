import Image from 'next/image'
import { cn } from '@/lib/cn'

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80'

interface HeroStaticProps {
  title: string
  subtitle?: string
  image?: string
  className?: string
}

export function HeroStatic({ title, subtitle, image, className }: HeroStaticProps) {
  return (
    <section className={cn('relative h-[50vh] min-h-[360px] overflow-hidden', className)}>
      <Image
          src={image ?? DEFAULT_HERO}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 to-foreground/60" />
      <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-12 md:px-16">
        {subtitle && (
          <p className="mb-3 text-label uppercase tracking-[0.12em] text-accent-foreground/60">
            {subtitle}
          </p>
        )}
        <h1 className="font-heading text-h1 text-accent-foreground max-w-2xl">{title}</h1>
      </div>
    </section>
  )
}
