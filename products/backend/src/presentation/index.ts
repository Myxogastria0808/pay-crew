import { OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from './share/binding';
import { HTTPException } from 'hono/http-exception';
import user from './routes/users';
export { default as user } from './routes/users';

const root = new OpenAPIHono<{
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

// エンドポイントの登録
root.route('/', user);

export default root;
