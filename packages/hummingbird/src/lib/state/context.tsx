'use client'

import { createContext, useContext, useEffect, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'
import { reducer } from './reducer'
import { BRAND_COLORS, initialState } from './types'
import type { AppAction, AppState } from './types'


const StateContext    = createContext<AppState>(initialState)
const DispatchContext = createContext<Dispatch<AppAction>>(() => undefined)

StateContext.displayName    = 'AppStateContext'
DispatchContext.displayName = 'AppDispatchContext'

type AppStateProviderProps = { children: ReactNode }

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme
  }, [ state.theme ])

  // Palette overrides land as inline custom properties on <html>,
  // where they win over both light and dark token defaults.
  useEffect(() => {
    const root = document.documentElement

    for (const color of BRAND_COLORS) {
      const channels = state.palette[color]

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
  }, [ state.palette ])

  return <StateContext.Provider value={ state }>
    <DispatchContext.Provider value={ dispatch }>
      {children}
    </DispatchContext.Provider>
  </StateContext.Provider>
}

export const useAppState = () => useContext(StateContext)
export const useDispatch = () => useContext(DispatchContext)
