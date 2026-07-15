import { highlight } from 'Δ/lib/highlight'
import type { Lang } from 'Δ/lib/highlight'


interface CodeBlockProps {
  code:  string
  lang?: Lang
}

/** Server-side highlighted code (shiki) — async, so server modules only. */
export async function CodeBlock ({ code, lang = 'tsx' }: CodeBlockProps) {
  const html = await highlight(code.trim(), lang)

  return <div data-code-block='' dangerouslySetInnerHTML={{ __html: html }} />
}
