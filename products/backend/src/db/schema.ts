import { serial, pgTable, varchar } from 'drizzle-orm/pg-core';

export const historys = pgTable('historys', {
  id: serial('id').primaryKey(),
  from: varchar('from').notNull(),
  to: varchar('to').notNull(),
  amount: serial('amonut').notNull(),
});
