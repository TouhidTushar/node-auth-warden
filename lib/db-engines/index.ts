import { SQLiteEngine } from './sqlite';

import { DbEngine } from 'consts';
import { LocalOptions } from 'types';
import converter from 'utils/converter';

export class DbEngineManager {
  private options?: LocalOptions;

  constructor(options?: LocalOptions) {
    this.options = options;
  }

  public intiateDB(): void {
    let db;
    const dbEngine = this.options?.dbEngine || DbEngine.SQLITE_DB;
    switch (dbEngine) {
      case DbEngine.SQLITE_DB:
        db = new SQLiteEngine(this.options?.dbPath);
        db.initialize();
        break;
      default:
        throw new Error(
          `Invalid database engine: ${dbEngine}. Valid engines are ${converter.enumToString(
            DbEngine,
          )}`,
        );
    }
  }
}
