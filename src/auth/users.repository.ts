import { InjectKysely } from 'nestjs-kysely';
import { v4 as uuidv4 } from 'uuid';
import { Database, UserTable } from 'src/database';

export class UsersRepository {
  constructor(@InjectKysely() private readonly database: Database) {}

  async getAll() {
    return this.database.selectFrom('users').selectAll().execute();
  }

  async findKey(id: string): Promise<{ open_ai_key: string }> {
    return await this.database
      .selectFrom('users')
      .select('open_ai_key')
      .where('user_id', '=', id)
      .executeTakeFirst();
  }

  async find(username: string): Promise<UserTable> {
    return await this.database
      .selectFrom('users')
      .selectAll()
      .where('username', '=', username)
      .executeTakeFirst();
  }

  async save(username: string, password: string, key: string): Promise<void> {
    await this.database
      .insertInto('users')
      .values({
        user_id: uuidv4(),
        username: username,
        pwd: password,
        open_ai_key: key,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .executeTakeFirst();
  }
}
