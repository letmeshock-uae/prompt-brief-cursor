import type { NavLink, SocialLink } from '@/types'

export const navLinks: NavLink[] = [
  { label: 'Портфолио', href: '/portfolio' },
  { label: 'Услуги', href: '/services' },
  { label: 'О бюро', href: '/about' },
  { label: 'Журнал', href: '/journal' },
  { label: 'Контакты', href: '/contacts' },
]

export const footerLinks: NavLink[] = [
  { label: 'Портфолио', href: '/portfolio' },
  { label: 'Услуги', href: '/services' },
  { label: 'О бюро', href: '/about' },
  { label: 'Журнал', href: '/journal' },
  { label: 'Контакты', href: '/contacts' },
  { label: 'Политика конфиденциальности', href: '/privacy' },
]

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/fl.bureau', icon: 'InstagramLogo' },
  { label: 'Telegram', href: 'https://t.me/fl_bureau', icon: 'TelegramLogo' },
  { label: 'Pinterest', href: 'https://pinterest.com/fl_bureau', icon: 'PinterestLogo' },
]

export const marqueeText =
  'FL Bureau · Дизайн интерьера · Архитектура · Авторский надзор · Предметный дизайн · '
