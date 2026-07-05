type ClassValue = string | null | undefined | false | Record<string, unknown>

/**
 * Minimal conditional class combinator.
 *
 * classNames('card', { primary: true, small: false, [variant]: variant })
 *   → 'card primary'
 */
export function classNames (...values: ClassValue[]): string | undefined {
  const out: string[] = []

  for (const value of values) {
    if (!value)
      continue
    if (typeof value === 'string') {
      out.push(value)
      continue
    }
    for (const [ key, condition ] of Object.entries(value))
      if (condition && key !== 'null' && key !== 'undefined')
        out.push(key)
  }

  return out.length > 0 ? out.join(' ') : undefined
}
