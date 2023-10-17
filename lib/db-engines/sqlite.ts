import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import { SQLITE_DB_NAME } from 'consts';

export class SQLiteEngine {
  private dbPath: string;

  constructor(dbPath?: string) {
    this.dbPath = dbPath || process.cwd();
  }

  public initialize(): void {
    open({
      filename: path.join(this.dbPath, SQLITE_DB_NAME),
      driver: sqlite3.Database,
    })
      .then(async () => {
        console.log(
          'Database connection established successfully at ' +
            path.join(this.dbPath, SQLITE_DB_NAME),
        );
      })
      .catch((err) => {
        console.error(err);
        throw new Error(
          'Failed to establish database connection at ' +
            path.join(this.dbPath, SQLITE_DB_NAME),
        );
      });
  }
}
