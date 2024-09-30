import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayPageWrapper } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { InquireBillPayloadProps } from '@app/network/services/bills-management/inquire-bill/inquire-bill.interface';
import inquireBillService from '@app/network/services/bills-management/inquire-bill/inquire-bill.service';
import { BillPaymentInfosTypes } from '@app/network/services/bills-management/multi-payment-bill/multi-payment-bill.interface';
import { getDeviceInfo } from '@app/network/utilities';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { BillActivateSuccessProps } from './bill-activation.interface';
import ipayBillActivationStyles from './bill-activation.style';

const BillActivationScreen: React.FC<BillActivateSuccessProps> = ({ route }) => {
  const { headerAttributes, billPaymentInfos, billPaymentData } = route.params;

  const { colors } = useTheme();
  const styles = ipayBillActivationStyles(colors);

  const onPressPayBill = async () => {
    const { billerId, billNumOrBillingAcct, serviceType }: BillPaymentInfosTypes = billPaymentInfos;
    const deviceInfo = await getDeviceInfo();
    const payload: InquireBillPayloadProps = {
      billerId,
      billAccountNumber: billNumOrBillingAcct,
      serviceId: serviceType,
      deviceInfo,
    };
    const apiResponse = await inquireBillService(payload);
    if (apiResponse.successfulResponse) {
      navigate(ScreenNames.NEW_SADAD_BILL, {
        ...billPaymentInfos,
        dueDate: apiResponse?.response?.dueDate,
        totalAmount: apiResponse?.response?.dueAmount,
      });
    }
  };

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText="BILL_ACTIVATION.ACTIVATION_MESSAGE"
          headingStyle={styles.headingStyle}
        />
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView style={styles.conatinerStyles}>
            <IPayBillDetailsOption
              headerData={headerAttributes}
              data={billPaymentData}
              style={styles.billContainer}
              optionsStyles={styles.optionsStyle}
            />
          </IPayView>
        </IPayScrollView>
        <IPayView style={styles.footerView}>
          <IPayButton
            medium
            btnType={buttonVariants.PRIMARY}
            btnText="BILL_ACTIVATION.PAY_BILL"
            btnStyle={styles.btnStyle}
            btnIconsDisabled
            onPress={onPressPayBill}
          />
          <IPayButton
            onPress={() => navigate(ScreenNames.HOME)}
            large
            btnType={buttonVariants.LINK_BUTTON}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.primary.primary500} />}
            btnText="COMMON.HOME"
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default BillActivationScreen;
