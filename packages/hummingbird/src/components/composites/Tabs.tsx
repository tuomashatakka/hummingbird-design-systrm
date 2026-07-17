'use client'

import { useId, useRef, useState } from 'react'
import type { FC, KeyboardEvent, ReactNode } from 'react'


interface Tab {
  id:      string
  label:   string
  content: ReactNode
}

interface TabsProps {
  tabs:  Tab[]
  label: string // names the tablist for assistive tech
}

export const Tabs: FC<TabsProps> = ({ tabs, label }) => {
  const base                  = useId()
  const [ active, setActive ] = useState(0)
  const refs                  = useRef<(HTMLButtonElement | null)[]>([])

  const select = (index: number) => {
    setActive(index)
    refs.current[index]?.focus()
  }

  // roving tabindex: arrow keys move selection and focus together
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')
      return
    event.preventDefault()

    const dir = event.key === 'ArrowRight' ? 1 : -1
    select((active + dir + tabs.length) % tabs.length)
  }

  return <section data-tabs>
    <div aria-label={ label } role='tablist'>
      {tabs.map((tab, index) =>
        <button
          key={ tab.id }
          ref={ element => {
            refs.current[index] = element
          } }
          id={ `${base}-tab-${tab.id}` }
          aria-selected={ index === active }
          aria-controls={ `${base}-panel-${tab.id}` }
          type='button'
          role='tab'
          tabIndex={ index === active ? 0 : -1 }
          onClick={ () => setActive(index) }
          onKeyDown={ handleKeyDown }>
          {tab.label}
        </button>)}
    </div>

    {tabs.map((tab, index) =>
      <div
        key={ tab.id }
        id={ `${base}-panel-${tab.id}` }
        aria-labelledby={ `${base}-tab-${tab.id}` }
        role='tabpanel'
        hidden={ index !== active }
        tabIndex={ 0 }>
        {tab.content}
      </div>)}
  </section>
}

Tabs.displayName = 'Tabs'
