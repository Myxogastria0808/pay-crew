import { OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';
import type { ErrorResponseSchemaType } from 'paycrew-validator';
import type { Bindings } from './domain';
import { user } from './handler';

const app = new OpenAPIHono<{
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

// CORSの設定
app.use('/', cors());

// 404以外のエラーハンドリング
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json(
      {
        status: error.status,
        message: error.message,
      } satisfies ErrorResponseSchemaType,
      error.status
    );
  }
  return c.json(
    {
      status: 500,
      message: 'Internal Server Error',
    } satisfies ErrorResponseSchemaType,
    500
  );
});

// ルートの登録
app.route('/', user);

// 404のエラーハンドリング
app.notFound((c) => {
  console.error(`Not Found: ${c.req.url}`);
  return c.json({ status: 404, message: 'Not Found' } satisfies ErrorResponseSchemaType, 404);
});

export default app;
