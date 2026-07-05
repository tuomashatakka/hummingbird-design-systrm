import type { FC, ReactNode } from 'react'
import { Mark } from '@/components/primitives'


interface FounderCardProps {
  name:     string
  role:     string
  children: ReactNode // the bio
  /** Optional ghost call-to-action. */
  cta?:     { label: string, href: string }
}

/**
 * The founder card from the identity kit — a solid slate block with the mark,
 * a name, a role eyebrow, a short bio, and an optional ghost CTA. A "card"
 * here is a colored block with padding: no radius, no shadow, no border.
 * `article[data-founder]`.
 */
export const FounderCard: FC<FounderCardProps> = ({ name, role, children, cta }) =>
  <article data-founder=''>
    <span data-brand-mark=''>
      <Mark />
    </span>

    <h6>{role}</h6>
    <h3>{name}</h3>
    <div>{children}</div>

    {cta
      ? <a data-cta='' href={ cta.href }>{cta.label}</a>
      : null}
  </article>

FounderCard.displayName = 'FounderCard'
