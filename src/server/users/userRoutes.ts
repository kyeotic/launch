import { router, authProcedure } from '../trpc.ts'
import { UserProfileSchema } from './types.ts'

export const userRouter = router({
  self: authProcedure.query(async ({ ctx: { user, stores } }) => {
    const self = await stores.users.get(user.id)
    if (!self) throw new Error('self has not been initialized somehow')
    return self
  }),
  /**
   * Returns all data needed for initial app state.
   */
  appData: authProcedure.query(async ({ ctx }) => {
    const [self] = await Promise.all([
      ctx.stores.users.get(ctx.user.id),
      // ctx.stores.groups.getByUser(ctx.user.id),
      // ctx.stores.friends.getFriends(ctx.user.id),
      // ctx.stores.friends.getRequests(ctx.user.id),
    ])
    return {
      self: self!,
      // discord: {
      //   kitchen: ctx.config.discord.kitchen,
      //   laundry: ctx.config.discord.laundry,
      // },
    }
  }),
  updateProfile: authProcedure
    .input(UserProfileSchema)
    .mutation(async ({ input, ctx: { user, stores } }) => {
      return await stores.users.updateProfile(user.id, input)
    }),
})
