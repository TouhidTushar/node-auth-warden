import { DBEngineManager } from 'db-engines';
import { LocalOptions } from 'types';

export class LocalChannel {
  private options?: LocalOptions;

  constructor(options?: LocalOptions) {
    this.options = options;
  }

  initiateLocalChannel() {
    console.log('Initializing Local Authentication Channel...');
    const db = new DBEngineManager(this.options?.dbEngine);
    db.intiateDB();
  }
}
