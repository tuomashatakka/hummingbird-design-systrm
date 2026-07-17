'use client'

import { useEffect } from 'react'
import type { FC } from 'react'
import { Button, Icon } from 'Δ/components/primitives'


export interface Notice {
  id:      string
  kind:    'info' | 'success' | 'error'
  message: string
}

interface NotificationProps {

  /** The toasts to show — the consumer owns the queue. */
  notices: Notice[]

  /** Called with a notice id when its dismiss button or timer fires. */
  onDismiss: (id: string) => void

  /** Auto-dismiss delay in ms. `0` keeps notices until dismissed. Default 6000. */
  timeout?: number
}

/**
 * The toast region — renders the consumer's `notices` as a fixed,
 * live-announced stack. Each toast dismisses on its button or, unless
 * `timeout` is 0, on a timer. Mount once, near the root. `[data-notifications]`.
 */
export const Notification: FC<NotificationProps> = ({ notices, onDismiss, timeout = 6000 }) => {
  // Auto-dismiss timers are a genuine side effect (window.setTimeout) with
  // cleanup — the archetypal, unavoidable useEffect case.
  // eslint-disable-next-line react-strict/prefer-no-use-effect
  useEffect(() => {
    if (timeout <= 0 || notices.length === 0)
      return

    const timers = notices.map(notice =>
      window.setTimeout(() => onDismiss(notice.id), timeout))

    return () => timers.forEach(window.clearTimeout)
  }, [ notices, timeout, onDismiss ])

  return <output data-notifications='' aria-live='polite'>
    {notices.map(notice =>
      <article key={ notice.id } data-notice='' data-kind={ notice.kind }>
        <p>{notice.message}</p>

        <Button
          variant='ghost'
          size='small'
          onClick={ () => onDismiss(notice.id) }>
          <Icon name='close' label='Dismiss' />
        </Button>
      </article>)}
  </output>
}

Notification.displayName = 'Notification'
