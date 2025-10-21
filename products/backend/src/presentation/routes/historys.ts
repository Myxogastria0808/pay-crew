import { HTTPException } from 'hono/http-exception';
import { OpenAPIHono } from '@hono/zod-openapi';
import { route } from '../share';
import type { Bindings } from '../share/binding';
import { HistorysService } from '../../application';
import {
  historysGetResponseSchema,
  historysPostResponseSchema,
  historysPostRequestSchema,
  historysDeleteRequestSchema,
  historysDeleteResponseSchema,
} from 'paycrew-validator';

const historys = new OpenAPIHono<{
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

const historysGetSchema = route.createSchema(
  {
    path: '/api/historys',
    method: 'get',
    description: '履歴の取得',
    request: {},
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: historysGetResponseSchema,
          },
        },
      },
    },
  },
  [500]
);

historys.openapi(historysGetSchema, async (c) => {
  // NOTE: application層のサービスを呼び出す
  const service = new HistorysService(c.env.HYPERDRIVE);
  const result = await service.getHistorysService();

  return c.json(result);
});

const historysPostSchema = route.createSchema(
  {
    path: '/api/historys',
    method: 'post',
    description: '履歴の追加',
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: historysPostRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
        content: {
          'application/json': {
            schema: historysPostResponseSchema,
          },
        },
      },
    },
  },
  [500]
);

historys.openapi(historysPostSchema, async (c) => {
  c.status(201);
  const data = c.req.valid('json');
  // NOTE: application層のサービスを呼び出す
  const service = new HistorysService(c.env.HYPERDRIVE);
  const result = await service.postHistorysService(data);

  return c.json(result);
});

const historysDeleteSchema = route.createSchema(
  {
    path: '/api/historys',
    method: 'delete',
    description: '履歴の削除',
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: historysDeleteRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: historysDeleteResponseSchema,
          },
        },
      },
    },
  },
  [500]
);

historys.openapi(historysDeleteSchema, async (c) => {
  const data = c.req.valid('json');
  // NOTE: application層のサービスを呼び出す
  const service = new HistorysService(c.env.HYPERDRIVE);
  const result = await service.deleteHistorysService(data);

  return c.json(result);
});

export default historys;
