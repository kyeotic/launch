const envPort = Deno.env.get('PORT')
const isDenoDeploy = !!Deno.env.get('DENO_DEPLOYMENT_ID')
const discordKitchenWebhook = Deno.env.get('DISCORD_KITCHEN_WEBHOOK')!
const discordLaundryWebhook = Deno.env.get('DISCORD_LAUNDRY_WEBHOOK')!
const discordDebugWebhook = Deno.env.get('DISCORD_DEBUG_WEBHOOK')!

const port = envPort ? parseFloat(envPort) : 8080

export default {
  isDenoDeploy,
  port,
  distDir: '../../dist',
  discord: {
    kitchen: isDenoDeploy ? discordKitchenWebhook : discordDebugWebhook,
    laundry: isDenoDeploy ? discordLaundryWebhook : discordDebugWebhook,
  },
  auth: {
    audience: 'kyeotek',
    issuer: 'https://kyeotek-auth0.kye.dev/',
    algorithms: ['RS256'],
  },
  webpush: {
    adminEmail: 'tim@kye.dev',
    keysBase64: Deno.env.get('WEBPUSH_KEYS_BASE64')!,
  },
} as const
