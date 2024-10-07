import React from 'react';

import icons from '@app/assets/icons';
import { IPayIcon, IPaySpinner, IPayView } from '@app/components/atoms';
import { IPayButton, IPayNoResult } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import billPaymentsComponentsStyles from './ipay-bill-payment-components.style';
import { IPayBillPaymentNoResultsComponentProps } from './ipay-bills-payment-components.interface';
import IPaySadadBillsHeader from './ipay-sadad-bills-header.component';

const IPayBillPaymentNoResultsComponent: React.FC<IPayBillPaymentNoResultsComponentProps> = ({
  testID,
  style,
  onPressViewAll,
  loadingBills,
}) => {
  const { colors } = useTheme();
  const styles = billPaymentsComponentsStyles(colors);

  return (
    <IPayView testID={`${testID}-no-results`} style={[styles.noResultsView, style]}>
      <IPaySadadBillsHeader onPressViewAll={onPressViewAll} style={styles.headerStyles} />

      <IPayView style={styles.noResultsChildView}>
        {!loadingBills ? (
          <>
            <IPayNoResult
              showIcon
              icon={icons.note_remove}
              iconColor={colors.primary.primary800}
              iconSize={40}
              iconViewStyles={styles.noResultIconView}
              message="SADAD.NO_ACTIVE_BILLS"
            />
            <IPayButton
              medium
              onPress={onPressViewAll}
              btnType={buttonVariants.PRIMARY}
              btnText="SADAD.ADD_NEW_BILL"
              btnStyle={styles.addNewBillBtn}
              leftIcon={<IPayIcon icon={icons.add_square} size={18} color={colors.natural.natural0} />}
            />
          </>
        ) : (
          <IPaySpinner />
        )}
      </IPayView>
    </IPayView>
  );
};

export default IPayBillPaymentNoResultsComponent;
