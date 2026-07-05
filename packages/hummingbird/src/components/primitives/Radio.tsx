import type { ChangeEvent, FC, ReactNode } from 'react'


interface RadioProps {
  label:     ReactNode
  name:      string // radios share a name to form a group
  value:     string
  checked?:  boolean
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Radio: FC<RadioProps> = ({
  label,
  name,
  value,
  checked,
  disabled = false,
  onChange,
}) =>
  <label data-check>
    <input
      type='radio'
      name={ name }
      value={ value }
      checked={ checked }
      disabled={ disabled }
      onChange={ onChange } />

    <span>{label}</span>
  </label>

Radio.displayName = 'Radio'
