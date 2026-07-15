'use client'

import { createStore } from 'hummingbird-design-system/state'
import { reducer } from './reducer'
import { initialState } from './types'

// The one store instance for the docs site. createStore builds its contexts
// per call, so this module must stay the single import point (Δ/lib/state) —
// a second call elsewhere would be a second, disconnected store.
export const {
  Provider: AppStateProvider,
  useStore: useAppState,
  useSelector,
  useDispatch,
} = createStore(reducer, initialState)
