import { errorResponseAPISchema } from 'paycrew-validator';
import { ZodOpenAPISchema } from 'zod-openapi-share';

export const route = new ZodOpenAPISchema({
  400: {
    description: 'Bad Request',
    content: { 'application/json': { schema: errorResponseAPISchema } },
  },
  500: {
    description: 'Internal Server Error',
    content: { 'application/json': { schema: errorResponseAPISchema } },
  },
} as const);
