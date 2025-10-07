import { HTTPException } from 'hono/http-exception';
import { OpenAPIHono } from '@hono/zod-openapi';
import { userPostResponseSchema, userPostRequestSchema, userGetResponseSchema } from 'paycrew-validator';
import { route } from '../share';
import type { Bindings } from '../share/binding';
import { UserService } from '../../application';

const user = new OpenAPIHono<{
  Bindings: Bindings;
}>({
  // Open API Honoのインスタンスを生成
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

const userGetSchema = route.createSchema(
  {
    path: '/api/users',
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
  // NOTE: application層のサービスを呼び出す
  const service = new UserService(c.env.HYPERDRIVE);
  const result = await service.getUserService();

  return c.json(result);
});

const userPostSchema = route.createSchema(
  {
    path: '/api/users',
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

user.openapi(userPostSchema, async (c) => {
  const data = c.req.valid('json');
  // NOTE: application層のサービスを呼び出す
  const service = new UserService(c.env.HYPERDRIVE);
  const result = await service.postUserService(data);

  return c.json(result);
});

export default user;
