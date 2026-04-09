import Image from 'next/image'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (!images.length) return null

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <div key={i} className={`relative overflow-hidden rounded-md bg-surface ${i === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <Image
            src={src}
            alt={`${title} — фото ${i + 1}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}
