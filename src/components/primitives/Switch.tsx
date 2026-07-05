import type { ChangeEvent, FC, ReactNode } from 'react'


interface SwitchProps {
  label:     ReactNode
  name?:     string
  checked?:  boolean
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Switch: FC<SwitchProps> = ({
  label,
  name,
  checked,
  disabled = false,
  onChange,
}) =>
  <label data-check>
    <input
      type='checkbox'
      role='switch'
      name={ name }
      checked={ checked }
      disabled={ disabled }
      onChange={ onChange } />

    <span>{label}</span>
  </label>

Switch.displayName = 'Switch'
