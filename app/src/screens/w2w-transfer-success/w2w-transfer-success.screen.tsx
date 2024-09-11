import { IPayPressable } from '@app/components/atoms';
import IPayW2WTransferSuccess from '@app/components/organism/ipay-w2w-transfer-successful/ipay-w2w-transfer-successful.component';
import { IW2WTransferSuccessProps } from '@app/components/organism/ipay-w2w-transfer-successful/ipay-w2w-transfer-successful.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import { useRoute } from '@react-navigation/native';

const W2WTransferSuccessScreen = () => {
  const route = useRoute();
  const { transferDetails, totalAmount, variant } = route.params as IW2WTransferSuccessProps;

  return (
    <IPaySafeAreaView>
      <IPayW2WTransferSuccess variant={variant} transferDetails={transferDetails} totalAmount={totalAmount} />
    </IPaySafeAreaView>
  );
};

export default W2WTransferSuccessScreen;
