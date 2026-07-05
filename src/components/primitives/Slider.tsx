import type { ChangeEvent, FC } from 'react'


interface SliderProps {
  label:     string // names the control for assistive tech
  min:       number
  max:       number
  step?:     number
  value?:    number
  name?:     string
  id?:       string
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Slider: FC<SliderProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  name,
  id,
  disabled = false,
  onChange,
}) =>
  <input
    id={ id }
    aria-label={ label }
    type='range'
    name={ name }
    min={ min }
    max={ max }
    step={ step }
    value={ value }
    disabled={ disabled }
    onChange={ onChange } />

Slider.displayName = 'Slider'
