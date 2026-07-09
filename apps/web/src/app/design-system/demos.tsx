'use client'

import { useState } from 'react'
import {
  Button, Checkbox, Dialog, Field, Heading, Input, Overlay, Radio, SearchField,
  Select, Slider, Switch, Textarea,
} from '@tuomashatakka/hummingbird-design-system'
import { pushNotice, useDispatch } from '@tuomashatakka/hummingbird-design-system/state'


const PLANS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
]

export const FormsDemo = () => {
  const [ plan, setPlan ]         = useState('pro')
  const [ terms, setTerms ]       = useState(false)
  const [ delivery, setDelivery ] = useState('standard')
  const [ notify, setNotify ]     = useState(true)

  return <div data-layout='stack'>
    <Field label='Email' htmlFor='ds-email' hint='We never share it.'>
      <Input required id='ds-email' type='email' placeholder='you@example.com' />
    </Field>

    <Field label='Password' htmlFor='ds-pass' error='Must be at least 8 characters.'>
      <Input id='ds-pass' type='password' placeholder='••••••••' />
    </Field>

    <Field label='Message' htmlFor='ds-msg'>
      <Textarea id='ds-msg' placeholder='Tell us more…' />
    </Field>

    <Field label='Plan' htmlFor='ds-plan'>
      <Select
        id='ds-plan'
        options={ PLANS }
        value={ plan }
        onChange={ event => setPlan(event.target.value) } />
    </Field>

    <fieldset>
      <legend>Delivery</legend>

      <div data-layout='stack'>
        <Radio
          name='delivery'
          value='standard'
          label='Standard (3–5 days)'
          checked={ delivery === 'standard' }
          onChange={ event => setDelivery(event.target.value) } />

        <Radio
          name='delivery'
          value='express'
          label='Express (next day)'
          checked={ delivery === 'express' }
          onChange={ event => setDelivery(event.target.value) } />
      </div>
    </fieldset>

    <Checkbox
      label='I agree to the terms'
      checked={ terms }
      onChange={ event => setTerms(event.target.checked) } />

    <Switch
      label='Email notifications'
      checked={ notify }
      onChange={ event => setNotify(event.target.checked) } />

    <SearchField onSearch={ query => console.info('search:', query) } />
  </div>
}

export const SliderDemo = () => {
  const [ volume, setVolume ] = useState(64)

  return <div data-layout='cluster'>
    <Slider
      label='Volume'
      min={ 0 }
      max={ 100 }
      value={ volume }
      onChange={ event => setVolume(Number(event.target.value)) } />

    <output>{volume}</output>
    <Slider disabled label='Disabled slider' min={ 0 } max={ 100 } value={ 30 } />
  </div>
}

export const DialogDemo = () => {
  const [ open, setOpen ] = useState(false)

  return <div data-layout='cluster'>
    <Button variant='primary' onClick={ () => setOpen(true) }>
      Open dialog
    </Button>

    <Dialog
      open={ open }
      title='Native dialog'
      footer={
        <>
          <Button variant='ghost' onClick={ () => setOpen(false) }>Cancel</Button>
          <Button variant='primary' onClick={ () => setOpen(false) }>Confirm</Button>
        </>
      }
      onClose={ () => setOpen(false) }>
      <p>
        Focus trapping,
        {' '}
        <kbd>Esc</kbd>
        {' '}
        to close, and the backdrop are all browser-provided.
      </p>
    </Dialog>
  </div>
}

export const OverlayDemo = () => {
  const [ open, setOpen ] = useState(false)

  return <div data-layout='cluster'>
    <Button variant='primary' onClick={ () => setOpen(true) }>
      Open overlay
    </Button>

    <Overlay label='Immersive overlay' open={ open } onClose={ () => setOpen(false) }>
      <div data-layout='stack'>
        <Heading level={ 3 }>Fixed overlay</Heading>

        <p>
          A full-viewport takeover under an opaque scrim. Click the backdrop or
          press
          {' '}
          <kbd>Esc</kbd>
          {' '}
          to dismiss.
        </p>

        <Button onClick={ () => setOpen(false) }>Close</Button>
      </div>
    </Overlay>
  </div>
}

export const NotificationDemo = () => {
  const dispatch = useDispatch()

  return <div data-layout='cluster'>
    <Button onClick={ () => dispatch(pushNotice('Saved to your library.')) }>
      Push info
    </Button>

    <Button variant='primary' onClick={ () => dispatch(pushNotice('Changes published.', 'success')) }>
      Push success
    </Button>

    <Button variant='danger' onClick={ () => dispatch(pushNotice('Something went wrong.', 'danger')) }>
      Push danger
    </Button>
  </div>
}
