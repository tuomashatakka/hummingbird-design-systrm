import type { FC } from 'react'


type Tint = 'blue' | 'dark' | 'clear' | 'mist' | 'magenta' | 'wine'

interface ArticleHeroProps {
  title: string
  image: { src: string } // blurred mountain backdrop
  /** Flat overlay tint laid over the photography. Defaults to `blue`. */
  tint?: Tint

  /** Short italic serif eyebrow — e.g. a date. */
  eyebrow?: string

  /** Byline, e.g. `Tuomas Hatakka`. Rendered as `WRITTEN BY …`. */
  byline?: string
}

/**
 * The article hero from the identity's six-variant exploration — a full-bleed,
 * heavily blurred mountain photograph under a flat color overlay, with a
 * centred lockup: date eyebrow, large title, byline. The tint is the only
 * place brand color appears, and only ever over imagery.
 * `section[data-article-hero]`.
 */
export const ArticleHero: FC<ArticleHeroProps> = ({ title, image, tint = 'blue', eyebrow, byline }) =>
  <section data-article-hero='' data-tint={ tint }>
    <img alt='' src={ image.src } />

    <div>
      {eyebrow ? <p data-eyebrow=''>{eyebrow}</p> : null}
      <h1>{title}</h1>
      {byline ? <h6>Written by {byline}</h6> : null}
    </div>
  </section>

ArticleHero.displayName = 'ArticleHero'
