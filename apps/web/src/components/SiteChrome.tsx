'use client'

import { Button, Header, Notification } from 'hummingbird-design-system'
import { dismissNotice, setTheme, togglePanel, useAppState, useDispatch } from 'Δ/lib/state'
import type { Theme } from 'Δ/lib/state'


interface NavLink {
  label: string
  href:  string
}

const nextTheme = (theme: Theme): Theme =>
  theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'

/**
 * The app's client boundary around the package's stateless Header — wires the
 * theme cycler and panel toggle to this site's store.
 */
type SiteHeaderProps = { homeHref: string, links: NavLink[] }

export function SiteHeader ({ homeHref, links }: SiteHeaderProps) {
  const { theme } = useAppState()
  const dispatch  = useDispatch()

  return <Header
    homeHref={ homeHref }
    links={ links }
    actions={ <>
      <li>
        <Button variant='ghost' size='small' onClick={ () => dispatch(setTheme(nextTheme(theme))) }>
          theme: {theme}
        </Button>
      </li>

      <li>
        <Button variant='ghost' size='small' onClick={ () => dispatch(togglePanel()) }>
          panel
        </Button>
      </li>
    </> } />
}

/** The app's toast queue, fed from the store. */
export function SiteNotifications () {
  const { notices } = useAppState()
  const dispatch    = useDispatch()

  return <Notification notices={ notices } onDismiss={ id => dispatch(dismissNotice(id)) } />
}
