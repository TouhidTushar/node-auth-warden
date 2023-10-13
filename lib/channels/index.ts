import { AuthChannel, AuthChannelManagerOptions } from 'types';
import { ALL_CHANNELS } from 'consts';
import { LocalChannel } from './local';

export class AuthChannelManager {
  private options?: AuthChannelManagerOptions;

  private activeChannels: AuthChannel[] = ['local'];

  constructor(options?: AuthChannelManagerOptions) {
    const channels = options?.channels;

    if (typeof channels === 'string') {
      const values = channels.split(',')?.map((value) => value.trim());
      const validValues: AuthChannel[] = ALL_CHANNELS;
      values?.forEach((value) => {
        if (!validValues.includes(value as AuthChannel)) {
          throw new Error(
            `Invalid authentication channel: ${value}. Valid channels are: ${validValues.join(
              ', ',
            )}`,
          );
        }
      });
      this.activeChannels = values;
    } else if (Array.isArray(channels)) {
      this.activeChannels = channels;
    }

    this.options = options;
  }

  public initiateChannels(): void {
    this.activeChannels?.forEach((channel) => {
      switch (channel) {
        default:
          const local = new LocalChannel(this.options?.localOptions);
          local.initiateLocalChannel();
          break;
      }
    });
  }
}
