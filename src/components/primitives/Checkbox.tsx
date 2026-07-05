import type { ChangeEvent, FC, ReactNode } from 'react'


interface CheckboxProps {
  label:     ReactNode
  name?:     string
  value?:    string
  checked?:  boolean
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  name,
  value,
  checked,
  disabled = false,
  onChange,
}) =>
  <label data-check>
    <input
      type='checkbox'
      name={ name }
      value={ value }
      checked={ checked }
      disabled={ disabled }
      onChange={ onChange } />

    <span>{label}</span>
  </label>

Checkbox.displayName = 'Checkbox'
