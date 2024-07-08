// actionSheetProps.ts

import { payChannel } from '@app/utilities/enums.util';

interface IPayQuickActionsProps {
  testID?: string;
  payChannelType?: payChannel;
  monthlyRemainingOutgoingAmount: string;
  setTopUpAmount?: (text: string) => void;
}
export { IPayQuickActionsProps };
