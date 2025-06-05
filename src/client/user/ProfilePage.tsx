import { JSX, Show } from 'solid-js'
import { useStores } from '../data/stores'
import ProfileEdit from './ProfileEdit'
import { UserProfile } from '../../server/users/types'
import { Button, PageLoader } from '../components'
import { useAuth } from '../auth/AuthProvider'

export default function ProfilePage(): JSX.Element {
  const { user: store } = useStores()
  const auth = useAuth()

  function handleSave(profile: UserProfile) {
    store.updateProfile(profile)
  }

  return (
    <Show when={!store.isLoading} fallback={<PageLoader />}>
      <ProfileEdit profile={store.self!.profile} onSave={handleSave} />

      <Button danger class="mt-8" onclick={() => auth.logout()}>
        Logout
      </Button>
    </Show>
  )
}
