'use client'

import type { FC, ReactNode } from 'react'
import { Button } from 'Δ/components/primitives'
import { setPanel, useAppState, useDispatch } from 'Δ/lib/state'


interface PanelProps {
  children: ReactNode
  label:    string
}

export const Panel: FC<PanelProps> = ({ children, label }) => {
  const { panelOpen } = useAppState()
  const dispatch      = useDispatch()

  if (!panelOpen)
    return null

  return <aside data-slot='panel' aria-label={ label }>
    <header data-layout='cluster'>
      <h6>{label}</h6>

      <Button variant='ghost' size='small' onClick={ () => dispatch(setPanel(false)) }>
        ✕
      </Button>
    </header>

    {children}
  </aside>
}

Panel.displayName = 'Panel'
