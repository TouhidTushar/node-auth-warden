import { WardenConfig } from '../types';
import { ChannelManager } from 'channels';

export class NodeAuthWarden {
  private config: WardenConfig;

  constructor(config: WardenConfig) {
    this.config = config;
  }

  public initialize(): void {
    console.log('Initializing NodeAuthWarden...');
    const channels = new ChannelManager(this.config);
    channels.initiateChannels();
  }
}
