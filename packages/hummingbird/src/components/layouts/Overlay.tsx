'use client'

import { useEffect } from 'react'
import type { FC, ReactNode } from 'react'


interface OverlayProps {
  children: ReactNode

  /** Whether the overlay is mounted and visible. */
  open: boolean

  /** Accessible name for the overlay region. */
  label: string

  /** Called on backdrop click or Escape. Omit for a non-dismissible layer. */
  onClose?: () => void
}

/**
 * A fixed, full-viewport overlay — an immersive takeover for loading states,
 * lightboxes, or gated content. Covers everything under a scrim and centers
 * its slot. `[data-overlay]`; closes on backdrop click / Escape when
 * `onClose` is supplied.
 */
export const Overlay: FC<OverlayProps> = ({ children, open, label, onClose }) => {
  useEffect(() => {
    if (!open || !onClose)
      return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape')
        onClose()
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [ open, onClose ])

  if (!open)
    return null

  return <div
    data-overlay=''
    role='dialog'
    aria-modal='true'
    aria-label={ label }
    onClick={ event => {
      if (event.target === event.currentTarget)
        onClose?.()
    } }>
    <div data-overlay-content=''>
      {children}
    </div>
  </div>
}

Overlay.displayName = 'Overlay'
