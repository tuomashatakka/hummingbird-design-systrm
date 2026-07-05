import { anthropic } from '@ai-sdk/anthropic'
import { convertToModelMessages, streamText } from 'ai'
import type { UIMessage } from 'ai'

// Requires ANTHROPIC_API_KEY in .env.local — see .env.example.
// Server runtime only: this route is stripped for GitHub Pages static builds
// by scripts/build-static.sh.

export const maxDuration = 30

export async function POST (request: Request) {
  type ExtractedType = { messages: UIMessage[] }

  const { messages }: ExtractedType = await request.json()

  const result = streamText({
    model:    anthropic('claude-sonnet-4-5'),
    system:   'You are a concise, helpful assistant inside a minimal boilerplate app.',
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
