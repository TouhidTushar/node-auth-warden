import { Channel } from 'consts';
import { LocalChannel } from './local';
import converter from 'utils/converter';
import { ChannelManagerOptions } from 'types';

export class ChannelManager {
  private options: ChannelManagerOptions;

  constructor(options: ChannelManagerOptions) {
    this.options = options;
  }

  public initiateChannels(): void {
    this.options.channels.forEach((channel) => {
      switch (channel) {
        case Channel.LOCAL_CHANNEL:
          const local = new LocalChannel(this.options?.localOptions);
          local.initiateLocalChannel();
          break;
        default:
          throw new Error(
            `Invalid authentication channel: ${channel}. Valid channels are ${converter.enumToString(
              Channel,
            )}`,
          );
      }
    });
  }
}
