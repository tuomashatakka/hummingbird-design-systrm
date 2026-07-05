import type { FC, ReactNode } from 'react'


interface PopoverProps {

  /** Trigger label. */
  label:    ReactNode
  children: ReactNode

  /** Unique id tying the trigger to its popover (required by the platform API). */
  id: string
}

/**
 * A popover built entirely on the native Popover API — `popovertarget` on the
 * trigger, `[popover]` on the panel. The browser handles open/close, light
 * dismiss, and the top layer; the invoker is the popover's implicit anchor, so
 * positioning is pure CSS. Zero JavaScript.
 */
export const Popover: FC<PopoverProps> = ({ label, children, id }) =>
  <span data-popover=''>
    <button type='button' popoverTarget={ id } popoverTargetAction='toggle'>
      {label}
    </button>

    <div id={ id } popover='auto' role='dialog'>
      {children}
    </div>
  </span>

Popover.displayName = 'Popover'
