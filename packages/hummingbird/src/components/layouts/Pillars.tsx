import type { FC, ReactNode } from 'react'


interface Pillar {
  icon:        ReactNode // decorative line-icon svg, e.g. an <Icon> element
  title:       string
  description: string
  variant?:    'outline'
}

interface PillarsProps {
  items: Pillar[]
}

/** A row of icon-led feature columns — medallion, heading, body copy. `[data-layout='pillars']`. */
export const Pillars: FC<PillarsProps> = ({ items }) =>
  <div data-layout='pillars'>
    {items.map(({ icon, title, description, variant }) =>
      <div key={ title }>
        <span data-medallion={ variant || '' }>{icon}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>)}
  </div>

Pillars.displayName = 'Pillars'
