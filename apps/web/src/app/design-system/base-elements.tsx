import type { FC } from 'react'
import { Heading } from 'hummingbird-design-system'
import { HtmlSpecimen } from '@/components/Specimen'


// Every base element styled by base.css, shown as a specimen whose preview is
// rendered from the exact markup in its code block — plain HTML, no components.

const TABLE = `<table>
  <thead>
    <tr><th>Face</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr><td>Novecento Sans Wide</td><td>Display, labels</td></tr>
    <tr><td>Sofia Pro</td><td>Body copy</td></tr>
    <tr><td>Montserrat</td><td>Subheadings</td></tr>
  </tbody>
</table>`

const LISTS = `<ul>
  <li>Unordered lists keep their native markers.</li>
  <li>The bullet is styled through ::marker, not pseudo-content.</li>
</ul>

<ol>
  <li>Ordered lists number themselves.</li>
  <li>The numeral is native too.</li>
</ol>`

const DEFINITION_LIST = `<dl>
  <dt>Definition list</dt>
  <dd>Term / description pairs on hairline rules.</dd>
  <dt>Meta</dt>
  <dd>The Meta composite is this element plus its captions.</dd>
</dl>`

const BLOCKQUOTE = `<blockquote>
  <p>Blockquotes carry a hairline rule on the inline start and step back to the faint ink.</p>
</blockquote>`

const FIELDSET = `<fieldset>
  <legend>Contact</legend>
  <label for="be-email">Email</label>
  <input id="be-email" type="email" placeholder="you@example.com">
</fieldset>`

const TEXT_LEVEL = `<p>
  <abbr title="Oklab lightness, chroma, hue">OKLCH</abbr> abbreviations carry a
  dotted underline, <mark>marked ranges</mark> sit on the accent wash,
  H<sub>2</sub>O subscripts and mc<sup>2</sup> superscripts hold the baseline,
  inline <code>code</code> and keys like <kbd>⌘K</kbd> use the mono stack, and
  program output reads as <samp>build ok — 42 components</samp>.
</p>`

const PRE = `<pre><code>bun install
bun run dev   # tokens, base, components — all live</code></pre>`

const DETAILS = `<details name="be-acc">
  <summary>Details & summary</summary>
  <p>Open and close with the keyboard — nothing imported, nothing polyfilled.</p>
</details>

<details name="be-acc">
  <summary>Accordion via the name attribute</summary>
  <p>These two share a name, so opening one closes the other. Zero JavaScript.</p>
</details>

<progress value="64" max="100">64%</progress>`

const RULE_ADDRESS = `<p>A horizontal rule is the hairline divider below.</p>
<hr>

<address>
  Hummingbird · Tuusula, Finland ·
  <a href="mailto:contact@tuomashatakka.fi">contact@tuomashatakka.fi</a>
</address>`

export const BaseElements: FC = () =>
  <section>
    <Heading id='elements' level={ 2 }>Base elements</Heading>

    <p>
      Plain HTML is styled directly in
      {' '}
      <code>base.css</code>
      {' '}
      — every specimen below renders the exact markup in its code block, no
      components imported. The interactive natives (
      <code>dialog</code>
      ,
      {' '}
      <code>[popover]</code>
      ) are demonstrated with their primitives above, since they live in the
      top layer.
    </p>

    <Heading level={ 3 }>Table</Heading>
    <HtmlSpecimen code={ TABLE } note='Hairline row rules, uppercase display-face headers.' />
    <Heading level={ 3 }>Lists</Heading>
    <HtmlSpecimen code={ LISTS } note='Native markers via ::marker.' />
    <Heading level={ 3 }>Definition list</Heading>
    <HtmlSpecimen code={ DEFINITION_LIST } note='Hairline definition pairs, straight from base.css.' />
    <Heading level={ 3 }>Blockquote</Heading>
    <HtmlSpecimen code={ BLOCKQUOTE } note='Rule on the inline start, faint ink.' />
    <Heading level={ 3 }>Fieldset &amp; legend</Heading>
    <HtmlSpecimen code={ FIELDSET } note='Hairline frame, eyebrow legend. Validation styling rides on :user-invalid.' />
    <Heading level={ 3 }>Text-level semantics</Heading>
    <HtmlSpecimen code={ TEXT_LEVEL } note='abbr, mark, sub, sup, code, kbd, samp — dotted underline, accent wash, mono.' />
    <Heading level={ 3 }>Code block</Heading>
    <HtmlSpecimen code={ PRE } note='Mono stack on the wash surface.' />
    <Heading level={ 3 }>Details &amp; progress</Heading>
    <HtmlSpecimen code={ DETAILS } note='Native elements, tokens only — the name attribute makes the accordion.' />
    <Heading level={ 3 }>Rule &amp; address</Heading>
    <HtmlSpecimen code={ RULE_ADDRESS } note='Single hairline with generous margins; an italic-free contact block.' />
  </section>

BaseElements.displayName = 'BaseElements'
