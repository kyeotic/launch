import { type JSX, type ParentProps, Show } from 'solid-js'
import { useStores } from './stores'
import { PageLoader } from '../components'

export default function StoresInit(props: ParentProps): JSX.Element {
  const { hasInitialized } = useStores()

  return (
    <Show when={hasInitialized()} fallback={<PageLoader />}>
      {props.children}
    </Show>
  )
}
