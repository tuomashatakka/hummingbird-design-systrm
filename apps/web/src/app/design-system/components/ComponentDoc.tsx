import type { ReactNode } from 'react'
import { Heading } from 'hummingbird-design-system'
import { Specimen } from 'Δ/components/Specimen'
import type { Lang } from 'Δ/lib/highlight'


export interface ComponentEntry {

  /** Component name; its slug becomes the anchor id. */
  name: string

  /** The element(s) the component renders to. */
  renders: string

  /** Essential props, comma-separated. */
  props:       string
  description: ReactNode
  code:        string
  lang?:       Lang

  /** Live preview. Interactive demos come from client-leaf modules. */
  preview: ReactNode
}

export const slug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** One component, documented once: heading, meta line, prose, live preview + collapsed code. */
type ComponentDocProps = { entry: ComponentEntry }

export const ComponentDoc = ({ entry }: ComponentDocProps) =>
  <article>
    <Heading id={ slug(entry.name) } level={ 3 }>{entry.name}</Heading>

    <p>
      <small>
        renders
        {' '}
        <code>{entry.renders}</code>
        {' '}
        · props
        {' '}
        <code>{entry.props || '—'}</code>
      </small>
    </p>

    {typeof entry.description === 'string' ? <p>{entry.description}</p> : entry.description}

    <Specimen code={ entry.code } lang={ entry.lang }>
      {entry.preview}
    </Specimen>
  </article>

/** The scannable per-category overview, generated from the same registry rows. */
type AtAGlanceProps = { entries: ComponentEntry[] }

export const AtAGlance = ({ entries }: AtAGlanceProps) =>
  <table>
    <thead>
      <tr>
        <th>Component</th>
        <th>Renders</th>
        <th>Props</th>
      </tr>
    </thead>

    <tbody>
      {entries.map(entry =>
        <tr key={ entry.name }>
          <td>
            <a href={ `#${slug(entry.name)}` }>{entry.name}</a>
          </td>

          <td>
            <code>{entry.renders}</code>
          </td>

          <td>
            <code>{entry.props || '—'}</code>
          </td>
        </tr>)}
    </tbody>
  </table>
