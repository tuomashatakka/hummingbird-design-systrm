import type { FC } from 'react'


interface SpinnerProps {

  /** Accessible name. Defaults to `Loading`. */
  label?: string

  size?: 'small' | null
}

/**
 * A pure-CSS loading spinner — a hairline circle with an accent arc,
 * turned by a keyframe animation. `[data-spinner]` works on a plain
 * `<span>` too; freezes under reduced motion.
 */
export const Spinner: FC<SpinnerProps> = ({ label = 'Loading', size = null }) =>
  <span data-spinner={ size ?? '' } role='status' aria-label={ label } />

Spinner.displayName = 'Spinner'
