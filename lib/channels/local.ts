import { LocalOptions } from 'types';
import { DbEngineManager } from 'db-engines';

export class LocalChannel {
  private options?: LocalOptions;

  constructor(options?: LocalOptions) {
    this.options = options;
  }

  initiateLocalChannel() {
    console.log('Initializing Local Authentication Channel...');
    const db = new DbEngineManager(this.options);
    db.intiateDB();
  }
}
