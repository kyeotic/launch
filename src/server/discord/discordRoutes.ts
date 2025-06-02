import { router, publicProcedure } from '../trpc.ts'

export const discordRouter = router({
  kitchen: publicProcedure.query(async ({ ctx: { config } }) => {
    return config.discord.kitchen
  }),
})