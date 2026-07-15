'use client'

import { useEffect } from 'react'
import { useAppState } from './store'
import { BRAND_COLORS } from './types'

/**
 * Syncs the store to the DOM: theme onto `<html data-theme>`, palette
 * overrides as inline `--{color}-l/c/h` custom properties, where they win
 * over both light and dark token defaults. Mount once inside the provider.
 */
export function ThemeApplier () {
  const { theme, palette } = useAppState()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [ theme ])

  useEffect(() => {
    const root = document.documentElement

    for (const color of BRAND_COLORS) {
      const channels = palette[color]

      if (channels) {
        root.style.setProperty(`--${color}-l`, `${channels.lightness}%`)
        root.style.setProperty(`--${color}-c`, `${channels.chroma}`)
        root.style.setProperty(`--${color}-h`, `${channels.hue}`)
      }
      else {
        root.style.removeProperty(`--${color}-l`)
        root.style.removeProperty(`--${color}-c`)
        root.style.removeProperty(`--${color}-h`)
      }
    }
  }, [ palette ])

  return null
}
