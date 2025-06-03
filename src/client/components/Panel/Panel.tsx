import { type JSX, type ParentProps } from 'solid-js'
import classnames from 'classnames'

interface PanelProps extends ParentProps {
  class?: string
}

export default function Panel(props: PanelProps): JSX.Element {
  return (
    <div
      class={classnames(
        'bg-white dark:bg-gray-800 shadow rounded-lg p-6',
        props.class,
      )}
    >
      {props.children}
    </div>
  )
}
