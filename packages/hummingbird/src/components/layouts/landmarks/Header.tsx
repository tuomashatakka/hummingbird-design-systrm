'use client'

import type { FC } from 'react'
import { Button, Mark } from '@/components/primitives'
import { setTheme, togglePanel, useAppState, useDispatch } from '@/lib/state'


interface NavLink {
  label: string
  href:  string
}

interface HeaderProps {

  /** Wordmark next to the mark. Defaults to `Hummingbird`. */
  brand?: string

  /** Primary navigation links. */
  links?: NavLink[]
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
export const Header: FC<HeaderProps> = ({ brand = 'Hummingbird', links = DEFAULT_LINKS }) => {
  const { theme } = useAppState()
  const dispatch  = useDispatch()

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    dispatch(setTheme(next))
  }

  return <header>
    <a href='/'>
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
