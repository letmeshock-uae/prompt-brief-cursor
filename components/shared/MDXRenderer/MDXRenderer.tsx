import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from './MDXComponents'

interface MDXRendererProps {
  source: string
}

export function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose-fl">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  )
}
