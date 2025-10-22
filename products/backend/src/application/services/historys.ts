import { drizzle } from 'drizzle-orm/node-postgres';
import { historys } from '../../db/schema';
import {
  HistorysDeleteRequestSchemaType,
  HistorysDeleteResponseSchemaType,
  HistorysGetResponseSchemaType,
  HistorysPostRequestSchemaType,
  HistorysPostResponseSchemaType,
} from 'paycrew-validator';
import { HistorysServiceType } from '../model/historys';
import { and, eq } from 'drizzle-orm';

export class HistorysService implements HistorysServiceType {
  private hyperdrive: Readonly<Hyperdrive>;

  constructor(hyperdrive: Hyperdrive) {
    this.hyperdrive = hyperdrive;
  }

  // データベースのhistorysの行の全取得
  async selectHistorysDBAll(): Promise<(typeof historys.$inferSelect)[]> {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.select().from(historys);
    return result;
  }

  // データベースのhistorysの行の取得(fromとtoを指定)
  async selectHistorysDBByFromTo({
    from,
    to,
  }: {
    from: string;
    to: string;
  }): Promise<(typeof historys.$inferSelect)[]> {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db
      .select()
      .from(historys)
      .where(and(eq(historys.from, from), eq(historys.to, to)));
    return result;
  }

  // データベースのhistorysの行の挿入(fromとtoとamountを指定)
  async insertHistorysDB(history: typeof historys.$inferInsert): Promise<(typeof historys.$inferSelect)[]> {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.insert(historys).values(history).returning();

    fetch(
      'https://discord.com/api/webhooks/1430405385671671858/EZZlF3vrhVw-zwhBg9OVVuINsOJHSc-NneYRfVKzR-V32Ng76lYLcByOnVKCkNuVrIfG',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `${result[0].from}さんが${result[0].to}さんに${result[0].amount}円借りました。`,
        }),
      }
    );

    return result;
  }

  // データベースのhistorysの行の削除(idを指定)
  async deleteHistorysDBById({ id }: { id: number }): Promise<(typeof historys.$inferSelect)[]> {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.delete(historys).where(eq(historys.id, id)).returning();

    fetch(
      'https://discord.com/api/webhooks/1430405385671671858/EZZlF3vrhVw-zwhBg9OVVuINsOJHSc-NneYRfVKzR-V32Ng76lYLcByOnVKCkNuVrIfG',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `${result[0].from}さんが${result[0].to}さんに${result[0].amount}円返金しました。`,
        }),
      }
    );

    return result;
  }

  // /api/historysのGET
  async getHistorysService(): Promise<HistorysGetResponseSchemaType> {
    const result = await this.selectHistorysDBAll();
    return result;
  }

  // /api/historysのPOST
  async postHistorysService(
    historysPostRequest: HistorysPostRequestSchemaType
  ): Promise<HistorysPostResponseSchemaType> {
    const match_data = await this.selectHistorysDBByFromTo({
      from: historysPostRequest.from,
      to: historysPostRequest.to,
    });
    if (match_data.length > 0) {
      await this.deleteHistorysDBById({ id: match_data[0].id });
      historysPostRequest.amount += match_data[0].amount;
    }

    const reverse_match_data = await this.selectHistorysDBByFromTo({
      from: historysPostRequest.to,
      to: historysPostRequest.from,
    });
    if (reverse_match_data.length > 0) {
      await this.deleteHistorysDBById({ id: reverse_match_data[0].id });
      historysPostRequest.amount -= reverse_match_data[0].amount;
      if (historysPostRequest.amount < 0) {
        const temp = historysPostRequest.from;
        historysPostRequest.from = historysPostRequest.to;
        historysPostRequest.to = temp;
        historysPostRequest.amount = -historysPostRequest.amount;
      }
    }
    if (historysPostRequest.amount === 0) {
      return null;
    }

    const result = await this.insertHistorysDB(historysPostRequest);
    return result;
  }

  // /api/historysのDELETE
  async deleteHistorysService(
    historysDeleteRequest: HistorysDeleteRequestSchemaType
  ): Promise<HistorysDeleteResponseSchemaType> {
    const result = await this.deleteHistorysDBById({ id: historysDeleteRequest.id });
    return result.length > 0 ? result[0] : null;
  }
}
