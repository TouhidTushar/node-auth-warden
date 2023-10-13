import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { SQLITE_DB_NAME } from 'consts';

export class SQLiteEngine {
  public initialize(): void {
    open({
      filename: path.join(process.cwd(), SQLITE_DB_NAME),
      driver: sqlite3.Database,
    })
      .then(async () => {
        console.log(
          'Database connection established successfully at ' +
            path.join(process.cwd(), SQLITE_DB_NAME),
        );
      })
      .catch((err) => {
        console.log('Error connecting to the database.');
        console.log(err);
      });
  }
}
