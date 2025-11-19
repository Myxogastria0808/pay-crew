/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const webhookUrl =
      'https://discord.com/api/webhooks/1430405385671671858/EZZlF3vrhVw-zwhBg9OVVuINsOJHSc-NneYRfVKzR-V32Ng76lYLcByOnVKCkNuVrIfG';

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'ふなっしー!!!!!' }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Discord webhook failed:', res.status, text);
      return new Response('Failed to send webhook', { status: 500 });
    }

    return new Response('Webhook sent!');
  },
} satisfies ExportedHandler<Env>;
