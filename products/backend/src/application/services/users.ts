import { drizzle } from 'drizzle-orm/postgres-js';
import { users } from '../../db/schema';
import { UserServiceType, UserType } from '../model/users';

export class UserService implements UserServiceType {
  private hyperdrive: Readonly<Hyperdrive>;

  constructor(hyperdrive: Hyperdrive) {
    this.hyperdrive = hyperdrive;
  }

  async getUserService() {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.select().from(users);
    return result;
  }
  async postUserService(userPostRequestSchema: UserType) {
    const db = drizzle({ connection: this.hyperdrive });
    const result = await db.insert(users).values(userPostRequestSchema).returning();
    return result;
  }
}
