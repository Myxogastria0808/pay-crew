import { useEffect, useState, type FC } from 'react';
import { useDeleteApiHistory } from '../../../../api/api';
import type { DeleteApiHistoryBody } from '../../../../api/api.schemas';
import type { ApiError } from '../../../../api/apiError';
import styles from './DeleteHistory.module.css';

type Props = {
  id: number;
};

const DeleteHistory: FC<Props> = (props: Props) => {
  const { isMutating, trigger, data, error } = useDeleteApiHistory<ApiError>();

  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    if (isMutating) {
      setIsDeleted(true);
    } else if (!isMutating && error) {
      setIsDeleted(false);
    }
  }, [isMutating])

  const deleteHistoryById = async (id: number) => {
    await trigger({ id: id } satisfies DeleteApiHistoryBody);
  };

  return (
    <>
      <button
        className={styles.buttonDelete}
        onClick={async () => {
          await deleteHistoryById(props.id);
        }}
        disabled={isMutating || isDeleted}
      >
        {
          isMutating
          ? "削除中"
          : isDeleted
          ? "削除済み"
          : <img src="/dust-box.png" alt="削除" className={styles.dustBox} />
        }
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
