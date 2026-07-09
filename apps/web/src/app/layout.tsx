import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer, Header, Notification } from '@tuomashatakka/hummingbird-design-system'
import { AppStateProvider } from '@tuomashatakka/hummingbird-design-system/state'
import './globals.css'


export const metadata: Metadata = {
  title:       'Hummingbird Design System',
  description: 'A monochrome design system portfolio — semantic HTML, native elements, customizable oklch tokens, zero utility classes.',
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
  return <html suppressHydrationWarning lang='en' data-theme='light'>
    <body>
      <AppStateProvider>
        <Header
          homeHref={ withBase('/') }
          links={ [
            { label: 'Home', href: withBase('/') },
            { label: 'Portfolio', href: withBase('/portfolio') },
            { label: 'Design system', href: withBase('/design-system') },
          ] } />

        <main>{children}</main>
        {panel}
        <Footer />
        <Notification />
      </AppStateProvider>
    </body>
  </html>
}
