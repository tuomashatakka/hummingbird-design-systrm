import type { FC, ReactNode } from 'react'


interface SpecimenProps {
  code:      string
  note?:     string
  children?: ReactNode
}

/** A documentation figure: the live preview above, the code that produced it below. */
export const Specimen: FC<SpecimenProps> = ({ code, note, children }) =>
  <figure data-specimen=''>
    {children != null && <div data-specimen-preview=''>{children}</div>}
    {note != null && <figcaption>{note}</figcaption>}

    <pre>
      <code>{code}</code>
    </pre>
  </figure>

Specimen.displayName = 'Specimen'

interface HtmlSpecimenProps {
  code:  string
  note?: string
}

/** A base-element specimen: the markup string renders the preview itself, so the code and the preview can never drift apart. */
export const HtmlSpecimen: FC<HtmlSpecimenProps> = ({ code, note }) =>
  <figure data-specimen=''>
    <div data-specimen-preview='' dangerouslySetInnerHTML={{ __html: code }} />
    {note != null && <figcaption>{note}</figcaption>}

    <pre>
      <code>{code}</code>
    </pre>
  </figure>

HtmlSpecimen.displayName = 'HtmlSpecimen'
