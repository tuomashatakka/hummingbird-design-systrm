import type { FC, ReactNode } from 'react'


interface CardProps {
  children: ReactNode
  title?:   string
  footer?:  ReactNode
}

export const Card: FC<CardProps> = ({ children, title, footer }) =>
  <article className='card'>
    {title
      ? <header>
        <h3>{title}</h3>
      </header>
      : null}

    <div>{children}</div>
    {footer ? <footer>{footer}</footer> : null}
  </article>

Card.displayName = 'Card'
