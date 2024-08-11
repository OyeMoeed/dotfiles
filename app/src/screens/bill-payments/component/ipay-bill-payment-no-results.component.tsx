import React from 'react';

import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayButton, IPayNoResult } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import billPaymentsComponentsStyles from './ipay-bill-payment-components.style';
import { IPayBillPaymentNoResultsComponentProps } from './ipay-bills-payment-components.interface';
import IPaySadadBillsHeader from './ipay-sadad-bills-header.component';

const IPayBillPaymentNoResultsComponent: React.FC<IPayBillPaymentNoResultsComponentProps> = ({
  testID,
  style,
  onPressViewAll,
}) => {
  const { colors } = useTheme();
  const styles = billPaymentsComponentsStyles(colors);
  const localizationText = useLocalization();

  return (
    <IPayView testID={`${testID}-no-results`} style={[styles.noResultsView, style]}>
      <IPaySadadBillsHeader onPressViewAll={onPressViewAll} style={styles.headerStyles} />
      <IPayView style={styles.noResultsChildView}>
        <IPayNoResult
          showIcon
          icon={icons.note_remove}
          iconColor={colors.primary.primary800}
          iconSize={40}
          iconViewStyles={styles.noResultIconView}
          message={localizationText.SADAD.NO_ACTIVE_BILLS}
        />
        <IPayButton
          medium
          onPress={onPressViewAll}
          btnType={buttonVariants.PRIMARY}
          btnText={localizationText.SADAD.ADD_NEW_BILL}
          btnStyle={styles.addNewBillBtn}
          leftIcon={<IPayIcon icon={icons.add_square} size={18} color={colors.natural.natural0} />}
        />
      </IPayView>
    </IPayView>
  );
};

export default IPayBillPaymentNoResultsComponent;