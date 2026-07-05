import type { FC } from 'react'
import { Mark } from '@/components/primitives'


interface LockupProps {

  /** Wordmark shown next to the mark. Defaults to `Hummingbird`. */
  wordmark?: string

  /** `inverse` tunes the lockup for dark slate panels / photo overlays. */
  variant?: 'inverse' | null
}

/**
 * The brand lockup — the hummingbird mark beside its wordmark. Used in the
 * header and on the founder card. `[data-lockup]`; both marks inherit
 * `currentColor`, so the inverse treatment is just a color context.
 */
export const Lockup: FC<LockupProps> = ({ wordmark = 'Hummingbird', variant = null }) =>
  <span data-lockup={ variant ?? '' }>
    <Mark />
    <strong>{wordmark}</strong>
  </span>

Lockup.displayName = 'Lockup'
