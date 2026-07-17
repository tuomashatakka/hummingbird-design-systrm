import type { FC, ReactNode } from 'react'


interface AlertProps {
  children: ReactNode
  variant?: 'info' | 'success' | 'error'
  title?:   string
}

export const Alert: FC<AlertProps> = ({ children, variant = 'info', title }) =>
  <aside data-alert={ variant } role={ variant === 'error' ? 'alert' : 'status' }>
    {title ? <strong>{title}</strong> : null}
    {children}
  </aside>

Alert.displayName = 'Alert'
