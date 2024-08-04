import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayHeader, SadadFooterComponent } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback, useEffect, useState } from 'react';
import useMoiPaymentConfirmation from '../moi-payment-confirmation-screen/moi-payment-confirmation-details.hook';
import { MOIItemProps } from './moi-payment-refund.interface';
import moiPaymentRefundStyles from './moi-payment-refund.style';

const MoiPaymentRefund: React.FC = () => {
  const { colors } = useTheme();
  const styles = moiPaymentRefundStyles();
  const localizationText = useLocalization();
  const { moiPaymentDetailes } = useMoiPaymentConfirmation();
  const [refundPaymentDetails, setRefundPaymentDetails] = useState<MOIItemProps[]>([]);

  // Temporary TODO
  const totalAmount = '500';

  const getDataToRender = useCallback(() => {
    // Remove the item with id '1'
    const updatedPaymentDetails = moiPaymentDetailes.filter((item) => item.id !== '1');

    // Update the ids accordingly
    const updatedPaymentDetailsWithNewIds = updatedPaymentDetails.map((item, index) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    setRefundPaymentDetails(updatedPaymentDetailsWithNewIds);
  }, [moiPaymentDetailes]);

  useEffect(() => {
    getDataToRender();
  }, []);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn applyFlex title={localizationText.BILL_PAYMENTS.REFUND_BILLS} />
      <IPayView style={styles.container}>
        <IPayBillDetailsOption
          data={refundPaymentDetails}
          showHeader={false}
          optionsStyles={styles.moiPaymentDetailesTab}
        />
      </IPayView>
      <IPayView style={styles.footerView}>
        <SadadFooterComponent
          btnText={localizationText.SADAD.COMPLETE_PAYMENT}
          totalAmount={totalAmount}
          btnRightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MoiPaymentRefund;
