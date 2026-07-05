'use client'

import type { FC, FormEvent } from 'react'
import { Button, Icon } from '@/components/primitives'
import type { IconName } from '@/components/primitives'


interface ContactDetail {
  icon:  IconName
  value: string
  href?: string
}

interface ContactPanelProps {
  heading: string

  /** One supporting sentence under the heading. */
  lead?:   string
  details: ContactDetail[]

  /** Submit handler; receives the native form event (already prevented). */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

/**
 * The contact panel — a slate block pairing a message form (white fields on
 * slate, ghost send) with a column of line-icon contact details. Mirrors the
 * identity's contact section. `section[data-contact]`.
 */
export const ContactPanel: FC<ContactPanelProps> = ({ heading, lead, details, onSubmit }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(event)
  }

  return <section data-contact=''>
    <div data-contact-intro=''>
      <h3>{heading}</h3>
      {lead ? <p>{lead}</p> : null}

      <ul data-contact-details=''>
        {details.map(detail =>
          <li key={ detail.value }>
            <Icon name={ detail.icon } />

            {detail.href
              ? <a href={ detail.href }>{detail.value}</a>
              : <span>{detail.value}</span>}
          </li>)}
      </ul>
    </div>

    <form onSubmit={ handleSubmit }>
      <label htmlFor='contact-name'>Name</label>
      <input required id='contact-name' name='name' type='text' autoComplete='name' />
      <label htmlFor='contact-email'>Email</label>
      <input required id='contact-email' name='email' type='email' autoComplete='email' />
      <label htmlFor='contact-message'>Message</label>
      <textarea required id='contact-message' name='message' />
      <Button type='submit'>Contact me now</Button>
    </form>
  </section>
}

ContactPanel.displayName = 'ContactPanel'
