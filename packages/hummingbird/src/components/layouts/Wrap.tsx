import type { FC, ReactNode } from 'react'


interface WrapProps {
  children: ReactNode
}

/** Page-width container — clamps content to `--page-max` and centers it. `[data-layout='wrap']`. */
export const Wrap: FC<WrapProps> = ({ children }) =>
  <div data-layout='wrap'>
    {children}
  </div>

Wrap.displayName = 'Wrap'
