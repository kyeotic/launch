import { Route, Router } from '@solidjs/router'
import { Component, JSX } from 'solid-js'
import ProfilePage from '../user/ProfilePage'
import ShortcutsPage from '../shortcuts/ShortcutsPage'

export const HOME = '/'
export const UTIL = '/util'
export const SHORTCUTS = '/shortcuts'
export const USER_PROFILE = '/user/profile'

export function Routes(props: { root: Component }): JSX.Element {
  return (
    <Router root={props.root}>
      <Route path={HOME} component={ShortcutsPage} />
      <Route path={SHORTCUTS} component={ShortcutsPage} />
      <Route path={USER_PROFILE} component={ProfilePage} />
      {/* <Route path={UTIL} component={DataUtilities} /> */}
    </Router>
  )
}
