import type { FC } from 'react'


interface ProgressProps {
  label:  string
  value?: number // omit for an indeterminate (loading) bar
  max?:   number
}

export const Progress: FC<ProgressProps> = ({ label, value, max = 100 }) =>
  <progress aria-label={ label } value={ value } max={ max } />

Progress.displayName = 'Progress'
