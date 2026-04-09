'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

interface NavLinkProps {
  href: string
  label: string
  onClick?: () => void
  className?: string
}

export function NavLink({ href, label, onClick, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative text-label uppercase tracking-[0.12em] transition-colors duration-300',
        isActive ? 'text-foreground' : 'text-muted hover:text-foreground',
        'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300',
        isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
        className
      )}
    >
      {label}
    </Link>
  )
}
