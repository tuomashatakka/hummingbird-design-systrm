import type { FC } from 'react'


interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: Crumb[]
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ items }) =>
  <nav aria-label='Breadcrumb'>
    <ol>
      {items.map((item, index) => {
        const last = index === items.length - 1

        return <li key={ item.href ?? item.label }>
          {item.href && !last
            ? <a href={ item.href }>{item.label}</a>
            : <span aria-current={ last ? 'page' : undefined }>{item.label}</span>}
        </li>
      })}
    </ol>
  </nav>

Breadcrumb.displayName = 'Breadcrumb'
