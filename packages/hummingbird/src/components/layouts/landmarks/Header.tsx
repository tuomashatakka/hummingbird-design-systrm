'use client'

import type { FC } from 'react'
import { Button, Mark } from 'Δ/components/primitives'
import { setTheme, togglePanel, useAppState, useDispatch } from 'Δ/lib/state'


interface NavLink {
  label: string
  href:  string
}

interface HeaderProps {

  /** Wordmark next to the mark. Defaults to `Hummingbird`. */
  brand?: string

  /** Primary navigation links. */
  links?: NavLink[]

  /**
   * Destination of the brand lockup. Defaults to `/`. Override it when the
   * site is served from a sub-path (e.g. GitHub Pages `basePath`) so the
   * plain anchor resolves under that prefix instead of the domain root.
   */
  homeHref?: string
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Design system', href: '/design-system' },
]

/**
 * The sticky page header landmark — brand lockup, primary nav, and the theme /
 * panel controls wired to the global reducer. Uses plain anchors, so it drops
 * into any framework; wrap the links yourself if you want client-side routing.
 */
export const Header: FC<HeaderProps> = ({ brand = 'Hummingbird', links = DEFAULT_LINKS, homeHref = '/' }) => {
  const { theme } = useAppState()
  const dispatch  = useDispatch()

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    dispatch(setTheme(next))
  }

  return <header>
    <a href={ homeHref }>
      <Mark />
      <strong>{brand}</strong>
    </a>

    <nav aria-label='Main'>
      {links.map(link => <a key={ link.href } href={ link.href }>{link.label}</a>)}
    </nav>

    <menu>
      <li>
        <Button variant='ghost' size='small' onClick={ cycleTheme }>
          theme: {theme}
        </Button>
      </li>

      <li>
        <Button variant='ghost' size='small' onClick={ () => dispatch(togglePanel()) }>
          panel
        </Button>
      </li>
    </menu>
  </header>
}

Header.displayName = 'Header'
