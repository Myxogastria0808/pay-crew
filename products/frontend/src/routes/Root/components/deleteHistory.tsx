import { useDeleteApiHistorys } from '../../../api/api';
import type { DeleteApiHistorysBody } from '../../../api/api.schemas';
import type { ApiError } from '../../../api/apiError';
import styles from '../index.module.css';

const DeleteHistory = ({ id }: { id: number }) => {
  const { trigger, data, error } = useDeleteApiHistorys<ApiError>();

  const deleteHistoryById = async (id: number) => {
    await trigger({ id: id } satisfies DeleteApiHistorysBody);
  };

  return (
    <>
      <button
        className={styles.buttonDelete}
        onClick={async () => {
          deleteHistoryById(id);
        }}
      >
        <img src="../../public/dust-box.png" alt="削除" className={styles.dustBox} />
      </button>
      {error ? <p>削除に失敗しました。</p> : data != undefined && data.status == 500}
    </>
  );
};

export default DeleteHistory;
