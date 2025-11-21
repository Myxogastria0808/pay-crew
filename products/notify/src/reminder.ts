import { type HistoryGetResponseSchemaType } from 'validator';

export const reminder = async (api_url: string): Promise<string> => {
  const response = await fetch(api_url + '/history', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const historyData = await response.json<HistoryGetResponseSchemaType>();

  const message = historyData.map((v) => `返金の流れ: ${v.to} -> ${v.from}\n\t金額: ${v.amount}\n`).join('\n');

  return `========================================\n現在残っている返金\n${message}\n========================================`;
};
