import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

import UserStore from './users/userStore.ts'
import { lazy } from './util/lazy.ts'
import config from './config.ts'

export interface InnerContext {
  config: typeof config
  stores: {
    users: UserStore
  }
}

// Only one context per app is needed, make sure we only ever make one
const appContext = lazy(createContext)

export async function createContext(): Promise<InnerContext> {
  const kv = await Deno.openKv()
  return {
    config,
    stores: {
      users: new UserStore(kv),
    },
  } as InnerContext
}

export async function createAppContext(opts: FetchCreateContextFnOptions) {
  const inner = await appContext()

  return {
    ...inner,
    req: opts.req,
  }
}

export type Context = Awaited<ReturnType<typeof createAppContext>>
