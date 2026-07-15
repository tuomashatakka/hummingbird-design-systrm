// The single source for the page's section order — both the rendered
// sections and the fixed TOC map over this, so they can never drift.
export interface TocEntry {
  id:    string
  label: string
}

export const SECTIONS: TocEntry[] = [
  { id: 'principles', label: 'Principles' },
  { id: 'color', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'motion', label: 'Motion' },
  { id: 'tokens', label: 'Design tokens' },
  { id: 'theming', label: 'Theming' },
  { id: 'elements', label: 'Base elements' },
  { id: 'primitives', label: 'Primitives' },
  { id: 'composites', label: 'Composites' },
  { id: 'layouts', label: 'Layouts' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'state', label: 'State' },
]
