'use client'

import type { FC } from 'react'
import { Button, Slider } from 'Δ/components/primitives'
import {
  BRAND_COLORS, PALETTE_DEFAULTS,
  resetPalette, setBrandColor, useAppState, useDispatch,
} from 'Δ/lib/state'
import type { ColorChannels } from 'Δ/lib/state'


const CHANNELS = [ 'lightness', 'chroma', 'hue' ] as const

const RANGES: Record<typeof CHANNELS[number], { min: number, max: number, step: number }> = {
  lightness: { min: 0, max: 100, step: 1 },
  chroma:    { min: 0, max: 0.37, step: 0.005 },
  hue:       { min: 0, max: 360, step: 1 },
}

/**
 * Live palette editor: three oklch sliders per brand color, written
 * through the reducer and applied as custom properties on <html>.
 * Reset hands control back to tokens.css (and its per-theme values).
 */
export const ThemeCustomizer: FC = () => {
  const { palette } = useAppState()
  const dispatch    = useDispatch()

  return <form data-component='theme-customizer' onSubmit={ event => event.preventDefault() }>
    {BRAND_COLORS.map(color => {
      const channels = palette[color] ?? PALETTE_DEFAULTS[color]

      const setChannel = (channel: keyof ColorChannels, value: number) =>
        dispatch(setBrandColor(color, { ...channels, [channel]: value }))

      return <fieldset key={ color }>
        <legend>--{color}</legend>
        <div style={{ background: `var(--${color})` }} data-swatch='' />

        {CHANNELS.map(channel =>
          <label key={ channel }>
            <span>{channel}</span>

            <Slider
              label={ `${color} ${channel}` }
              min={ RANGES[channel].min }
              max={ RANGES[channel].max }
              step={ RANGES[channel].step }
              value={ channels[channel] }
              onChange={ event => setChannel(channel, Number(event.target.value)) } />

            <output>{channels[channel]}</output>
          </label>)}
      </fieldset>
    })}

    <footer>
      <Button size='small' onClick={ () => dispatch(resetPalette()) }>
        Reset to brand defaults
      </Button>
    </footer>
  </form>
}

ThemeCustomizer.displayName = 'ThemeCustomizer'
