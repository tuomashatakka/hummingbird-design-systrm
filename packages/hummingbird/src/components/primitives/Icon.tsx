import type { FC, ReactNode } from 'react'


// A small, hand-picked line-icon set (Feather geometry, 24×24) covering the
// affordances the identity actually uses: contact meta, capability medallions,
// bylines, and navigation. Stroke width / caps are governed by CSS, not props,
// so every icon inherits `currentColor` and the system's 1.6px hairline stroke.
const PATHS: Record<string, ReactNode> = {
  user: <>
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
    <circle cx='12' cy='7' r='4' />
  </>,
  umbrella: <path d='M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7' />,
  award:    <>
    <circle cx='12' cy='8' r='7' />
    <polyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88' />
  </>,
  mail: <>
    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
    <polyline points='22,6 12,13 2,6' />
  </>,
  phone: <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />,
  pin:   <>
    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
    <circle cx='12' cy='10' r='3' />
  </>,
  clock: <>
    <circle cx='12' cy='12' r='10' />
    <polyline points='12 6 12 12 16 14' />
  </>,
  arrow: <>
    <line x1='5' y1='12' x2='19' y2='12' />
    <polyline points='12 5 19 12 12 19' />
  </>,
  close: <>
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </>,
  menu: <>
    <line x1='3' y1='12' x2='21' y2='12' />
    <line x1='3' y1='6' x2='21' y2='6' />
    <line x1='3' y1='18' x2='21' y2='18' />
  </>,
}

export type IconName = keyof typeof PATHS

interface IconProps {
  name:   IconName
  label?: string // accessible name; omitted → decorative
}

export const Icon: FC<IconProps> = ({ name, label }) =>
  <svg
    data-icon={ name }
    viewBox='0 0 24 24'
    aria-hidden={ label ? undefined : true }
    aria-label={ label }
    role={ label ? 'img' : undefined }
    xmlns='http://www.w3.org/2000/svg'>
    {PATHS[name]}
  </svg>

Icon.displayName = 'Icon'
