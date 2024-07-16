import IPayTopupSuccess from '@app/components/organism/ipay-topuup-successful/ipay-topup-successful.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { payChannel, TopupStatus } from '@app/utilities/enums.util';

const TransferSuccess = () => {
  return (
    <IPaySafeAreaView>
      <IPayTopupSuccess completionStatus={TopupStatus.SUCCESS} topupChannel={payChannel.WALLET} />
    </IPaySafeAreaView>
  );
};
export default TransferSuccess;
