import { payChannel } from '@app/utilities/enums.util';

export interface IPayAmountHeaderProps {
  testID?: string;
  channel?: payChannel;
  title?: string;
}
