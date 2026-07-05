import type { AppAction, BrandColor, ColorChannels, Notice, Theme } from './types'


export const setTheme = (theme: Theme): AppAction =>
  ({ type: 'theme/set', theme })

export const setBrandColor = (color: BrandColor, channels: ColorChannels): AppAction =>
  ({ type: 'palette/set', color, channels })

export const resetPalette = (): AppAction =>
  ({ type: 'palette/reset' })

export const togglePanel = (): AppAction =>
  ({ type: 'panel/toggle' })

export const setPanel = (open: boolean): AppAction =>
  ({ type: 'panel/set', open })

export const pushNotice = (message: string, kind: Notice['kind'] = 'info'): AppAction =>
  ({ type: 'notice/push', notice: { id: crypto.randomUUID(), kind, message }})

export const dismissNotice = (id: string): AppAction =>
  ({ type: 'notice/dismiss', id })
