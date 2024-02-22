import { Insertable, Kysely, Selectable, Updateable } from 'kysely';

export interface Tables {
  users: UserTable;
}

export interface UserTable {
  user_id: string;
  username: string;
  pwd: string;
  open_ai_key: string;
  created_at: Date;
  updated_at: Date;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export class Database extends Kysely<Tables> {}
