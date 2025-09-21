import type { FC } from 'react';
import styles from './index.module.css';

import * as Sentry from '@sentry/react';

const Root: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>お金の貸し借り管理</h1>

        <form id="loan-form">
          <div className={styles.formGroup}>
            <label>借りた人の名前:</label>
            <input type="text" />
          </div>

          <div className={styles.formGroup}>
            <label>借りた金額 (円):</label>
            <input type="number" id="amount" name="amount" min="1" required />
          </div>

          <button type="submit">追加</button>
        </form>

        <div className={styles.history}>
          <h2>履歴</h2>
          <ul className={styles.historyList}></ul>
        </div>

        <div className={styles.reminder}>
          <h2>リマインダー通知</h2>
          <p className={styles.reminderMessage}>現在通知はありません。</p>
        </div>
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
      </div>
    </>
  );
};

export default Root;
