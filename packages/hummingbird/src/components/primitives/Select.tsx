import type { ChangeEvent, FC } from 'react'


interface Option {
  value: string
  label: string
}

interface SelectProps {
  options:   Option[]
  name?:     string
  id?:       string
  value?:    string
  disabled?: boolean
  required?: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const Select: FC<SelectProps> = ({
  options,
  name,
  id,
  value,
  disabled = false,
  required = false,
  onChange,
}) =>
  <select
    id={ id }
    name={ name }
    value={ value }
    disabled={ disabled }
    required={ required }
    onChange={ onChange }>
    {options.map(option =>
      <option key={ option.value } value={ option.value }>{option.label}</option>)}
  </select>

Select.displayName = 'Select'
