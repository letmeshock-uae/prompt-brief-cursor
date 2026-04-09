'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const HERO_POSTER = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80'

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
    <section
      ref={ref}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundColor: '#2A2724' }}
    >
      {/* Parallax bg layer */}
      <motion.div style={{ position: 'absolute', inset: 0, y }}>

        {/* Background photo — plain img, no Next.js optimization */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Video once it loads */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(28,26,24,0.2) 0%, rgba(28,26,24,0.1) 40%, rgba(28,26,24,0.65) 100%)',
          }}
        />
      </motion.div>

      {/* Text content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          height: '100%',
          padding: '0 clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vh, 6rem)',
          opacity,
        }}
      >
        <motion.p
          className="text-label uppercase text-[rgba(247,244,240,0.6)]"
          style={{ marginBottom: '1rem', letterSpacing: '0.12em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {subline}
        </motion.p>

        <motion.h1
          className="font-heading text-display text-accent-foreground"
          style={{ whiteSpace: 'pre-line', maxWidth: '48rem', lineHeight: 1.02 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {headline}
        </motion.h1>

        <motion.div
          style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
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
            style={{ border: '1px solid rgba(247,244,240,0.35)' }}
            className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-label uppercase tracking-[0.12em] text-[rgba(247,244,240,0.8)] transition-all duration-300 hover:text-accent-foreground"
          >
            Оставить заявку
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(247,244,240,0.3)',
            animation: 'pulse 2s infinite',
          }}
        />
      </motion.div>
    </section>
  )
}
