import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { historysPostRequestSchema, type HistorysPostRequestSchemaType } from 'paycrew-validator';
import { usePostApiHistorys } from '../../api/api';
import type { ApiError } from '../../api/apiError';
import type { PostApiHistorysBody } from '../../api/api.schemas';
import styles from './index.module.css';
import Historys from './components/historys';

const Root: FC = () => {
  const { isMutating, trigger, data, error } = usePostApiHistorys<ApiError>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HistorysPostRequestSchemaType>({
    resolver: zodResolver(historysPostRequestSchema),
    defaultValues: {
      from: '',
      to: '',
      amount: 0,
    },
  });

  const insertHistory = async (data: HistorysPostRequestSchemaType) => {
    await trigger(data satisfies PostApiHistorysBody);
  };

  const onSubmit: SubmitHandler<HistorysPostRequestSchemaType> = async (formData) => {
    // 送信のフックを発火させる
    await insertHistory(formData);
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.backgroundAlpha}>
            <h1 className={styles.title}>PayCrew</h1>

            <p className={styles.description}>
              まとめ払いの際の支払いをスムーズにするアプリです。
              <br />
              名前と金額を入力して記録できます。
            </p>
          </div>
        </div>

        <form id="loan-form" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="from">まとめて払った人の名前:</label>
            <input id="from" type="text" {...register('from')} />
            <ErrorMessage errors={errors} name="from" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="to">返金する人の名前:</label>
            <input id="to" type="text" {...register('to')} />
            <ErrorMessage errors={errors} name="to" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="amount">借りた金額 (円):</label>
            <input id="amount" type="number" {...register('amount', { valueAsNumber: true })} />
            <ErrorMessage errors={errors} name="amount" />
          </div>

          <button type="submit" disabled={isMutating} className={styles.buttonAdd}>
            追加
          </button>
        </form>

        <div>
          <p>
            {isMutating
              ? '追加中...'
              : error
                ? `追加エラー: ${error.message}`
                : data == undefined
                  ? ''
                  : data.status == 500
                    ? `追加エラー: ${data.data.message}`
                    : '追加しました'}
          </p>
        </div>

        <div className={styles.history}>
          <h2>現在の状況</h2>
          <Historys />
        </div>
        <div className={styles.reminder}>
          <h2>リマインダー通知</h2>
          <p className={styles.reminderMessage}>現在通知はありません。</p>
        </div>
      </div>
    </main>
  );
};

export default Root;
