import type { FC } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'


interface MedallionProps {
  icon:     IconName
  label?:   string // accessible name for the glyph
  variant?: 'outline'
}

/**
 * A circular icon medallion — the one place the system breaks its squared-corner
 * rule (`--radius-full`). A grey disc with a reversed line glyph, used in the
 * capability strip. `[data-medallion]`.
 */
export const Medallion: FC<MedallionProps> = ({ icon, label, variant }) =>
  <span data-medallion={ variant || '' }>
    <Icon name={ icon } label={ label } />
  </span>

Medallion.displayName = 'Medallion'
