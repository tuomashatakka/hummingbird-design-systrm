'use client'

import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { AppStateProvider, useSelector, useAppState, useDispatch } from './store'
import { BRAND_COLORS } from './types'


// Runs *inside* AppStateProvider so useAppState() reads live state — a
// sibling of the Provider would only ever see the context's default value.
const StateSideEffects = () => {
  const { theme, palette } = useAppState()

  // These effects reflect app state onto <html> (the theme attribute and the
  // customizer's inline custom properties) — writing to a DOM node outside
  // React's tree is a legitimate, unavoidable side effect.
  // eslint-disable-next-line react-strict/prefer-no-use-effect
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [ theme ])

  // eslint-disable-next-line react-strict/prefer-no-use-effect
  useEffect(() => {
    const root = document.documentElement

    for (const color of BRAND_COLORS) {
      const channels = palette[color]

      if (channels) {
        root.style.setProperty(`--color-${color}-l`, `${channels.lightness}%`)
        root.style.setProperty(`--color-${color}-c`, `${channels.chroma}`)
        root.style.setProperty(`--color-${color}-h`, `${channels.hue}`)
      }
      else {
        root.style.removeProperty(`--color-${color}-l`)
        root.style.removeProperty(`--color-${color}-c`)
        root.style.removeProperty(`--color-${color}-h`)
      }
    }
  }, [ palette ])

  return null
}

export const AppStateProviderWithSideEffects = ({ children }: PropsWithChildren) =>
  <AppStateProvider>
    <StateSideEffects />
    {children}
  </AppStateProvider>

export {
  useSelector,
  useAppState,
  useDispatch,
}
