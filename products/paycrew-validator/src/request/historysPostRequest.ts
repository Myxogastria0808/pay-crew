import { z } from '@hono/zod-openapi';

export const historysPostRequestSchema = z.object({
  from: z.string().min(1, { message: '名前は必須です。' }),
  to: z.string().min(1, { message: '名前は必須です。' }),
  amount: z.number().min(1, { message: '1円以上の金額を入力してください。' }),
});

export type HistorysPostRequestSchemaType = z.infer<typeof historysPostRequestSchema>;
