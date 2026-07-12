'use client'

import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { Button, Input } from 'hummingbird-design-system'

// Streams from src/app/api/chat/route.ts — requires a server runtime (Vercel / bun dev).
// On the static GitHub Pages build the API route does not exist; the composite
// degrades to a visible hint instead of a dead form.
export const Chat: FC = () => {
  const [ input, setInput ]                      = useState('')
  const { messages, sendMessage, status, error } = useChat()

  const busy = status === 'submitted' || status === 'streaming'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (input.trim().length === 0 || busy)
      return
    void sendMessage({ text: input })
    setInput('')
  }

  return <section data-component='chat' aria-label='AI chat'>
    <ol aria-live='polite'>
      {messages.length === 0 &&
          <li data-role='assistant'>
            Ask me anything. I stream from
            {' '}
            <code>/api/chat</code>
            .
          </li>}

      {messages.map(message =>
        <li key={ message.id } data-role={ message.role }>
          {message.parts
            .filter(part => part.type === 'text')
            .map((part, index) => <span key={ index }>{part.text}</span>)}
        </li>)}

      {error
        ? <li data-role='assistant' role='alert'>
          Chat is unavailable — this build has no server runtime, or the
          <code>ANTHROPIC_API_KEY</code>
          {' '}
          is missing.
        </li>
        : null}
    </ol>

    <form onSubmit={ handleSubmit }>
      <Input
        type='text'
        placeholder='Message…'
        value={ input }
        onChange={ event => setInput(event.target.value) } />

      <Button type='submit' variant='primary' disabled={ busy }>
        {busy ? '…' : 'Send'}
      </Button>
    </form>
  </section>
}

Chat.displayName = 'Chat'
