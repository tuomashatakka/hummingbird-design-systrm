import type { FC, ReactNode } from 'react'


interface DisclosureProps {
  summary:  ReactNode
  children: ReactNode
  open?:    boolean
  name?:    string // shared name → native accordion behaviour, zero JS
}

export const Disclosure: FC<DisclosureProps> = ({ summary, children, open, name }) =>
  <details open={ open } name={ name }>
    <summary>{summary}</summary>
    {children}
  </details>

Disclosure.displayName = 'Disclosure'
