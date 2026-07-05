'use client'

import { useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'


interface Slide {
  id:      string
  content: ReactNode
  image?:  { src: string } // full-bleed photography behind the content
}

interface CarouselProps {
  slides: Slide[]
  label:  string // names the carousel for assistive tech
}

const Chevron: FC<{ direction: 'prev' | 'next' }> = ({ direction }) =>
  <svg aria-hidden='true' viewBox='0 0 24 24'>
    <polyline points={ direction === 'prev' ? '15 18 9 12 15 6' : '9 18 15 12 9 6' } />
  </svg>

Chevron.displayName = 'Chevron'

/**
 * Scroll-snap slider: the track is a plain scrollable list, so swipe,
 * trackpad, and keyboard scrolling all work natively — the buttons and
 * dots only assist. Slides with an image render it full-bleed under a
 * diagonal scrim, in the identity's photo treatment.
 */
export const Carousel: FC<CarouselProps> = ({ slides, label }) => {
  const track                   = useRef<HTMLUListElement>(null)
  const [ current, setCurrent ] = useState(0)

  const goTo = (index: number) => {
    const element = track.current
    if (!element)
      return

    const next = Math.min(Math.max(index, 0), slides.length - 1)
    element.scrollTo({ left: next * element.clientWidth, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const element = track.current
    if (!element || element.clientWidth === 0)
      return

    setCurrent(Math.round(element.scrollLeft / element.clientWidth))
  }

  return <section
    aria-roledescription='carousel'
    aria-label={ label }
    data-component='carousel'>
    <ul ref={ track } onScroll={ handleScroll }>
      {slides.map((slide, index) =>
        <li
          key={ slide.id }
          aria-roledescription='slide'
          aria-label={ `${index + 1} of ${slides.length}` }>
          {slide.image ? <img alt='' src={ slide.image.src } /> : null}
          <div>{slide.content}</div>
        </li>)}
    </ul>

    <footer>
      <ol>
        {slides.map((slide, index) =>
          <li key={ slide.id }>
            <button
              aria-label={ `Go to slide ${index + 1}` }
              aria-current={ index === current }
              type='button'
              onClick={ () => goTo(index) } />
          </li>)}
      </ol>

      <span data-layout='cluster'>
        <button
          aria-label='Previous slide'
          type='button'
          disabled={ current === 0 }
          onClick={ () => goTo(current - 1) }>
          <Chevron direction='prev' />
        </button>

        <button
          aria-label='Next slide'
          type='button'
          disabled={ current === slides.length - 1 }
          onClick={ () => goTo(current + 1) }>
          <Chevron direction='next' />
        </button>
      </span>
    </footer>
  </section>
}

Carousel.displayName = 'Carousel'
