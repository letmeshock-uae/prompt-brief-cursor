import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import { RootLayout } from '@/components/shared/Layout/RootLayout'
import { PageLoader } from '@/components/shared/PageLoader/PageLoader'
import { CustomCursor } from '@/components/shared/CustomCursor/CustomCursor'
import { ToastProvider } from '@/components/shared/Toast/ToastProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'FL Bureau'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fl-bureau.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Дизайн интерьера и архитектура`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Бюро интерьерного дизайна и архитектуры. Создаём пространства с характером — от концепции до авторского надзора.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <ToastProvider>
          <PageLoader />
          <CustomCursor />
          <RootLayout>{children}</RootLayout>
        </ToastProvider>
      </body>
    </html>
  )
}
