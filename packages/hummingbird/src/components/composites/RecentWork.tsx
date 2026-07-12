import type { FC } from 'react'
import { Grid } from 'Δ/components/layouts'


interface WorkItem {
  id:    string
  title: string

  /** Short category / date line. */
  meta?:  string
  image?: { src: string }
  href?:  string
}

interface RecentWorkProps {
  items: WorkItem[]

  /** Column floor preset passed through to the grid. Defaults to `md`. */
  min?: 'sm' | 'md' | 'lg'
}

/**
 * A recent-work grid — figures laid out on the responsive `Grid`, each a
 * cover image with a title and optional meta caption. `[data-work]`.
 */
export const RecentWork: FC<RecentWorkProps> = ({ items, min = 'md' }) =>
  <div data-work=''>
    <Grid min={ min }>
      {items.map(item => {
        const figure =
          <figure key={ item.id }>
            {item.image ? <img alt='' src={ item.image.src } /> : null}

            <figcaption>
              <h4>{item.title}</h4>
              {item.meta ? <h6>{item.meta}</h6> : null}
            </figcaption>
          </figure>

        return item.href
          ? <a key={ item.id } href={ item.href }>{figure}</a>
          : figure
      })}
    </Grid>
  </div>

RecentWork.displayName = 'RecentWork'
