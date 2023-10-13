import { ALL_CHANNELS, ALL_DB_ENGINES } from '../consts';

export type DBEngine = (typeof ALL_DB_ENGINES)[number];

export type AuthChannel = (typeof ALL_CHANNELS)[number];

export interface LocalOptions {
  dbEngine?: DBEngine;
}

export interface WardenConfig {
  channels?: AuthChannel[] | AuthChannel | string;
  localOptions?: LocalOptions;
}

export interface AuthChannelManagerOptions {
  channels?: AuthChannel[] | AuthChannel | string;
  localOptions?: LocalOptions;
}
