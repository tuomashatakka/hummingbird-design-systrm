'use client'

import { Button, ButtonGroup } from 'hummingbird-design-system'
import { createStore } from 'hummingbird-design-system/state'
import { pushNotice, setPanel, useAppState, useDispatch } from 'Δ/lib/state'


// — a complete store in four lines: state, actions, reducer, createStore —

interface CounterState { count: number }

type CounterAction =
  | { type: 'increment' } |
  { type: 'decrement' } |
  { type: 'reset' }

const counter = createStore<CounterState, CounterAction>(
  (state, action) => {
    switch (action.type) {
      case 'increment': return { count: state.count + 1 }
      case 'decrement': return { count: state.count - 1 }
      case 'reset': return { count: 0 }
      default: return state
    }
  },
  { count: 0 },
)

const Counter = () => {
  const { count } = counter.useStore()
  const dispatch  = counter.useDispatch()

  return <div data-layout='cluster'>
    <ButtonGroup label='Counter'>
      <Button onClick={ () => dispatch({ type: 'decrement' }) }>−</Button>
      <Button onClick={ () => dispatch({ type: 'increment' }) }>+</Button>
      <Button variant='ghost' onClick={ () => dispatch({ type: 'reset' }) }>Reset</Button>
    </ButtonGroup>

    <output>{count}</output>
  </div>
}

/** The live counter — its provider mounts right here, scoped to the demo. */
export const CounterDemo = () =>
  <counter.Provider>
    <Counter />
  </counter.Provider>

/** Live widgets wired to THIS site's real store. */
export const CaseStudyDemo = () => {
  const state    = useAppState()
  const dispatch = useDispatch()

  return <div data-layout='stack'>
    <pre aria-label='Current app state'>
      {JSON.stringify(state, null, 2)}
    </pre>

    <div data-layout='cluster'>
      <Button onClick={ () => dispatch(pushNotice('Pushed from the state guide.')) }>
        Push notice
      </Button>

      <Button variant='ghost' onClick={ () => dispatch(setPanel(!state.panelOpen)) }>
        Toggle panel
      </Button>
    </div>
  </div>
}
