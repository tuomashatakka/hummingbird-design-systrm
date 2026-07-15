import { createHighlighterCore, createCssVariablesTheme } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'


export type Lang = 'tsx' | 'html' | 'css' | 'bash'

// A CSS-variables theme: every token color resolves to a --shiki-* custom
// property (mapped to design tokens in globals.css), so highlighting follows
// light/dark/system and the theme customizer with zero duplicate markup.
const theme = createCssVariablesTheme({
  name:           'hummingbird',
  variablePrefix: '--shiki-',
  fontStyle:      true,
})

// The JavaScript regex engine needs no WASM asset — friendlier to the Bun
// build and the static export. Highlighting runs in RSC at build/prerender
// time only, so none of this reaches the client bundle.
let promise: ReturnType<typeof createHighlighterCore> | undefined

const highlighter = () => promise ??= createHighlighterCore({
  themes: [ theme ],
  langs:  [
    import('@shikijs/langs/tsx'),
    import('@shikijs/langs/html'),
    import('@shikijs/langs/css'),
    import('@shikijs/langs/bash'),
  ],
  engine: createJavaScriptRegexEngine(),
})

export async function highlight (code: string, lang: Lang): Promise<string> {
  return (await highlighter()).codeToHtml(code, { lang, theme: 'hummingbird' })
}
