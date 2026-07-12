import type { Metadata } from 'next'
import Link from 'next/link'
import bgBlue from '@/assets/bg-mountain-blue.jpg'
import bgClear from '@/assets/bg-mountain-clear.jpg'
import bgDark from '@/assets/bg-mountain-dark.jpg'
import bgMagenta from '@/assets/bg-mountain-magenta.jpg'
import {
  ArticleHero, CapabilityStrip, ContactPanel, FounderCard, Heading, Mark,
  Pillars, RecentWork,
} from 'hummingbird-design-system'


export const metadata: Metadata = {
  title:       'Portfolio — Hummingbird',
  description: 'A full portfolio page assembled entirely from the Hummingbird design system components.',
}

const PILLARS = [
  { label: 'Websites', title: 'Websites & web design', body: 'Clean, self-explanatory sites that read the way your business speaks.' },
  { label: 'Development', title: 'Web development', body: 'Well-formed, comprehensive front and back ends built to last.' },
  { label: 'Graphic design', title: 'Design & photography', body: 'Identity, print, and imagery in one consistent voice.' },
]

const CAPABILITIES = [
  { icon: 'user' as const, title: 'Personal', body: 'You work with me directly, from first sketch to launch.' },
  { icon: 'umbrella' as const, title: 'Reliable', body: 'Comprehensive care after launch, not just before.' },
  { icon: 'award' as const, title: 'Crafted', body: 'Master-level attention to every last detail.' },
]

const WORK = [
  { id: 'alpine', title: 'Alpine', meta: 'Website · 2015', image: bgBlue },
  { id: 'graphite', title: 'Graphite', meta: 'Development · 2015', image: bgDark },
  { id: 'clearwater', title: 'Clearwater', meta: 'Photography · 2015', image: bgClear },
  { id: 'magenta', title: 'Magenta', meta: 'Identity · 2015', image: bgMagenta },
]

const CONTACT = [
  { icon: 'mail' as const, value: 'contact@tuomashatakka.fi', href: 'mailto:contact@tuomashatakka.fi' },
  { icon: 'phone' as const, value: '+358 40 000 0000' },
  { icon: 'pin' as const, value: 'Tuusula, Finland' },
]

export default function PortfolioPage () {
  return <div data-layout='stack'>
    <section data-hero=''>
      <Mark />
      <Heading level={ 1 }>Hummingbird</Heading>
      <Heading level={ 6 }>Digital media · Design · Photography · Est. 2015</Heading>

      <p>
        I offer first-grade digital media services including websites, graphic
        design, and mobile applications. Let&apos;s make your business stand out.
      </p>

      <div data-layout='cluster'>
        <Link data-cta='' href='#contact'>Contact me now</Link>
        <Link data-cta='' href='/design-system'>The design system</Link>
      </div>
    </section>

    <section>
      <Heading level={ 6 }>About</Heading>
      <Heading level={ 2 }>How I make your business better</Heading>

      <div data-layout='split'>
        <FounderCard
          name='Tuomas Hatakka'
          role='Founder · Designer · Developer'
          cta={{ label: 'Contact me now', href: '#contact' }}>
          <p>
            I design and develop professional, user-friendly yet affordable
            websites. The studio is one person — the work speaks for itself.
          </p>
        </FounderCard>

        <div data-layout='stack'>
          <p>
            A short headline, one supporting sentence, and a paragraph of detail:
            that is the whole rhythm. Three pillars carry the offering, always in
            the same order.
          </p>
        </div>
      </div>
    </section>

    <section>
      <Heading level={ 6 }>Services</Heading>
      <Heading level={ 2 }>What I offer</Heading>
      <Pillars items={ PILLARS } />
    </section>

    <section>
      <Heading level={ 6 }>Capability</Heading>
      <Heading level={ 2 }>What I am capable of</Heading>
      <CapabilityStrip items={ CAPABILITIES } />
    </section>

    <section>
      <Heading level={ 6 }>Recent work</Heading>
      <Heading level={ 2 }>Selected projects</Heading>
      <RecentWork items={ WORK } />
    </section>

    <ArticleHero
      title='Let’s make your business stand out'
      image={ bgBlue }
      tint='blue'
      eyebrow='Thursday 19 Nov 2015'
      byline='Tuomas Hatakka' />

    <section id='contact'>
      <Heading level={ 6 }>Contact</Heading>
      <Heading level={ 2 }>Get in touch</Heading>

      <ContactPanel
        heading='Interested in working with me?'
        lead='Need a new website? Just want to ask how I am? Send me a message or call me.'
        details={ CONTACT } />
    </section>
  </div>
}
