'use client'

import { useEffect } from 'react'
import type { FC } from 'react'
import { Button, Icon } from 'Δ/components/primitives'
import { dismissNotice, useAppState, useDispatch } from 'Δ/lib/state'


interface NotificationProps {

  /** Auto-dismiss delay in ms. `0` keeps notices until dismissed. Default 6000. */
  timeout?: number
}

/**
 * The toast region — renders the global reducer's `notices` as a fixed,
 * live-announced stack. Push with `dispatch(pushNotice(...))` from anywhere;
 * each toast dismisses on its button or, unless `timeout` is 0, on a timer.
 * Mount once, near the root. `[data-notifications]`.
 */
export const Notification: FC<NotificationProps> = ({ timeout = 6000 }) => {
  const { notices } = useAppState()
  const dispatch    = useDispatch()

  useEffect(() => {
    if (timeout <= 0 || notices.length === 0)
      return

    const timers = notices.map(notice =>
      window.setTimeout(() => dispatch(dismissNotice(notice.id)), timeout))

    return () => timers.forEach(window.clearTimeout)
  }, [ notices, timeout, dispatch ])

  return <output data-notifications='' aria-live='polite'>
    {notices.map(notice =>
      <article key={ notice.id } data-notice='' data-kind={ notice.kind }>
        <p>{notice.message}</p>

        <Button
          variant='ghost'
          size='small'
          onClick={ () => dispatch(dismissNotice(notice.id)) }>
          <Icon name='close' label='Dismiss' />
        </Button>
      </article>)}
  </output>
}

Notification.displayName = 'Notification'
