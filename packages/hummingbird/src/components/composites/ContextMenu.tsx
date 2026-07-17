'use client'

import { useId } from 'react'
import type { FC, ReactNode } from 'react'


export interface MenuItem {

  /** Row label. */
  label: ReactNode

  /** Action rows call this on select; the menu closes itself either way. */
  onSelect?: () => void

  /** Turns the row into a link. Takes precedence over `onSelect`. */
  href?: string

  /** Optional leading glyph (an `<Icon>`, say). */
  icon?: ReactNode

  disabled?: boolean

  /** Renders the row in the error tone (destructive actions). */
  destructive?: boolean
}

interface ContextMenuProps {

  /** Trigger label. */
  label: ReactNode

  items: MenuItem[]

  /** Id tying the trigger to its menu. Auto-generated when omitted. */
  id?: string
}

/**
 * A menu built on the native Popover API — the same machinery as `Popover`,
 * narrowed to a list of actions. The trigger toggles the menu; each action
 * row carries `popovertargetaction='hide'`, so selecting one closes the menu
 * declaratively (no open/close JS — only the consumer's `onSelect` runs).
 * Links navigate as plain `<a>`, keeping the package framework-agnostic.
 */
export const ContextMenu: FC<ContextMenuProps> = ({ label, items, id }) => {
  const fallbackId = useId()
  const menuId     = id ?? fallbackId

  return <span data-popover='' data-contextmenu=''>
    <button aria-haspopup='menu' type='button' popoverTarget={ menuId } popoverTargetAction='toggle'>
      {label}
    </button>

    <menu id={ menuId } popover='auto' role='menu'>
      {items.map((item, index) =>
        <li key={ index } role='none'>
          {item.href
            ? <a
              data-destructive={ item.destructive ? '' : undefined }
              aria-disabled={ item.disabled || undefined }
              role='menuitem'
              href={ item.href }>
              {item.icon}
              <span>{item.label}</span>
            </a>
            : <button
              data-destructive={ item.destructive ? '' : undefined }
              type='button'
              role='menuitem'
              disabled={ item.disabled }
              popoverTarget={ menuId }
              popoverTargetAction='hide'
              onClick={ item.onSelect }>
              {item.icon}
              <span>{item.label}</span>
            </button>}
        </li>)}
    </menu>
  </span>
}

ContextMenu.displayName = 'ContextMenu'
