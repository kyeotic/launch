import { JSX, Show } from 'solid-js'
import { sample } from 'lodash'
import { useStores } from '../data/stores'
import { Button, H2, Text, Panel, toast } from '../components'
import { Link } from '../components/Typography/Text'
import { USER_PROFILE } from '../root/routes'
import { useTrpc } from '../data/trpc'
import { WebhookType } from '../../server/discord/types'

type KitchenDuration = string | null

const BIG_TIMES = [
  'so long that you might as well build a new one',
  'a really, really long time',
  'too long to estimate',
  'so long that they are sorry',
]

export default function ShortcutsPage(): JSX.Element {
  const trpc = useTrpc()
  const { user: store } = useStores()

  async function handleKitchenUse(duration: KitchenDuration) {
    await trpc.discord.send.mutate(
      duration === null
        ? { type: WebhookType.KitchenClear }
        : { type: WebhookType.KitchenInUse, duration },
    )

    toast.success('Sent')
  }

  async function handleLaundryUse(isInUse: boolean) {
    await trpc.discord.send.mutate(
      isInUse
        ? { type: WebhookType.LaundryInUse }
        : { type: WebhookType.LaundryClear },
    )

    toast.success('Sent')
  }

  return (
    <div class="space-y-6">
      <Show
        when={store.self?.profile.name}
        fallback={
          <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4">
            <Text class="text-yellow-700">
              Please set your name in your{' '}
              <Link href={USER_PROFILE}>profile</Link> to use shortcuts.
            </Text>
          </div>
        }
      >
        <Panel>
          <H2>Kitchen Use</H2>
          <div class="mt-4 grid grid-cols-2 md:flex md:flex-wrap gap-2 sm:gap-4">
            <Button primary onclick={() => handleKitchenUse(null)}>
              Clear
            </Button>
            <Button variant="purple" onclick={() => handleKitchenUse('10m')}>
              10 Minutes
            </Button>
            <Button variant="orange" onclick={() => handleKitchenUse('30m')}>
              30 Minutes
            </Button>
            <Button danger onclick={() => handleKitchenUse(sample(BIG_TIMES)!)}>
              BIG TIME
            </Button>
          </div>
        </Panel>
        <Panel>
          <H2>Laundry Use</H2>
          <div class="mt-4 grid grid-cols-2 md:flex md:flex-wrap gap-2 sm:gap-4">
            <Button primary onclick={() => handleLaundryUse(false)}>
              Clear
            </Button>
            <Button danger onclick={() => handleLaundryUse(true)}>
              In Use
            </Button>
          </div>
        </Panel>
      </Show>
    </div>
  )
}
