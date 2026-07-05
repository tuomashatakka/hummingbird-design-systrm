'use client'

import Link from 'next/link'
import type { FC } from 'react'
import { Button, Mark } from '@/components/primitives'
import { setTheme, togglePanel, useAppState, useDispatch } from '@/lib/state'


export const Header: FC = () => {
  const { theme } = useAppState()
  const dispatch  = useDispatch()

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    dispatch(setTheme(next))
  }

  return <header>
    <Link href='/'>
      <Mark />
      <strong>Hummingbird</strong>
    </Link>

    <nav aria-label='Main'>
      <Link href='/'>Home</Link>
      <Link href='/design-system'>Design system</Link>
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
