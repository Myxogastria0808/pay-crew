import { z } from '@hono/zod-openapi';

export const userPostResponseSchema = z.array(
  z.object({
    id: z.number().min(1),
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
  })
);

export type UserPostResponseSchemaType = z.infer<typeof userPostResponseSchema>;
