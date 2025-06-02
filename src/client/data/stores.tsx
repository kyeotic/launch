import { type ParentProps } from 'solid-js'

import { requiredContext } from '../util/context'
import { useTrpc } from './trpc'
import { UserStore } from '../user/store'
import { DiscordStore } from '../discord/store'

export interface Stores {
  user: UserStore
  discord: DiscordStore
}

interface AppData {
  self: any
  discord: {
    kitchen: string
  }
}

const { use: useStores, Provider: StoresProvider } = requiredContext<
  Stores,
  ParentProps
>('AppStores', (props) => {
  const trpc = useTrpc()
  const appData = trpc.users.appData.query()
  return {
    user: new UserStore(
      trpc,
      appData.then((d: AppData) => d.self),
    ),
    discord: new DiscordStore(
      trpc,
      appData.then((d: AppData) => d.discord),
    ),
  } as Stores
})

export { StoresProvider, useStores }
