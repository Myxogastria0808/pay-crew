import { OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';

const sentry = new OpenAPIHono({
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

sentry.post('/', async (c) => {
  const body = await c.req.json();
  console.table(body);
  console.info(body);
  return c.text('Hello, World!');
});

export default sentry;
