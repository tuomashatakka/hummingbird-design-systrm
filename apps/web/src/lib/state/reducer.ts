import type { AppAction, AppState } from './types'


export function reducer (state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'theme/set':
      return { ...state, theme: action.theme }
    case 'palette/set':
      return { ...state, palette: { ...state.palette, [action.color]: action.channels }}
    case 'palette/reset':
      return { ...state, palette: {}}
    case 'panel/toggle':
      return { ...state, panelOpen: !state.panelOpen }
    case 'panel/set':
      return { ...state, panelOpen: action.open }
    case 'notice/push':
      return { ...state, notices: [ ...state.notices, action.notice ]}
    case 'notice/dismiss':
      return { ...state, notices: state.notices.filter(notice => notice.id !== action.id) }
    default:
      return state
  }
}
