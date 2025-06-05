import { z } from 'zod/v4'
import { match } from 'ts-pattern'
import { router, authProcedure } from '../trpc.ts'
import { send, payload, DiscordWebhookPayload } from './webhooks.ts'
import { WebhookType } from './types.ts'

export const discordRouter = router({
  // kitchen: publicProcedure.query(async ({ ctx: { config } }) => {
  //   return config.discord.kitchen
  // }),
  send: authProcedure
    .input(
      z.discriminatedUnion('type', [
        z.object({
          type: z.literal(WebhookType.KitchenInUse),
          duration: z.string(),
        }),
        z.object({
          type: z.literal(WebhookType.KitchenClear),
        }),
        z.object({
          type: z.literal(WebhookType.LaundryInUse),
        }),
        z.object({
          type: z.literal(WebhookType.LaundryClear),
        }),
      ]),
    )
    .mutation(async ({ input, ctx: { user, stores, config } }) => {
      const self = await stores.users.get(user.id)
      const name = self?.profile.name

      if (!name) throw new Error('User has no name')

      const hook = match(input)
        .returnType<{ channel: string; payload: DiscordWebhookPayload }>()
        .with({ type: WebhookType.KitchenClear }, () => ({
          channel: config.discord.kitchen,
          payload: payload(
            'Kitchen Clear',
            'green',
            `${name} is done using the kitchen`,
          ),
        }))
        .with({ type: WebhookType.KitchenInUse }, (input) => ({
          channel: config.discord.kitchen,
          payload: payload(
            'Kitchen In Use',
            'red',
            `${name} is using the kitchen for ${input.duration}`,
          ),
        }))
        .with({ type: WebhookType.LaundryClear }, () => ({
          channel: config.discord.laundry,
          payload: payload(
            'Laundry Clear',
            'green',
            `${name} is done with laundry`,
          ),
        }))
        .with({ type: WebhookType.LaundryInUse }, () => ({
          channel: config.discord.laundry,
          payload: payload(
            'Laundry In Use',
            'red',
            `${name} is using the laundry`,
          ),
        }))
        .exhaustive()

      await send(hook.channel, hook.payload)
    }),
})
