'use client'

import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { AppStateProvider, useSelector, useAppState, useDispatch } from './store'
import { BRAND_COLORS } from './types'


export const AppStateProviderWithSideEffects = ({ children }: PropsWithChildren) => {
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

  return <AppStateProvider>
    {children}
  </AppStateProvider>
}


export {
  useSelector,
  useAppState,
  useDispatch,
}
