import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer, Header } from '@/components/layouts'
import { AppStateProvider } from '@/lib/state'
import './globals.css'


export const metadata: Metadata = {
  title:       'Hummingbird Design System',
  description: 'A monochrome design system portfolio — semantic HTML, native elements, customizable oklch tokens, zero utility classes.',
}

interface RootLayoutProps {
  children: ReactNode
  panel:    ReactNode // ← parallel route slot, rendered from src/app/@panel
}

export default function RootLayout ({ children, panel }: RootLayoutProps) {
  return <html suppressHydrationWarning lang='en' data-theme='light'>
    <body>
      <AppStateProvider>
        <Header />
        <main>{children}</main>
        {panel}
        <Footer />
      </AppStateProvider>
    </body>
  </html>
}
