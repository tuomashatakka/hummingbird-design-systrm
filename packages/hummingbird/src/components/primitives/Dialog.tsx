'use client'

import { useEffect, useId, useRef } from 'react'
import type { FC, MouseEvent, ReactNode, SyntheticEvent } from 'react'


interface DialogProps {
  children: ReactNode
  open:     boolean
  onClose:  () => void
  title?:   ReactNode
  footer?:  ReactNode

  /** Accessible name when no `title` header is rendered. */
  label?: string

  /**
   * `card` (default) — the standard modal card.
   * `overlay` — a full-viewport immersive takeover on an opaque scrim.
   */
  variant?: 'card' | 'overlay'

  /** Modal (`showModal()`: top layer, backdrop, focus trap) vs non-modal (`show()`). Default true. */
  modal?: boolean

  /** Escape / backdrop-click dismissal. `false` gates the content behind an explicit action. Default true. */
  dismissible?: boolean
}

/**
 * The one overlay surface — a native `<dialog>`. Everything the platform
 * provides (top layer, ::backdrop, focus trapping, Escape) is used as-is;
 * `variant='overlay'` restyles it as an immersive takeover.
 */
export const Dialog: FC<DialogProps> = ({
  children, open, onClose, title, footer,
  label, variant = 'card', modal = true, dismissible = true,
}) => {
  const ref     = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog)
      return

    // Native light-dismiss where the platform has it (closedby, Chrome 134+);
    // set via the effect since the TS JSX types don't carry it yet. The
    // cancel/click handlers below cover engines without it.
    dialog.setAttribute('closedby', dismissible ? 'any' : 'none')

    if (open && !dialog.open)
      if (modal)
        dialog.showModal()
      else
        dialog.show()
    else if (!open && dialog.open)
      dialog.close()
  }, [ open, modal, dismissible ])

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (!dismissible)
      event.preventDefault()
  }

  // Clicks on ::backdrop register on the dialog element itself.
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (dismissible && event.target === event.currentTarget)
      onClose()
  }

  return <dialog
    ref={ ref }
    data-variant={ variant === 'overlay' ? 'overlay' : undefined }
    aria-labelledby={ title ? titleId : undefined }
    aria-label={ !title ? label : undefined }
    onClose={ onClose }
    onCancel={ onCancel }
    onClick={ onBackdropClick }>
    {title
      ? <header>
        <h3 id={ titleId }>{title}</h3>
        <button aria-label='Close dialog' onClick={ onClose }>✕</button>
      </header>
      : null}

    <article>{children}</article>
    {footer ? <footer>{footer}</footer> : null}
  </dialog>
}

Dialog.displayName = 'Dialog'
