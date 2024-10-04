import { IPayFootnoteText, IPayLinearGradientView, IPayView } from '@app/components/atoms';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useState } from 'react';
import IPayBalanceStatusChip from '../ipay-balance-status-chip/ipay-balance-status-chip.component';
import IPayButton from '../ipay-button/ipay-button.component';
import { SadadFooterComponentProps } from './ipay-sadad-footer.interface';
import sadadFooterComponentStyles from './ipay-sadad-footer.style';

const SadadFooterComponent: React.FC<SadadFooterComponentProps> = ({
  testID,
  style,
  totalAmount,
  selectedItemsCount,
  btnText,
  btnDisbaled,
  btnLeftIcon,
  btnRightIcon,
  disableBtnIcons,
  backgroundGradient,
  onPressBtn,
  btnStyle,
  warning,
  partialPay,
  onPressPartialPay,
  showButtonOnly,
  textColor,
  gradientViewStyle,
  shouldTranslateBtnText,
}) => {
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const checkIfSelectedCount = selectedItemsCount && selectedItemsCount > 0;
  const {
    availableBalance,
    limitsDetails: { monthlyRemainingOutgoingAmount, dailyOutgoingLimit },
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const [warningStatus, setWarningStatus] = useState<string>('');

  const getFooterStyles = useCallback(() => {
    if (checkIfSelectedCount) {
      return partialPay ? styles.countAndPartialPayStyles : styles.container;
    }
    return totalAmount ? styles.containerConditionalStyles : styles.footerWithWarning;
  }, [checkIfSelectedCount, totalAmount, warning, warningStatus, partialPay]);

  if (showButtonOnly) {
    return (
      <IPayButton
        large
        disabled={!!warningStatus || btnDisbaled}
        btnType={buttonVariants.PRIMARY}
        btnText={btnText}
        leftIcon={btnLeftIcon}
        rightIcon={btnRightIcon}
        btnIconsDisabled={disableBtnIcons}
        onPress={onPressBtn}
        shouldTranslateBtnText={shouldTranslateBtnText}
      />
    );
  }

  return (
    <IPayView testID={`${testID}-sadad-footer`} style={[getFooterStyles(), style]}>
      <IPayLinearGradientView
        style={[styles.gradientView, gradientViewStyle]}
        gradientColors={backgroundGradient || colors.appGradient.gradientPrimary10}
      >
        {checkIfSelectedCount ? (
          <IPayView style={styles.selectedItemsCountView}>
            <IPayFootnoteText regular={false} text={`${selectedItemsCount}`} />
            <IPayFootnoteText color={textColor} text="SADAD.SELECTED_BILLS" />
          </IPayView>
        ) : (
          <IPayView />
        )}
        <IPayView style={styles.chipView}>
          <IPayBalanceStatusChip
            monthlySpendingLimit={Number(monthlyRemainingOutgoingAmount)}
            currentBalance={Number(availableBalance)}
            amount={Number(totalAmount)}
            setWarningStatus={setWarningStatus}
            dailySpendingLimit={Number(dailyOutgoingLimit)}
          />
        </IPayView>
        <IPayButton
          large
          disabled={!!warningStatus || btnDisbaled}
          btnType={buttonVariants.PRIMARY}
          btnText={btnText}
          leftIcon={btnLeftIcon}
          rightIcon={btnRightIcon}
          btnIconsDisabled={disableBtnIcons}
          onPress={onPressBtn}
          btnStyle={btnStyle}
          shouldTranslateBtnText={shouldTranslateBtnText}
        />
        {partialPay ? (
          <IPayButton
            large
            btnType={buttonVariants.LINK_BUTTON}
            btnText="SADAD.PAY_PARTIALLY"
            btnIconsDisabled
            onPress={onPressPartialPay}
          />
        ) : (
          <IPayView />
        )}
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default SadadFooterComponent;
