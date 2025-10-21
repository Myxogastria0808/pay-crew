# 構成
- index.ts: export
- model: serviceで定義するAPIの型定義
- service: APIの処理

# index.ts
modelやserviceを更新したら、このファイルからexportし直す。ほかディレクトリからapplicationの中身をimportするときはこのファイルからexportしたものをimportする。

# model
例
```typescriptreaact
export type HistorysServiceType = {
  getHistorysService: () => Promise<HistorysGetResponseSchemaType>;
  postHistorysService: (historysPostRequest: HistorysPostRequestSchemaType) => Promise<HistorysPostResponseSchemaType>;
  deleteHistorysService: (historysDeleteRequest: HistorysDeleteRequestSchemaType) => Promise<HistorysDeleteResponseSchemaType>
};
```
APIのGET,POST,DELETEなどそれぞれに対応する関数の型定義。引数の型と返り値の型は"paycrew-validator"で定義されたものをimportする。

# service
例
```typescriptreact
export class HistorysService implements HistorysServiceType {
  private hyperdrive: Readonly<Hyperdrive>;

  constructor(hyperdrive: Hyperdrive) {
    this.hyperdrive = hyperdrive;
  }

  async getHistorysService() {
    // 略
  }

  async postHistorysService(historysPostRequest: HistorysPostRequestSchemaType) {
    // 略
  }

  async deleteHistorysService(historysDeleteRequest: HistorysDeleteRequestSchemaType) {
    // 略
  }
}
```
APIの内部の処理を記述する。modelのほうで定めた関数を実装する。`hyperdrive`はデータベースにアクセスするための値。
```typescriptreact
const db = drizzle({ connection: this.hyperdrive });
```
drizzleのデータベースの接続。
```typescriptreact
const result = await db.select().from(historys).where(
    and(
        eq(historys.from, from), 
        eq(historys.to, to)
    )
);
```
```typescriptreact
const result = await db.insert(historys).values(history).returning();
```
```typescriptreact
const result = await db.delete(historys).where(eq(historys.id, id)).returning();
```
データベースの選択、挿入、削除。`historys`は表の指定で、"../../db/schema"からimportする。`where`メソッドは条件の指定で、`and`や`eq`関数を用いる("drizzle-orm"からimport)。`returning`メソッドは挿入や削除、更新時に使えて、対象となった表の行の内容をすべて返す。  
その他詳しいことはhttps://orm.drizzle.team/docs/data-querying参照。