import { HistoryForm, History } from './components';
import styles from './index.module.css';
import type { FC } from 'react';

const Root: FC = () => {
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

        <HistoryForm />

        <div className={styles.history}>
          <h2>現在の状況</h2>
          <History />
        </div>

        <div className={styles.reminder}>
          <h2>リマインダー通知</h2>
          <p className={styles.reminderMessage}>現在通知はありません。</p>
        </div>

        <div className={styles.reminderForm}>
          <h2>リマインダー入力</h2>
          <form>
            <input id="to" type="" {...register('to')} />
            <input id="to" type="" {...register('to')} />
            <input id="to" type="" {...register('to')} />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Root;
