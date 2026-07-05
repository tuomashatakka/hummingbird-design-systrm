import type { ChangeEvent, FC } from 'react'


interface InputProps {
  type?:        'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  name?:        string
  id?:          string
  placeholder?: string
  value?:       string
  disabled?:    boolean
  required?:    boolean
  onChange?:    (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({
  type = 'text',
  name,
  id,
  placeholder,
  value,
  disabled = false,
  required = false,
  onChange,
}) =>
  <input
    type={ type }
    id={ id }
    name={ name }
    placeholder={ placeholder }
    value={ value }
    disabled={ disabled }
    required={ required }
    onChange={ onChange } />

Input.displayName = 'Input'
