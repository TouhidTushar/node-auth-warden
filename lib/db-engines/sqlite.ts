import path from 'path';
import Knex from 'knex';

import Logger from 'utils/logger';
import { SQLITE_DB_NAME } from 'consts';
import MigrationManager from 'utils/migration-manager';

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
        tableName: 'node_auth_warden_migrations',
        lockTableName: 'node_auth_warden_migrations_lock',
      },
    };

    try {
      const knex = Knex(knexConfig);

      await knex.raw('SELECT 1');
      Logger.info(
        `Database connection established successfully at ${path.join(
          this.dbPath,
          SQLITE_DB_NAME,
        )}`,
      );

      await MigrationManager.migrate(knex, this.dbPath);
    } catch (err) {
      Logger.error(
        `Failed to establish database connection ${path.join(
          this.dbPath,
          SQLITE_DB_NAME,
        )}`,
        err,
      );
    }
  }
}
