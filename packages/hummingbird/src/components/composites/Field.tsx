import type { FC, ReactNode } from 'react'


interface FieldProps {
  label:    ReactNode
  children: ReactNode
  hint?:    ReactNode
  error?:   ReactNode
}

/**
 * A form field: the label IS the wrapper, so the association is implicit —
 * no `htmlFor`, no ids to keep in sync. Clicking any of it focuses the
 * control. Don't nest self-labelling controls (Checkbox/Radio/Switch, which
 * render `label[data-check]`) inside — a label inside a label is invalid;
 * don't put links in `hint` either, clicks there focus the control.
 */
export const Field: FC<FieldProps> = ({ label, children, hint, error }) =>
  <label data-field>
    <span>{label}</span>
    {children}

    {error
      ? <small role='alert'>{error}</small>
      : hint
        ? <small>{hint}</small>
        : null}
  </label>

Field.displayName = 'Field'
