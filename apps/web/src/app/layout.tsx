import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from 'hummingbird-design-system'
import { AppStateProvider } from 'Δ/lib/state'
import { SiteHeader, SiteNotifications } from 'Δ/components/SiteChrome'
import './globals.css'


export const metadata: Metadata = {
  title:       'Hummingbird Design System',
  description: 'A monochrome design system — semantic HTML, native elements, customizable oklch tokens, zero utility classes.',
}

interface RootLayoutProps {
  children: ReactNode
  panel:    ReactNode // ← parallel route slot, rendered from src/app/@panel
}

// The site is served from a sub-path on GitHub Pages (basePath = /<repo>).
// `next/link` prepends it automatically, but the Header renders plain <a> tags
// (the package is framework-agnostic), so its hrefs must be prefixed by hand.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const withBase = (href: string) => `${basePath}${href}`

export default function RootLayout ({ children, panel }: RootLayoutProps) {
  return <html suppressHydrationWarning lang='en'>
    <body>
      <AppStateProvider>

        <SiteHeader
          homeHref={ withBase('/') }
          links={ [
            { label: 'Home', href: withBase('/') },
            { label: 'Design system', href: withBase('/design-system') },
            { label: 'State', href: withBase('/design-system/state') },
          ] } />

        <main>{children}</main>
        {panel}

        <Footer>
          Hummingbird — a monochrome design system. Semantic markup, native elements, zero utility classes.
        </Footer>

        <SiteNotifications />
      </AppStateProvider>
    </body>
  </html>
}
