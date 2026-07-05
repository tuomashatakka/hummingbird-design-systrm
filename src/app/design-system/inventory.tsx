import type { FC } from 'react'
import { Heading } from '@/components/primitives'


interface Row {
  component: string
  renders:   string
  props:     string
}

const PRIMITIVES: Row[] = [
  { component: 'Button', renders: 'button', props: 'variant, size, disabled, type, onClick' },
  { component: 'Input', renders: 'input', props: 'type, value, placeholder, required, onChange' },
  { component: 'Textarea', renders: 'textarea', props: 'value, rows, placeholder, onChange' },
  { component: 'Select', renders: 'select', props: 'options, value, onChange' },
  { component: 'Checkbox', renders: 'label > input[type=checkbox]', props: 'label, checked, onChange' },
  { component: 'Radio', renders: 'label > input[type=radio]', props: 'label, name, value, checked, onChange' },
  { component: 'Switch', renders: 'input[role=switch]', props: 'label, checked, onChange' },
  { component: 'Slider', renders: 'input[type=range]', props: 'label, min, max, step, value, onChange' },
  { component: 'Heading', renders: 'h1–h6', props: 'level, id' },
  { component: 'Mark', renders: 'svg (brand mark)', props: 'label' },
  { component: 'Badge', renders: 'span[data-badge]', props: 'variant' },
  { component: 'Progress', renders: 'progress', props: 'label, value, max' },
  { component: 'Disclosure', renders: 'details / summary', props: 'summary, open, name' },
  { component: 'Dialog', renders: 'dialog (showModal)', props: 'open, title, footer, onClose' },
]

const COMPOSITES: Row[] = [
  { component: 'Card', renders: 'article.card', props: 'title, footer' },
  { component: 'Field', renders: 'div[data-field]', props: 'label, htmlFor, hint, error' },
  { component: 'Alert', renders: 'aside[data-alert]', props: 'variant, title' },
  { component: 'Tabs', renders: '[role=tablist] + panels', props: 'tabs, label' },
  { component: 'Breadcrumb', renders: 'nav > ol', props: 'items' },
  { component: 'SearchField', renders: 'form[role=search]', props: 'placeholder, onSearch' },
  { component: 'Carousel', renders: 'section[aria-roledescription=carousel]', props: 'slides (image, content), label' },
  { component: 'Meta', renders: 'dl[data-meta]', props: 'items' },
  { component: 'Swatches', renders: 'div[data-swatches]', props: 'tokens, label' },
  { component: 'ThemeCustomizer', renders: 'form[data-component=theme-customizer]', props: '—' },
  { component: 'Chat', renders: 'section[data-component=chat]', props: '—' },
]

const LAYOUTS: Row[] = [
  { component: 'Header', renders: 'body > header', props: '—' },
  { component: 'Footer', renders: 'body > footer', props: '—' },
  { component: 'Panel', renders: 'aside[data-slot=panel]', props: 'label' },
]

const InventoryTable: FC<{ title: string, rows: Row[] }> = ({ title, rows }) =>
  <>
    <Heading level={ 3 }>{title}</Heading>

    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Renders</th>
          <th>Essential props</th>
        </tr>
      </thead>

      <tbody>
        {rows.map(row =>
          <tr key={ row.component }>
            <td>{row.component}</td>

            <td>
              <code>{row.renders}</code>
            </td>

            <td>{row.props}</td>
          </tr>)}
      </tbody>
    </table>
  </>

InventoryTable.displayName = 'InventoryTable'

export const Inventory: FC = () =>
  <section>
    <Heading id='inventory' level={ 2 }>Inventory</Heading>
    <p>Every component the system exports, and what it renders.</p>
    <InventoryTable title='Primitives — src/components/primitives' rows={ PRIMITIVES } />
    <InventoryTable title='Composites — src/components/composites' rows={ COMPOSITES } />
    <InventoryTable title='Layouts — src/components/layouts' rows={ LAYOUTS } />
  </section>

Inventory.displayName = 'Inventory'
