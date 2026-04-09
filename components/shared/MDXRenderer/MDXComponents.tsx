import Image from 'next/image'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

export const mdxComponents: MDXComponentsType = {
  h1: ({ children }) => (
    <h1 className="font-heading text-h1 text-foreground mt-12 mb-6 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-heading text-h2 text-foreground mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading text-h3 text-foreground mt-8 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-heading text-h4 text-foreground mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-body text-muted leading-relaxed mb-4">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-6 my-6 italic text-muted">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-none pl-0 mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-body text-muted flex items-start gap-2 before:content-['—'] before:text-accent before:mt-0.5 before:shrink-0">
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-muted">{children}</em>
  ),
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt }) => (
    <figure className="my-8">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
        <Image
          src={src ?? ''}
          alt={alt ?? ''}
          fill
          className="object-cover"
        />
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-label text-muted uppercase tracking-[0.12em]">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
}
