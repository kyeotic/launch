const GREEN = 5832569
const RED = 16734336

export interface DiscordWebhookPayload {
  content: string | null
  embeds: { title: string; color: number; description?: string }[]
  attachments: { url: string }[]
}

export function payload(
  title: string,
  color: 'green' | 'red',
  description?: string,
): DiscordWebhookPayload {
  return {
    content: null,
    embeds: [{ title, color: color === 'green' ? GREEN : RED, description }],
    attachments: [],
  }
}

export function send(webhook: string, payload: DiscordWebhookPayload) {
  fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
