import type { FC } from 'react'


interface DividerProps {

  /** Eyebrow text centered on the rule. Omit for a plain `<hr>`. */
  label?: string
}

/**
 * A horizontal rule, optionally carrying an eyebrow label in the middle —
 * `hr` is a void element, so the text rides in `::after` via `attr()`.
 * On a non-paper surface, override the chip background to match.
 */
export const Divider: FC<DividerProps> = ({ label }) =>
  <hr data-label={ label } />

Divider.displayName = 'Divider'
