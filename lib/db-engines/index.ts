import { DBEngine } from 'types';
import { SQLiteEngine } from './sqlite';

export class DBEngineManager {
  private dbEngine?: DBEngine;

  constructor(dbEngine?: DBEngine) {
    this.dbEngine = dbEngine;
  }

  public intiateDB(): void {
    let db;
    switch (this.dbEngine) {
      default:
        db = new SQLiteEngine();
        db.initialize();
        break;
    }
  }
}
