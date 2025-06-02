import { createFormControl, createFormGroup } from 'solid-forms'
import { TextInput } from '../components/Forms'
import Button from '../components/Button/Button'
import { UserProfile } from '../../server/users/types'
import { toast } from '../components/Toast/toast'

export default function ProfileEdit(props: {
  profile: UserProfile
  onSave: (profile: UserProfile) => void
}) {
  const form = createFormGroup({
    name: createFormControl<string | null>(props.profile.name),
    // email: createFormControl<string | null>(props.profile.email),
    // username: createFormControl<string | null>(props.profile.username),
  })

  function handleSubmit(e: Event) {
    e.preventDefault()
    if (!form.isValid) return

    props.onSave({
      ...props.profile,
      name: form.value.name || null,
      // email: form.value.email || null,
      // username: form.value.username || null,
    })

    toast.success('Profile updated')
  }

  return (
    <div class="space-y-6">
      <form onSubmit={handleSubmit} class="space-y-4">
        <TextInput label="Name" control={form.controls.name as any} />
        {/* <TextInput label="Email" control={form.controls.email as any} />
        <TextInput label="Username" control={form.controls.username as any} /> */}

        <Button type="submit" primary>
          Save Profile
        </Button>
      </form>
    </div>
  )
}
