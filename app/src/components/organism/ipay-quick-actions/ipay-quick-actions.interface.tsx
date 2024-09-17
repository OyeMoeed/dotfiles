// actionSheetProps.ts

import { PayChannel } from '@app/utilities/enums.util';

interface IPayQuickActionsProps {
  testID?: string;
  payChannelType?: PayChannel;
  monthlyRemainingOutgoingAmount: string;
  setTopUpAmount?: (text: string) => void;
  onSelectCard?: (selectedCardId: string) => void;
  channel?: string;
}
export default IPayQuickActionsProps;
