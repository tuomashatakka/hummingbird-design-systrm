import type { FC, ReactNode } from 'react'
import { Mark } from 'Δ/components/primitives'


interface NavLink {
  label: string
  href:  string

  /** Marks this link as the current page/section — renders `aria-current='page'`. */
  current?: boolean
}

interface HeaderProps {

  /** Wordmark next to the mark. Defaults to `Hummingbird`. */
  brand?: string

  /** Primary navigation links. Omit for no nav. */
  links?: NavLink[]

  /**
   * Destination of the brand lockup. Defaults to `/`. Override it when the
   * site is served from a sub-path (e.g. GitHub Pages `basePath`) so the
   * plain anchor resolves under that prefix instead of the domain root.
   */
  homeHref?: string

  /**
   * Right-hand controls, rendered inside a `<menu>` — pass `<li>` items
   * (theme switcher, panel toggle, …). The header holds no state of its own.
   */
  actions?: ReactNode
}

/**
 * The sticky page header landmark — brand lockup, primary nav, and an
 * `actions` slot for the consumer's own controls. Uses plain anchors, so it
 * drops into any framework; wrap the links yourself if you want client-side
 * routing.
 */
export const Header: FC<HeaderProps> = ({ brand = 'Hummingbird', links = [], homeHref = '/', actions }) =>
  <header>
    <a href={ homeHref }>
      <Mark />
      <strong>{brand}</strong>
    </a>

    {links.length > 0 &&
      <nav aria-label='Main'>
        {links.map(link =>
          <a key={ link.href } aria-current={ link.current ? 'page' : undefined } href={ link.href }>{link.label}</a>)}
      </nav>}

    {actions != null && <menu>{actions}</menu>}
  </header>

Header.displayName = 'Header'
