import { createElement } from 'react'
import type { FC, ReactNode } from 'react'


interface HeadingProps {
  children: ReactNode
  level:    1 | 2 | 3 | 4 | 5 | 6
  id?:      string
}

export const Heading: FC<HeadingProps> = ({ children, level, id }) =>
  createElement(`h${level}`, { id }, children)

Heading.displayName = 'Heading'
