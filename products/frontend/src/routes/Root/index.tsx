import type { FC } from 'react';
import * as Sentry from '@sentry/react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { userPostRequestSchema, type UserPostRequestSchemaType } from 'paycrew-validator';

import { usePostUsers } from '../../api/api';
import type { ApiError } from '../../api/apiError';
import type { PostUsersBody } from '../../api/api.schemas';

const Root: FC = () => {
  const { isMutating, trigger, reset, data, error } = usePostUsers<ApiError>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPostRequestSchemaType>({
    resolver: zodResolver(userPostRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<UserPostRequestSchemaType> = async (formData) => {
    // 送信のフックを発火させる
    await trigger(formData satisfies PostUsersBody);
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register('name')} />
        <ErrorMessage errors={errors} name="name" message={errors.name?.message} />
        <br />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        <ErrorMessage errors={errors} name="email" message={errors.email?.message} />
        <br />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        <ErrorMessage errors={errors} name="password" message={errors.password?.message} />
        <br />
        <button type="submit" disabled={isMutating}>
          {isMutating ? '送信中…' : '送信'}
        </button>
      </form>
      {error && <p style={{ color: 'crimson' }}>status: {error.message}</p>}
      {data && (
        <div>
          <p>status: {data.status}</p>
          <p>result: {JSON.stringify(data.data)}</p>
        </div>
      )}
      {/* 受信データのクリア */}
      <button onClick={() => reset()}>リセット</button>
      {/* エラーを発生させるボタン */}
      <button
        onClick={() => {
          // Send a log before throwing the error
          Sentry.logger.info('User triggered test error', {
            action: 'test_error_button_click',
          });
          throw new Error('This is your first error!');
        }}
      >
        Break the world
      </button>
    </main>
  );
};

export default Root;
