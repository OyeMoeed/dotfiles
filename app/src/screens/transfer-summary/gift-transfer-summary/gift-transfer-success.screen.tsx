import IPayGiftTransferSuccess from '@app/components/organism/ipay-gift-transfer-sucess/ipay-gift-transfer-success.component';
import { IW2WTransferSuccessProps } from '@app/components/organism/ipay-w2w-transfer-successful/ipay-w2w-transfer-successful.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { useRoute } from '@react-navigation/native';

const GiftTransferSuccessScreen = () => {
  const route = useRoute();
  const { transferDetails, totalAmount } = route.params as IW2WTransferSuccessProps;

  return (
    <IPaySafeAreaView>
      <IPayGiftTransferSuccess transferDetails={transferDetails} totalAmount={totalAmount} />
    </IPaySafeAreaView>
  );
};

export default GiftTransferSuccessScreen;
