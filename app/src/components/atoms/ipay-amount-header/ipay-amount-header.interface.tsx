import { payChannel } from '@app/utilities/enums.util';

export interface IPayAmountHeaderProps {
  channel?: payChannel;
  title?: string;
}
