import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { States, buttonVariants } from '@app/utilities/enums.util';
import React, { useCallback } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayChip from '../ipay-chip/ipay-chip.component';
import { SadadFooterComponentProps } from './ipay-sadad-footer.interface';
import sadadFooterComponentStyles from './ipay-sadad-footer.style';
import { useTranslation } from 'react-i18next';

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
  totalAmountText,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const checkIfSelectedCount = selectedItemsCount && selectedItemsCount > 0;
  const totalAmountInSAR = `${totalAmount} ${t('COMMON.SAR')}`;

  const getFooterStyles = useCallback(() => {
    if (checkIfSelectedCount) {
      return partialPay ? styles.countAndPartialPayStyles : styles.container;
    }
    return totalAmount ? styles.containerConditionalStyles : styles.footerWithWarning;
  }, [checkIfSelectedCount, totalAmount, warning, partialPay]);

  if (showButtonOnly) {
    return (
      <IPayButton
        large
        disabled={btnDisbaled}
        btnType={buttonVariants.PRIMARY}
        btnText={btnText}
        leftIcon={btnLeftIcon}
        rightIcon={btnRightIcon}
        btnIconsDisabled={disableBtnIcons}
        onPress={onPressBtn}
      />
    );
  }

  return (
    <IPayView testID={`${testID}-sadad-footer`} style={[getFooterStyles(), style]}>
      <IPayLinearGradientView
        style={styles.gradientView}
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
        {totalAmount ? (
          <IPayView style={styles.totalAmountView}>
            <IPayFootnoteText text={totalAmountText || t('LOCAL_TRANSFER.AMOUNT')} color={colors.natural.natural900} />
            <IPaySubHeadlineText regular text={totalAmountInSAR} color={colors.primary.primary800} />
          </IPayView>
        ) : (
          <IPayView />
        )}
        {warning ? (
          <IPayChip
            variant={States.WARNING}
            textValue={warning}
            containerStyle={styles.chipView}
            icon={<IPayIcon icon={icons.sheild_cross} size={16} color={colors.critical.critical800} />}
          />
        ) : (
          <IPayView />
        )}
        <IPayButton
          large
          disabled={btnDisbaled}
          btnType={buttonVariants.PRIMARY}
          btnText={btnText}
          leftIcon={btnLeftIcon}
          rightIcon={btnRightIcon}
          btnIconsDisabled={disableBtnIcons}
          onPress={onPressBtn}
          btnStyle={btnStyle}
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
