import { SignalStore } from '../data/signalStore'
import { TrpcAppClient } from '../data/trpc'

export interface DiscordSignals {
  isLoading: boolean
  kitchen: string
}

export class DiscordStore extends SignalStore<DiscordSignals> {
  constructor(
    private trpc: TrpcAppClient,
    init: Promise<{ kitchen: string }>,
  ) {
    super({ kitchen: '', isLoading: false })

    this.setStore('isLoading', true)
    init.then((config) => {
      this.setStore({
        kitchen: config.kitchen,
        isLoading: false,
      })
    })
  }

  get isLoading(): boolean {
    return this.store.isLoading
  }

  get kitchen(): string {
    return this.store.kitchen
  }
}
