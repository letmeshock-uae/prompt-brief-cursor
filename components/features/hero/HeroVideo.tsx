'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const HERO_POSTER = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1920&q=80'

interface HeroVideoProps {
  headline?: string
  subline?: string
}

export function HeroVideo({
  headline = 'Пространство\nс характером',
  subline = 'Дизайн интерьера и архитектура',
}: HeroVideoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[hsl(25_7%_15%)]">
      {/* Parallax container */}
      <motion.div className="absolute inset-0" style={{ y }}>

        {/* Poster — always visible until video loads */}
        <Image
          src={HERO_POSTER}
          alt="FL Bureau — дизайн интерьера"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Video overlay once loaded */}
        {videoLoaded && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(28,26,24,0.25) 0%, rgba(28,26,24,0.15) 40%, rgba(28,26,24,0.65) 100%)',
          }}
        />
      </motion.div>

      {/* Hidden video element to detect load */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="hidden"
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-start justify-end px-6 pb-20 md:px-16 md:pb-24"
        style={{ opacity }}
      >
        <motion.p
          className="mb-4 text-label uppercase tracking-[0.12em] text-[color:hsl(0_0%_96%/0.6)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {subline}
        </motion.p>

        <motion.h1
          className="font-heading text-display text-accent-foreground whitespace-pre-line max-w-3xl leading-[1.02]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {headline}
        </motion.h1>

        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-label uppercase tracking-[0.12em] text-accent-foreground shadow-accent-glow transition-all duration-300 hover:bg-accent-light"
          >
            Портфолио
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 rounded-sm border border-[rgba(247,244,240,0.35)] px-6 py-3 text-label uppercase tracking-[0.12em] text-[#F7F4F0CC] transition-all duration-300 hover:border-accent hover:text-accent-foreground"
          >
            Оставить заявку
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity }}
      >
        <div className="h-10 w-px bg-[rgba(247,244,240,0.3)] animate-pulse" />
      </motion.div>
    </section>
  )
}
