import Image from 'next/image'
import type { TeamMember } from '@/types'

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-md aspect-[3/4] bg-surface shadow-vibe-sm">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="mt-4">
        <h3 className="font-heading text-h4 text-foreground">{member.name}</h3>
        <p className="mt-1 text-label uppercase tracking-[0.12em] text-muted">{member.role}</p>
      </div>
    </div>
  )
}
