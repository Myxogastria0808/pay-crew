import { z } from '@hono/zod-openapi';

export const historysDeleteRequestSchema = z.object({
  id: z.number(),
});

export type HistorysDeleteRequestSchemaType = z.infer<typeof historysDeleteRequestSchema>;
