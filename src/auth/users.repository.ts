import { InjectKysely } from 'nestjs-kysely';
import { Database } from 'src/database';

export class UsersRepository {
  constructor(@InjectKysely() private readonly database: Database) {}

  async getAll() {
    return this.database.selectFrom('users').selectAll().execute();
  }
}
