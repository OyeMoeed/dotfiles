// actionSheetProps.ts

import { PayChannel } from '@app/utilities/enums.util';

interface IPayQuickActionsProps {
  testID?: string;
  payChannelType?: PayChannel;
  monthlyRemainingOutgoingAmount: string;
  setTopUpAmount?: (text: string) => void;
}
export default IPayQuickActionsProps;
