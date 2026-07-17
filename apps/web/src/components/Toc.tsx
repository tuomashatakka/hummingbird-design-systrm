'use client'

import { useEffect, useState } from 'react'


interface TocEntry {
  id:    string
  label: string
}

interface TocProps {
  entries: TocEntry[]
  label?:  string
}

/**
 * The fixed on-page TOC. An IntersectionObserver watches the section
 * headings through a reading band near the top of the viewport and marks
 * the current one with `aria-current` — the active right-border and its
 * transition live in globals.css under `nav[data-toc]`.
 */
export function Toc ({ entries, label = 'On this page' }: TocProps) {
  const [ active, setActive ] = useState<string>()

  // Wires an IntersectionObserver to the live DOM to track the active
  // section — an external subscription with cleanup, which is exactly what
  // useEffect exists for.
  // eslint-disable-next-line react-strict/prefer-no-use-effect
  useEffect(() => {
    const targets = entries
      .map(entry => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element != null)

    const visible = new Set<string>()

    const observer = new IntersectionObserver(records => {
      for (const record of records)
        if (record.isIntersecting)
          visible.add(record.target.id)
        else
          visible.delete(record.target.id)

      // bottom of the document: the last section may never reach the band
      const atEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2

      if (atEnd)
        setActive(entries.at(-1)?.id)
      else {
        const current = entries.find(entry => visible.has(entry.id))
        if (current)
          setActive(current.id)
      }
    }, { rootMargin: '-15% 0px -65% 0px' })

    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [ entries ])

  return <nav aria-label={ label } data-toc=''>
    <span>{label}</span>

    <ol>
      {entries.map(entry =>
        <li key={ entry.id }>
          <a
            aria-current={ active === entry.id ? 'true' : undefined }
            href={ `#${entry.id}` }
            onClick={ () => setActive(entry.id) }>
            {entry.label}
          </a>
        </li>)}
    </ol>
  </nav>
}
