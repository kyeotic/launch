import { z } from 'zod/v4'

export const WebhookTypeSchema = z.enum([
  'KitchenClear',
  'KitchenInUse',
  'LaundryClear',
  'LaundryInUse',
])

export const WebhookType = WebhookTypeSchema.enum
