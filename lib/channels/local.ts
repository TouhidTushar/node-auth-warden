import { LocalOptions } from 'types';
import { DbEngineManager } from 'db-engines';

export class LocalChannel {
  private options?: LocalOptions;

  constructor(options?: LocalOptions) {
    this.options = options;
  }

  public initiateLocalChannel(): void {
    console.log('Initializing Local Authentication Channel...');
    const db = new DbEngineManager(this.options);
    db.intiateDB();
  }
}
