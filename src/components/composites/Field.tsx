import type { FC, ReactNode } from 'react'


interface FieldProps {
  label:    ReactNode
  htmlFor:  string // ties the label to the control it wraps
  children: ReactNode
  hint?:    ReactNode
  error?:   ReactNode
}

export const Field: FC<FieldProps> = ({ label, htmlFor, children, hint, error }) =>
  <div data-field>
    <label htmlFor={ htmlFor }>{label}</label>
    {children}

    {error
      ? <small role='alert'>{error}</small>
      : hint
        ? <small>{hint}</small>
        : null}
  </div>

Field.displayName = 'Field'
