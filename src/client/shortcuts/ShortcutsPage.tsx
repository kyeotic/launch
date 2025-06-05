import { JSX, Show } from 'solid-js'
import { useStores } from '../data/stores'
import { Button, H2, Text, Panel } from '../components'
import { Link } from '../components/Typography/Text'
import { USER_PROFILE } from '../root/routes'
import { send, payload } from '../discord/hooks'

type KitchenDuration = string | null

export default function ShortcutsPage(): JSX.Element {
  const { user: store, discord } = useStores()

  function handleKitchenUse(duration: KitchenDuration) {
    console.log(
      `Kitchen use for ${duration ?? 'clear'} by ${store.self?.profile.name}`,
    )
    if (duration === null) {
      send(
        discord.kitchen,
        payload(
          'Kitchen Clear',
          'green',
          `${store.self?.profile.name} is done using the kitchen`,
        ),
      )
    } else {
      send(
        discord.kitchen,
        payload(
          'Kitchen In Use',
          'red',
          `${store.self?.profile.name} is using the kitchen for ${duration}`,
        ),
      )
    }
  }

  function handleLaundryUse(isInUse: boolean) {
    if (!isInUse) {
      send(
        discord.laundry,
        payload(
          'Laundry Clear',
          'green',
          `${store.self?.profile.name} is done with laundry`,
        ),
      )
    } else {
      send(
        discord.laundry,
        payload(
          'Laundry In Use',
          'red',
          `${store.self?.profile.name} is using the laundry`,
        ),
      )
    }
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
            <Button
              danger
              onclick={() =>
                handleKitchenUse(
                  'so long that you might as well build a new one',
                )
              }
            >
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
