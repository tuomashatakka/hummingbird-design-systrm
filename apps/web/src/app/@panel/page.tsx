'use client'

import { Button, Panel } from 'hummingbird-design-system'
import { useAppState, useDispatch } from 'Δ/lib/state'
import { dismissNotice, pushNotice, setPanel } from 'Δ/lib/state/actions'

// This page renders in parallel with src/app/page.tsx through the @panel slot.
// Route-specific panels: add @panel/<route>/page.tsx next to the matching route.
export default function PanelSlot () {
  const state    = useAppState()
  const dispatch = useDispatch()

  return <Panel
    label='State inspector'
    open={ state.panelOpen }
    onClose={ () => dispatch(setPanel(false)) }>
    <div data-layout='stack'>
      <pre aria-label='Current app state'>
        {JSON.stringify(state, null, 2)}
      </pre>

      <Button size='small' onClick={ () => dispatch(pushNotice('Hello from the reducer')) }>
        Push notice
      </Button>

      {state.notices.map(notice =>
        <p key={ notice.id } data-layout='cluster'>
          <small>{notice.message}</small>

          <Button variant='ghost' size='small' onClick={ () => dispatch(dismissNotice(notice.id)) }>
            dismiss
          </Button>
        </p>)}
    </div>
  </Panel>
}
