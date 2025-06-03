import { Accessor, createSignal, type ParentProps } from 'solid-js'

import { requiredContext } from '../util/context'
import { useTrpc } from './trpc'
import { UserStore } from '../user/store'
import { DiscordStore } from '../discord/store'

export interface Stores {
  hasInitialized: Accessor<boolean>
  user: UserStore
  discord: DiscordStore
}

const { use: useStores, Provider: StoresProvider } = requiredContext<
  Stores,
  ParentProps
>('AppStores', (props) => {
  const trpc = useTrpc()
  const appData = trpc.users.appData.query()
  const [hasInitialized, setHasInitialized] = createSignal(false)

  appData.then(() => setHasInitialized(true))

  return {
    user: new UserStore(
      trpc,
      appData.then((d) => d.self),
    ),
    discord: new DiscordStore(
      trpc,
      appData.then((d) => d.discord),
    ),
    hasInitialized,
  } as Stores
})

export { StoresProvider, useStores }
