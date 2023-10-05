import { Config } from './types';

class NodeAuthWarden {
  private msg: string;

  private count: number;

  constructor({ msg, count }: Config) {
    this.msg = msg;
    this.count = count;
  }

  public logMsg(): void {
    for (let i = 0; i < this.count; i++) {
      console.log(this.msg, i + 1);
    }
  }
}

export default NodeAuthWarden;
