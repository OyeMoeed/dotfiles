import { PayChannel } from '@app/utilities/enums.util';

export interface IPayAmountHeaderProps {
  testID?: string;
  channel?: PayChannel;
  title?: string;
}
