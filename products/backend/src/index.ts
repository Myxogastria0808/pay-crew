import { drizzle } from 'drizzle-orm/node-postgres';
import { Hono } from 'hono';
import { users } from './db/schema';

export type Bindings = {
  HYPERDRIVE: Hyperdrive;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/users', async (c) => {
  const db = drizzle({ connection: c.env.HYPERDRIVE, casing: 'snake_case' });
  const result = await db.select().from(users);
  return c.json(result);
});

app.post('/users', async (c) => {
  const { name, email, password } = await c.req.json();
  const db = drizzle({ connection: c.env.HYPERDRIVE, casing: 'snake_case' });
  const result = await db.insert(users).values({ name, email, password }).returning();
  return c.json(result);
});

export default app;
