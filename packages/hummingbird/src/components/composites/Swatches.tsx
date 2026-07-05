import type { FC } from 'react'


interface SwatchesProps {
  tokens: string[] // custom property names without the leading --
  label:  string // names the ramp for assistive tech
}

/** One color ramp rendered as a continuous strip of captioned swatches. */
export const Swatches: FC<SwatchesProps> = ({ tokens, label }) =>
  <div aria-label={ label } data-swatches='' role='group'>
    {tokens.map(token =>
      <figure key={ token } data-token={ token }>
        <div style={{ background: `var(--${token})` }} />
        <figcaption>--{token}</figcaption>
      </figure>)}
  </div>

Swatches.displayName = 'Swatches'
