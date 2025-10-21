import type { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { historysPostRequestSchema, type HistorysPostRequestSchemaType } from 'paycrew-validator';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { usePostApiHistorys } from '../../../../api/api';
import type { ApiError } from '../../../../api/apiError';
import type { PostApiHistorysBody } from '../../../../api/api.schemas';
import styles from '../../index.module.css';

const HistoryForm: FC = () => {
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
      amount: 1,
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
      <p>
        {isMutating
          ? '追加中...'
          : error
            ? `追加に失敗しました: ${error.message}`
            : data === undefined
              ? ''
              : data.status === 500
                ? `追加に失敗しました: ${data.data.message}`
                : '追加しました'}
      </p>
    </form>
  );
};

export default HistoryForm;
