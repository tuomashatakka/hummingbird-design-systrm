// hummingbird-design-system — the component surface + the global state runtime.
//
// Import the CSS separately (side-effect stylesheet, tokens + fonts fallback):
//   import 'hummingbird-design-system/styles'
//
// This entry is the ONE home of the state runtime (provider, hooks, actions);
// the ./state entry re-exports from here so the two entries can never carry
// two separate React context instances.

export * from './components/primitives'
export * from './components/composites'
export * from './components/layouts'
export * from './lib/state'
