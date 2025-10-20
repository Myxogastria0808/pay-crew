import { drizzle } from 'drizzle-orm/node-postgres';
import { historys } from '../../db/schema';
import { HistorysDeleteRequestSchemaType, HistorysPostRequestSchemaType } from 'paycrew-validator';
import { HistorysServiceType } from '../model/historys';
import { and, eq } from 'drizzle-orm';

export class HistorysService implements HistorysServiceType {
  private hyperdrive: Readonly<Hyperdrive>;

  constructor(hyperdrive: Hyperdrive) {
    this.hyperdrive = hyperdrive;
  }

  async selectHistorysDBAll() {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.select().from(historys);
    return result;
  }

  async selectHistorysDBByFromTo({ from, to }: { from: string, to: string }) {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.select().from(historys).where(and(eq(historys.from, from), eq(historys.to, to)));
    return result;
  }

  async insertHistorysDB(history: { from: string, to: string, amount: number }) {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.insert(historys).values(history).returning();
    return result;
  }

  async deleteHistorysDBById({ id }: { id: number }) {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.delete(historys).where(eq(historys.id, id)).returning();
    return result;
  }

  async getHistorysService() {
    const result = await this.selectHistorysDBAll();
    return result;
  }

  async postHistorysService(historysPostRequest: HistorysPostRequestSchemaType) {
    const match_data = await this.selectHistorysDBByFromTo({ from: historysPostRequest.from, to: historysPostRequest.to });
    if (match_data.length > 0) {
      await this.deleteHistorysDBById({ id: match_data[0].id });
      historysPostRequest.amount += match_data[0].amount;
    }

    const reverse_match_data = await this.selectHistorysDBByFromTo({ from: historysPostRequest.to, to: historysPostRequest.from });
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

  async deleteHistorysService(historysDeleteRequest: HistorysDeleteRequestSchemaType) {
    const result = await this.deleteHistorysDBById({ id: historysDeleteRequest.id });
    return result.length > 0 ? result[0] : null;
  }
}
