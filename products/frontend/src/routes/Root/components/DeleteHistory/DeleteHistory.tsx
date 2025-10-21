import type { FC } from 'react';
import { useDeleteApiHistorys } from '../../../../api/api';
import type { DeleteApiHistorysBody } from '../../../../api/api.schemas';
import type { ApiError } from '../../../../api/apiError';
import styles from '../../index.module.css';

type Props = {
  id: number;
};

const DeleteHistory: FC<Props> = (props: Props) => {
  const { trigger, data, error } = useDeleteApiHistorys<ApiError>();

  const deleteHistoryById = async (id: number) => {
    await trigger({ id: id } satisfies DeleteApiHistorysBody);
  };

  return (
    <>
      <button
        className={styles.buttonDelete}
        onClick={async () => {
          deleteHistoryById(props.id);
        }}
      >
        <img src="/dust-box.png" alt="削除" className={styles.dustBox} />
      </button>
      {error ? (
        <p>削除に失敗しました: {error.message}</p>
      ) : data !== undefined && data.status === 500 ? (
        <p>削除に失敗しました: {data.data.message}</p>
      ) : null}
    </>
  );
};

export default DeleteHistory;
