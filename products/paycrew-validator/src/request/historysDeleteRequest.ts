import { z } from '@hono/zod-openapi';

export const historysDeleteRequestSchema = z.object({
  id: z.number().positive({ message: 'IDは正の数である必要があります。' }),
});

export type HistorysDeleteRequestSchemaType = z.infer<typeof historysDeleteRequestSchema>;
