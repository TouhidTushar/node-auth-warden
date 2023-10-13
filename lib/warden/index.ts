import { AuthChannelManager } from 'channels';
import { WardenConfig } from '../types';

export class NodeAuthWarden {
  private config?: WardenConfig;

  constructor(config?: WardenConfig) {
    this.config = config;
  }

  public initialize(): void {
    console.log('Initializing NodeAuthWarden...');

    const channels = new AuthChannelManager({
      channels: this.config?.channels,
      localOptions: this.config?.localOptions,
    });

    channels.initiateChannels();
  }
}
