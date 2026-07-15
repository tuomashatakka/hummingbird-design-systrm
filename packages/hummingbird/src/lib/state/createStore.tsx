'use client'

import { createContext, useContext, useReducer } from 'react'
import type { Dispatch, FC, ReactNode, Reducer } from 'react'


export interface StoreProviderProps<S> {
  children: ReactNode

  /** Per-mount override of the store's initial state (e.g. SSR-derived). */
  initialState?: S
}

export interface Store<S, A> {
  Provider:    FC<StoreProviderProps<S>>
  useStore:    () => S
  useSelector: <T>(selector: (state: S) => T) => T
  useDispatch: () => Dispatch<A>
}

/**
 * Build a typed reducer store: the design system ships no state shape and
 * no actions of its own — the consuming app brings both. Each call creates
 * its own pair of React contexts, so multiple independent stores coexist.
 *
 * Call it once per store, at module scope, and import the result from that
 * one module everywhere — a second call is a second store.
 *
 * `useSelector` is ergonomic sugar over the state context; it does not
 * subscribe to slices, so it re-renders exactly as often as `useStore`.
 */
export function createStore<S, A> (reducer: Reducer<S, A>, initialState: S): Store<S, A> {
  const StateContext    = createContext<S>(initialState)
  const DispatchContext = createContext<Dispatch<A>>(() => undefined)

  StateContext.displayName    = 'StoreStateContext'
  DispatchContext.displayName = 'StoreDispatchContext'

  const Provider: FC<StoreProviderProps<S>> = ({ children, initialState: override }) => {
    const [ state, dispatch ] = useReducer(reducer, override ?? initialState)

    return <StateContext.Provider value={ state }>
      <DispatchContext.Provider value={ dispatch }>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  }

  const useStore    = () => useContext(StateContext)
  const useSelector = <T,>(selector: (state: S) => T): T => selector(useContext(StateContext))
  const useDispatch = () => useContext(DispatchContext)

  return { Provider, useStore, useSelector, useDispatch }
}
