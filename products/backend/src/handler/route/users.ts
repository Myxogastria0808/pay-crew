import { userPostResponseSchema, userPostRequestSchema, userGetResponseSchema } from 'paycrew-validator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { OpenAPIHono } from '@hono/zod-openapi';
import { route } from '../shared';
import { users } from '../../db/schema';
import type { Bindings } from '../../domain';
import { HTTPException } from 'hono/http-exception';

const user = new OpenAPIHono<{
  Bindings: Bindings;
}>({
  // Open API Honoのインスタンスを生
  // ZodのバリデーションエラーをHTTPExceptionで投げるように設定
  // result.successがfalseの場合はZodErrorが入っている
  defaultHook: (result) => {
    if (!result.success) {
      console.error(result.error);
      throw new HTTPException(400, {
        message: 'Zod Validation Error',
      });
    }
  },
});

const userPostSchema = route.createSchema(
  {
    path: '/users',
    method: 'post',
    description: 'ユーザーの作成',
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: userPostRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
        content: {
          'application/json': {
            schema: userPostResponseSchema,
          },
        },
      },
    },
  },
  [500]
);

const userGetSchema = route.createSchema(
  {
    path: '/users',
    method: 'get',
    description: 'ユーザーの取得',
    request: {},
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: userGetResponseSchema,
          },
        },
      },
    },
  },
  [500]
);

user.openapi(userGetSchema, async (c) => {
  const db = drizzle({ connection: c.env.HYPERDRIVE, casing: 'snake_case' });
  const result = await db.select().from(users);
  return c.json(result);
});

user.openapi(userPostSchema, async (c) => {
  const { name, email, password } = await c.req.json();
  const db = drizzle({ connection: c.env.HYPERDRIVE, casing: 'snake_case' });
  const result = await db.insert(users).values({ name, email, password }).returning();
  return c.json(result);
});

export default user;
