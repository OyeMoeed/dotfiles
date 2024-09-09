// actionSheetProps.ts

import { PayChannel } from '@app/utilities/enums.util';

interface IPayQuickActionsProps {
  testID?: string;
  PayChannelType?: PayChannel;
  monthlyRemainingOutgoingAmount: string;
  setTopUpAmount?: (text: string) => void;
}
export default IPayQuickActionsProps;
