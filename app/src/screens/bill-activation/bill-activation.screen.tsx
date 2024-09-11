import icons from '@app/assets/icons';
import { IPayIcon, IPayScrollView, IPayView } from '@app/components/atoms';
import { IPayButton, IPaySuccess } from '@app/components/molecules';
import IPayBillDetailsOption from '@app/components/molecules/ipay-bill-details-option/ipay-bill-details-option.component';
import { IPayPageWrapper } from '@app/components/templates';
import { ACTIVE_SADAD_BILLS } from '@app/constants/constants';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import ipayBillActivationStyles from './bill-activation.style';

const BillActivationScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = ipayBillActivationStyles(colors);
  const localizationText = useLocalization();
  const { activeBillDetails, billHeaderDetail } = useConstantData();

  const onPressPayBill = () => {
    navigate(ScreenNames.ADD_NEW_SADAD_BILLS, {
      selectedBills: [ACTIVE_SADAD_BILLS[0]],
    });
  };

  return (
    <IPayPageWrapper>
      <IPayView style={styles.childContainer}>
        <IPaySuccess
          style={styles.minFlex}
          headingText={'BILL_ACTIVATION.ACTIVATION_MESSAGE'}
          headingStyle={styles.headingStyle}
        />
        <IPayScrollView showsVerticalScrollIndicator={false}>
          <IPayView style={styles.conatinerStyles}>
            <IPayBillDetailsOption
              headerData={billHeaderDetail}
              data={activeBillDetails}
              style={styles.billContainer}
              optionsStyles={styles.optionsStyle}
            />
          </IPayView>
        </IPayScrollView>
        <IPayView style={styles.footerView}>
          <IPayButton
            medium
            btnType={buttonVariants.PRIMARY}
            btnText={'BILL_ACTIVATION.PAY_BILL'}
            btnStyle={styles.btnStyle}
            btnIconsDisabled
            onPress={onPressPayBill}
          />
          <IPayButton
            onPress={() => navigate(ScreenNames.HOME)}
            large
            btnType={buttonVariants.LINK_BUTTON}
            leftIcon={<IPayIcon icon={icons.HOME} color={colors.primary.primary500} />}
            btnText={'COMMON.HOME'}
          />
        </IPayView>
      </IPayView>
    </IPayPageWrapper>
  );
};

export default BillActivationScreen;
