import type { ChangeEvent, FC } from 'react'


interface TextareaProps {
  name?:        string
  id?:          string
  placeholder?: string
  value?:       string
  rows?:        number
  disabled?:    boolean
  required?:    boolean
  onChange?:    (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea: FC<TextareaProps> = ({
  name,
  id,
  placeholder,
  value,
  rows,
  disabled = false,
  required = false,
  onChange,
}) =>
  <textarea
    id={ id }
    name={ name }
    placeholder={ placeholder }
    value={ value }
    rows={ rows }
    disabled={ disabled }
    required={ required }
    onChange={ onChange } />

Textarea.displayName = 'Textarea'
