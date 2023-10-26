import Logger from 'utils/logger';
import { LocalOptions } from 'types';
import { DbEngineManager } from 'db-engines';

export class LocalChannel {
  private options?: LocalOptions;

  constructor(options?: LocalOptions) {
    this.options = options;
  }

  public initiateLocalChannel(): void {
    Logger.info('Initializing Local Authentication Channel...');
    const db = new DbEngineManager(this.options);
    db.intiateDB();
  }
}
