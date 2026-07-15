import type { FC, ReactNode } from 'react'


interface FooterProps {

  /** Footer line, rendered inside a `<small>`. Omit for an empty landmark. */
  children?: ReactNode
}

export const Footer: FC<FooterProps> = ({ children }) =>
  <footer>
    {children != null && <small>{children}</small>}
  </footer>

Footer.displayName = 'Footer'
