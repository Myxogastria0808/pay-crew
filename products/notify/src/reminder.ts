import { type HistoryGetResponseSchemaType } from 'validator';

export const reminder = async (): Promise<string> => {
  const discordWebhookUrl =
    'https://discord.com/api/webhooks/1430405385671671858/EZZlF3vrhVw-zwhBg9OVVuINsOJHSc-NneYRfVKzR-V32Ng76lYLcByOnVKCkNuVrIfG';
  const historyApiUrl = 'https://pay-crew-api.yukiosada.work/api/history';

  const response = await fetch(historyApiUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const historyData = await response.json<HistoryGetResponseSchemaType>();

  const message = historyData.map((v) => `返金の流れ: ${v.to} -> ${v.from}\n\t金額: ${v.amount}\n`).join('\n');

  return `========================================\n現在残っている返金\n${message}\n========================================`;
};
