import { useId } from 'react'
import type { FC, ReactNode } from 'react'


interface PopoverProps {

  /** Trigger label. */
  label:    ReactNode
  children: ReactNode

  /** Id tying the trigger to its popover. Auto-generated when omitted. */
  id?: string
}

/**
 * A popover built entirely on the native Popover API — `popovertarget` on the
 * trigger, `[popover]` on the panel. The browser handles open/close, light
 * dismiss, and the top layer; the invoker is the popover's implicit anchor, so
 * positioning is pure CSS. Zero JavaScript (`useId` is RSC-safe).
 */
export const Popover: FC<PopoverProps> = ({ label, children, id }) => {
  const fallbackId = useId()
  const popoverId  = id ?? fallbackId

  return <span data-popover=''>
    <button type='button' popoverTarget={ popoverId } popoverTargetAction='toggle'>
      {label}
    </button>

    <div id={ popoverId } popover='auto'>
      {children}
    </div>
  </span>
}

Popover.displayName = 'Popover'
