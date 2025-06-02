import { JSX, Show } from 'solid-js'
import { useStores } from '../data/stores'
import { Button, H2, Text } from '../components'
import { Link } from '../components/Typography/Text'
import { USER_PROFILE } from '../root/routes'
import { send, payload } from '../discord/hooks'

export default function ShortcutsPage(): JSX.Element {
  const { user: store, discord } = useStores()

  function handleKitchenUse(minutes: number) {
    console.log(
      `Kitchen use for ${minutes} minutes by ${store.self?.profile.name}`,
    )
    if (discord.kitchen) {
      if (minutes == 0) {
        send(
          discord.kitchen,
          payload(
            'Kitchen In Use',
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
            `${store.self?.profile.name} is using the kitchen for ${minutes} minutes`,
          ),
        )
      }
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
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <H2>Kitchen Use</H2>
          <div class="mt-4 flex gap-4">
            <Button primary onclick={() => handleKitchenUse(0)}>
              Clear
            </Button>
            <Button onclick={() => handleKitchenUse(10)}>10 Minutes</Button>
            <Button onclick={() => handleKitchenUse(30)}>30 Minutes</Button>
            <Button danger onclick={() => handleKitchenUse(60)}>
              60 Minutes
            </Button>
          </div>
        </div>
      </Show>
    </div>
  )
}
