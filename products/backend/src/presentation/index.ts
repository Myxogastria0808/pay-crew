import { OpenAPIHono } from '@hono/zod-openapi';
import { Bindings } from './share/binding';
import { HTTPException } from 'hono/http-exception';
import historys from './routes/historys';
export { default as historys } from './routes/historys';

const root = new OpenAPIHono<{
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

// エンドポイントの登録
root.route('/', historys);

export default root;
