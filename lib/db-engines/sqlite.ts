import path from 'path';
import Knex from 'knex';

import { SQLITE_DB_NAME } from 'consts';

export class SQLiteEngine {
  private dbPath: string;

  constructor(dbPath?: string) {
    this.dbPath = dbPath || process.cwd();
  }

  public async initialize(): Promise<void> {
    const knexConfig = {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: path.join(this.dbPath, SQLITE_DB_NAME),
      migrations: {
        directory: __dirname + '/db/migrations',
      },
    };

    try {
      const knex = Knex(knexConfig);

      await knex.raw('SELECT 1');
      console.log(
        'Database connection established successfully at ' +
          path.join(this.dbPath, SQLITE_DB_NAME),
      );

      console.log('Migrating database to latest state...');
      await knex.migrate.latest();
      console.log('Database migration successful');
    } catch (err) {
      console.error(err);
      throw new Error(
        'Failed to establish database connection at ' +
          path.join(this.dbPath, SQLITE_DB_NAME),
      );
    }
  }
}
