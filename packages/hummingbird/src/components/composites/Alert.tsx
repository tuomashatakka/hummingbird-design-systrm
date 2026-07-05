import type { FC, ReactNode } from 'react'


interface AlertProps {
  children: ReactNode
  variant?: 'info' | 'success' | 'danger'
  title?:   string
}

export const Alert: FC<AlertProps> = ({ children, variant = 'info', title }) =>
  <aside data-alert={ variant } role={ variant === 'danger' ? 'alert' : 'status' }>
    {title ? <strong>{title}</strong> : null}
    {children}
  </aside>

Alert.displayName = 'Alert'
