import type { FC, ReactNode } from 'react'


interface MetaItem {
  label: string
  value: ReactNode
}

interface MetaProps {
  items: MetaItem[]
}

/** Label / value pairs on hairline rules — the identity's fact list. */
export const Meta: FC<MetaProps> = ({ items }) =>
  <dl data-meta=''>
    {items.map(item =>
      <div key={ item.label }>
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </div>)}
  </dl>

Meta.displayName = 'Meta'
