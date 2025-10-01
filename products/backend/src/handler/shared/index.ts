import { errorResponseSchema } from 'paycrew-validator';
import { ZodOpenAPISchema } from '../../tmp';

export const route = new ZodOpenAPISchema({
  400: {
    description: 'Bad Request',
    content: { 'application/json': { schema: errorResponseSchema } },
  },
  500: {
    description: 'Internal Server Error',
    content: { 'application/json': { schema: errorResponseSchema } },
  },
} as const);
