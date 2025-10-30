import type { FC } from "react";
import styles from './index.module.css';

const Receipt: FC = () => {
  return(
    <main>
      <h1>レシート返金メモ（試作）</h1>

      <div className={styles.personButtons}>
        <button className={styles.personButton}>Aさん</button>
        <button className={styles.personButton}>Bさん</button>
        <button className={styles.personButton}>Cさん</button>
        <button className={styles.personButton}>Dさん</button>
        <button className={styles.personButton}>割り勘</button>
      </div>

      <div className={styles.itemList}>
        <div className={styles.itemCard}>
          <input type="checkbox" className={styles.itemCheckbox} />
          <div className={styles.itemInfo}>
            <span className={styles.itemName}>ハンバーグ定食</span>
            <span className={styles.itemPrice}>¥980</span>
          </div>
        </div>

        <div className={styles.itemCard}>
          <input type="checkbox" className="item-checkbox" />
          <div className={styles.itemInfo}>
            <span className={styles.itemName}>ドリンクバー</span>
            <span className={styles.itemPrice}>¥200</span>
          </div>
        </div>

        <div className={styles.itemCard}>
          <input type="checkbox" className="item-checkbox" />
          <div className={styles.itemInfo}>
            <span className={styles.itemName}>デザートプレート</span>
            <span className={styles.itemPrice}>¥450</span>
          </div>
        </div>

        <div className={styles.itemCard}>
          <input type="checkbox" className="item-checkbox" />
          <div className={styles.itemInfo}>
            <span className={styles.itemName}>チーズトッピング</span>
            <span className={styles.itemPrice}>¥120</span>
          </div>
        </div>
      </div>

      <table className={styles.paymentTable}>
        <thead>
          <tr>
            <th>支払う人</th>
            <th>受け取る人</th>
            <th>金額</th>
            <th>内訳</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bさん</td>
            <td>Aさん</td>
            <td>¥1,180</td>
            <td>ハンバーグ定食＋ドリンクバー</td>
          </tr>
          <tr>
            <td>Cさん</td>
            <td>Aさん</td>
            <td>¥450</td>
            <td>デザートプレート</td>
          </tr>
          <tr>
            <td>Dさん</td>
            <td>Aさん</td>
            <td>¥120</td>
            <td>チーズトッピング</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}

export default Receipt