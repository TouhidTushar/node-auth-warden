import { Channel, DbEngine } from '../consts';

export interface WardenConfig {
  channels: Channel[];
  localOptions?: LocalOptions;
}

export interface ChannelManagerOptions {
  channels: Channel[];
  localOptions?: LocalOptions;
}

export interface LocalOptions {
  dbEngine?: DbEngine;
  dbPath?: string;
}
