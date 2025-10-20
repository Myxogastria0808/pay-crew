import { type FC } from 'react';
import { useGetApiHistorys } from '../../../api/api';
import { type ApiError } from '../../../api/apiError';
import styles from '../index.module.css';
import DeleteHistory from './deleteHistory';

const Historys: FC = () => {
  const { data, error, isLoading } = useGetApiHistorys<ApiError>();
  return (
    <>
      {isLoading ? (
        <p>読み込み中</p>
      ) : error ? (
        <p>読み込みエラー: {error.message}</p>
      ) : data?.status !== 200 ? (
        <p>読み込みエラー: {data?.data.message}</p>
      ) : (
        <table className={styles.historyList}>
          <thead>
            <tr className={styles.historyHeader}>
              <th className={styles.historyFromHeader}>まとめて払った人</th>
              <th className={styles.historyToHeader}>返金する人</th>
              <th className={styles.historyAmountHeader}>金額</th>
              <th className={styles.historyButtonHeader}></th>
            </tr>
          </thead>
          <tbody>
            {data.data
              .slice()
              .reverse()
              .map((v, i) => (
                <tr className={styles.historyItem} key={i}>
                  <td className={styles.historyFromText}>{v.from}</td>
                  <td className={styles.historyToText}>{v.to}</td>
                  <td className={styles.historyAmountText}>{v.amount}</td>
                  <td>
                    <DeleteHistory id={v.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Historys;
