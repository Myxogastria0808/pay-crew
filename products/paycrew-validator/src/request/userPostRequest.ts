import { z } from 'zod';

export const userPostRequestSchema = z.object({
  name: z.string().min(1, { message: '名前は必須です。' }),
  email: z.email({ message: '有効なメールアドレスを入力してください。' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上である必要があります。' }),
});

export type UserPostRequestSchemaType = z.infer<typeof userPostRequestSchema>;
