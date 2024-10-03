import {
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  btnDisabled,
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
  totalAmountText,
  gradientViewStyle,
  shouldTranslateBtnText,
  amount,
  showTopMessage,
  totalAmountStyle,
  totalAmountLeftIcon,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const checkIfSelectedCount = selectedItemsCount && selectedItemsCount > 0;
  const totalAmountInSAR = `${totalAmount} ${t('COMMON.SAR')}`;
  const {
    availableBalance,
    limitsDetails: { monthlyRemainingOutgoingAmount, dailyOutgoingLimit },
  } = useTypedSelector((state) => state.walletInfoReducer.walletInfo);

  const getFooterStyles = useCallback(() => {
    if (checkIfSelectedCount) {
      return partialPay ? styles.countAndPartialPayStyles : styles.container;
    }
    return totalAmount || showTopMessage ? styles.containerConditionalStyles : styles.footerWithWarning;
  }, [checkIfSelectedCount, totalAmount, warning, warningMessage, partialPay]);

  if (showButtonOnly) {
    return (
      <IPayButton
        large
        disabled={!!warningMessage || btnDisabled}
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
        {totalAmount || showTopMessage ? (
          <IPayView style={[styles.totalAmountView, totalAmountStyle]}>
            {totalAmountLeftIcon?.icon ? (
              <IPayView style={styles.iconAmountContainer}>
                <IPayIcon color={totalAmountLeftIcon?.color} icon={totalAmountLeftIcon?.icon} />
              </IPayView>
            ) : (
              <IPayView />
            )}
            <IPayFootnoteText text={totalAmountText || 'LOCAL_TRANSFER.AMOUNT'} color={colors.natural.natural900} />
            <IPaySubHeadlineText
              regular
              text={totalAmount ? totalAmountInSAR : ''}
              color={colors.primary.primary800}
              shouldTranslate={false}
            />
          </IPayView>
        ) : (
          <IPayView />
        )}
        <IPayView style={warningMessage ? styles.chipView : {}}>
          <IPayBalanceStatusChip
            amount={Number(amount || totalAmount)}
            monthlySpendingLimit={Number(monthlyRemainingOutgoingAmount)}
            currentBalance={Number(availableBalance)}
            setWarningStatus={setWarningMessage}
            dailySpendingLimit={Number(dailyOutgoingLimit)}
          />
        </IPayView>
        <IPayButton
          large
          disabled={!!warningMessage || btnDisabled}
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
