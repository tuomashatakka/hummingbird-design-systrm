'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Button, Checkbox, Dialog, Field, Heading, Input, Panel, Radio, SearchField,
  Select, Slider, Switch, Textarea,
} from 'hummingbird-design-system'
import { pushNotice, useDispatch } from 'Δ/lib/state'


const PLANS = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
]

// — single-control leaves for the registry —

export const InputDemo = () =>
  <Input required type='email' placeholder='you@example.com' />

export const TextareaDemo = () =>
  <Textarea placeholder='Tell us more…' rows={ 4 } />

export const SelectDemo = () => {
  const [ plan, setPlan ] = useState('pro')

  return <Select
    options={ PLANS }
    value={ plan }
    onChange={ event => setPlan(event.target.value) } />
}

export const CheckboxDemo = () => {
  const [ terms, setTerms ] = useState(false)

  return <Checkbox
    label='I agree to the terms'
    checked={ terms }
    onChange={ event => setTerms(event.target.checked) } />
}

export const RadioDemo = () => {
  const [ delivery, setDelivery ] = useState('standard')

  return <div data-layout='stack'>
    <Radio
      name='delivery-demo'
      value='standard'
      label='Standard (3–5 days)'
      checked={ delivery === 'standard' }
      onChange={ event => setDelivery(event.target.value) } />

    <Radio
      name='delivery-demo'
      value='express'
      label='Express (next day)'
      checked={ delivery === 'express' }
      onChange={ event => setDelivery(event.target.value) } />
  </div>
}

export const SwitchDemo = () => {
  const [ notify, setNotify ] = useState(true)

  return <Switch
    label='Email notifications'
    checked={ notify }
    onChange={ event => setNotify(event.target.checked) } />
}

export const FieldDemo = () =>
  <div data-layout='stack'>
    <Field label='Email' hint='We never share it.'>
      <Input required type='email' placeholder='you@example.com' />
    </Field>

    <Field label='Password' error='Must be at least 8 characters.'>
      <Input type='password' placeholder='••••••••' />
    </Field>
  </div>

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

export const SearchFieldDemo = () =>
  <SearchField onSearch={ query => console.info('search:', query) } />

// — the full form recipe (patterns section) —

export const FormsDemo = () => {
  const [ plan, setPlan ]         = useState('pro')
  const [ terms, setTerms ]       = useState(false)
  const [ delivery, setDelivery ] = useState('standard')
  const [ notify, setNotify ]     = useState(true)

  return <div data-layout='stack'>
    <Field label='Email' hint='We never share it.'>
      <Input required type='email' placeholder='you@example.com' />
    </Field>

    <Field label='Password' error='Must be at least 8 characters.'>
      <Input type='password' placeholder='••••••••' />
    </Field>

    <Field label='Message'>
      <Textarea placeholder='Tell us more…' />
    </Field>

    <Field label='Plan'>
      <Select
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

// — overlay-family leaves —

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

    <Dialog variant='overlay' label='Immersive overlay' open={ open } onClose={ () => setOpen(false) }>
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
    </Dialog>
  </div>
}

export const PanelDemo = () => {
  const [ open, setOpen ] = useState(false)

  return <div data-layout='cluster'>
    <Button onClick={ () => setOpen(true) }>
      Open a local panel
    </Button>

    <Panel label='Demo panel' open={ open } onClose={ () => setOpen(false) }>
      <p>A locally-controlled drawer — slide in, slide out, inert while closed.</p>
    </Panel>
  </div>
}

// — scroll-spy nav (Header's `current` link driven by IntersectionObserver) —

export const HeaderScrollSpyDemo = () => {
  const [ current, setCurrent ] = useState('demo-a')
  const scroller                = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = scroller.current
    if (root == null)
      return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting)
        if (visible != null)
          setCurrent(visible.target.id)
      },
      { root, threshold: 0.6 })

    root.querySelectorAll('section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const links = [
    { id: 'demo-a', label: 'One' },
    { id: 'demo-b', label: 'Two' },
    { id: 'demo-c', label: 'Three' },
  ]

  return <div data-layout='stack'>
    {/* the real underline-grow treatment is scoped to `body > header nav a`;
       this demo lives mid-page, so it marks the current link with a visible
       weight change instead — the aria-current='page' contract is identical */}
    <nav aria-label='Scroll-spy demo' data-layout='cluster'>
      {links.map(link =>
        <a
          key={ link.id }
          style={{ fontWeight: current === link.id ? 700 : 400 }}
          aria-current={ current === link.id ? 'page' : undefined }
          href={ `#${link.id}` }>
          {link.label}
        </a>)}
    </nav>

    <div ref={ scroller } style={{ blockSize: '10rem', overflowY: 'auto', border: 'var(--border-hair)' }}>
      {links.map(link =>
        <section key={ link.id } id={ link.id } style={{ blockSize: '10rem', display: 'grid', placeItems: 'center' }}>
          {link.label}
        </section>)}
    </div>
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
