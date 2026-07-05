'use client'

import { useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'


interface DialogProps {
  children: ReactNode
  open:     boolean
  title?:   string
  footer?:  ReactNode
  onClose:  () => void
}

export const Dialog: FC<DialogProps> = ({ children, open, title, footer, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog)
      return
    if (open && !dialog.open)
      dialog.showModal()
    else if (!open && dialog.open)
      dialog.close()
  }, [ open ])

  return <dialog ref={ ref } aria-labelledby={ title ? 'dialog-title' : undefined } onClose={ onClose }>
    {title
      ? <header>
        <h3 id='dialog-title'>{title}</h3>
        <button aria-label='Close dialog' onClick={ onClose }>✕</button>
      </header>
      : null}

    <article>{children}</article>
    {footer ? <footer>{footer}</footer> : null}
  </dialog>
}

Dialog.displayName = 'Dialog'
