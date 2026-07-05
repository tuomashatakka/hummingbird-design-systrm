import type { FC } from 'react'


interface Pillar {
  label: string // UPPERCASE service label
  title: string // sentence-case headline
  body:  string
}

interface PillarsProps {
  items: Pillar[]
}

/**
 * The three-pillar service strip — the identity's recurring
 * "Websites · Web Development · Graphic Design" block. A hairline-separated
 * row of equal columns, each an eyebrow label, a headline, and a sentence.
 * `[data-pillars]`.
 */
export const Pillars: FC<PillarsProps> = ({ items }) =>
  <ul data-pillars=''>
    {items.map(item =>
      <li key={ item.label }>
        <h6>{item.label}</h6>
        <h4>{item.title}</h4>
        <p>{item.body}</p>
      </li>)}
  </ul>

Pillars.displayName = 'Pillars'
