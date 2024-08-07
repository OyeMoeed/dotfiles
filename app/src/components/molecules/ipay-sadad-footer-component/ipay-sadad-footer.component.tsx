import icons from '@app/assets/icons';
import {
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, States } from '@app/utilities/enums.util';
import React, { useCallback } from 'react';
import IPayButton from '../ipay-button/ipay-button.component';
import IPayChip from '../ipay-chip/ipay-chip.component';
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
}) => {
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const localizationText = useLocalization();
  const checkIfSelectedCount = selectedItemsCount && selectedItemsCount > 0;
  const totalAmountInSAR = `${totalAmount} ${localizationText.COMMON.SAR}`;

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
        {checkIfSelectedCount && (
          <IPayView style={styles.selectedItemsCountView}>
            <IPayFootnoteText regular={false} text={`${selectedItemsCount}`} />
            <IPayFootnoteText text={localizationText.SADAD.SELECTED_BILLS} />
          </IPayView>
        )}
        {totalAmount && (
          <IPayView style={styles.totalAmountView}>
            <IPayFootnoteText text={localizationText.LOCAL_TRANSFER.TOTAL_AMOUNT} color={colors.natural.natural900} />
            <IPaySubHeadlineText regular text={totalAmountInSAR} color={colors.primary.primary800} />
          </IPayView>
        )}
        {warning && (
          <IPayChip
            variant={States.WARNING}
            textValue={warning}
            containerStyle={styles.chipView}
            icon={<IPayIcon icon={icons.sheild_cross} size={16} color={colors.critical.critical800} />}
          />
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
        {partialPay && (
          <IPayButton
            large
            btnType={buttonVariants.LINK_BUTTON}
            btnText={localizationText.SADAD.PAY_PARTIALLY}
            btnIconsDisabled
            onPress={onPressPartialPay}
          />
        )}
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default SadadFooterComponent;
