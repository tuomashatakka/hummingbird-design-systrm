import type { FC } from 'react'
import { Medallion } from 'Δ/components/primitives'
import type { IconName } from 'Δ/components/primitives'


interface Capability {
  icon:  IconName
  title: string
  body:  string
}

interface CapabilityStripProps {
  items: Capability[]
}

/**
 * The "what I'm capable of" strip — a row of circular icon medallions, each
 * above a title and a line of copy. The medallions are the one place the
 * system uses a full radius. `[data-capabilities]`.
 */
export const CapabilityStrip: FC<CapabilityStripProps> = ({ items }) =>
  <ul data-capabilities=''>
    {items.map(item =>
      <li key={ item.title }>
        <Medallion icon={ item.icon } label={ item.title } />
        <h4>{item.title}</h4>
        <p>{item.body}</p>
      </li>)}
  </ul>

CapabilityStrip.displayName = 'CapabilityStrip'
