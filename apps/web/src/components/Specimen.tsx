import type { ReactNode } from 'react'
import { Disclosure } from 'hummingbird-design-system'
import { CodeBlock } from './CodeBlock'
import type { Lang } from 'Δ/lib/highlight'


interface SpecimenProps {
  code:  string
  lang?: Lang
  note?: string

  /** Expand the code by default. Collapsed unless set. */
  open?:     boolean
  children?: ReactNode
}

/**
 * A documentation figure: the live preview always visible, the highlighted
 * code collapsed beneath it in a native disclosure. Renders async (shiki),
 * so import it from server modules only — pass interactive demos in as
 * `children` from client-leaf files.
 */
export const Specimen = ({ code, lang = 'tsx', note, open = false, children }: SpecimenProps) =>
  <figure data-specimen=''>
    {children != null && <div data-specimen-preview=''>{children}</div>}
    {note != null && <figcaption>{note}</figcaption>}

    <Disclosure summary='Code' open={ open }>
      <CodeBlock code={ code } lang={ lang } />
    </Disclosure>
  </figure>

interface HtmlSpecimenProps {
  code:  string
  note?: string
  open?: boolean
}

/** A base-element specimen: the markup string renders the preview itself, so the code and the preview can never drift apart. */
export const HtmlSpecimen = ({ code, note, open = false }: HtmlSpecimenProps) =>
  <figure data-specimen=''>
    <div data-specimen-preview='' dangerouslySetInnerHTML={{ __html: code }} />
    {note != null && <figcaption>{note}</figcaption>}

    <Disclosure summary='Code' open={ open }>
      <CodeBlock code={ code } lang='html' />
    </Disclosure>
  </figure>
