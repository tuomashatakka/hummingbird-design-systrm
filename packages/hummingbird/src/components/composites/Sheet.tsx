import type { FC } from 'react'
import { Fragment } from 'react'


interface SheetItem {
  term:  string
  value: string
}

interface SheetProps {
  items: SheetItem[]
}

/** A two-column spec sheet — term/value pairs on a baseline grid, term as an uppercase eyebrow. `dl[data-sheet]`. */
export const Sheet: FC<SheetProps> = ({ items }) =>
  <dl data-sheet=''>
    {items.map(({ term, value }) =>
      <Fragment key={ term }>
        <dt>{term}</dt>
        <dd>{value}</dd>
      </Fragment>)}
  </dl>

Sheet.displayName = 'Sheet'
