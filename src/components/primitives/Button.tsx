import type { FC, ReactNode } from 'react'
import { classNames } from '@/lib/classNames'


interface ButtonProps {
  children:  ReactNode
  variant?:  'primary' | 'ghost' | 'danger' | null
  size?:     'small' | null
  disabled?: boolean
  type?:     'button' | 'submit' | 'reset'
  onClick?:  () => void
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = null,
  size = null,
  disabled = false,
  type = 'button',
  onClick,
}) =>
  <button
    className={ classNames({ [variant ?? '']: variant, [size ?? '']: size }) }
    disabled={ disabled }
    type={ type }
    onClick={ onClick }>
    {children}
  </button>

Button.displayName = 'Button'
