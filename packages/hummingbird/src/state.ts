// The `hummingbird-design-system/state` entry — a thin shim over the package
// root. The factory must live in exactly one bundle: when this entry carried
// its own copy of ./lib/state, apps that mounted a provider from here while
// components consumed the root's copy got two different React runtimes. The
// self-referencing import is externalized by bunchee, so both entries resolve
// to the same runtime at load time.
export { createStore } from './lib/state'
export type { Store, StoreProviderProps } from './lib/state'
