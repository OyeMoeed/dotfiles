import { IPayFootnoteText, IPayLinearGradientView, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
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
  onPressBtn,
}) => {
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const localizationText = useLocalization();
  const checkIfSelectedCount = selectedItemsCount && selectedItemsCount > 0;
  const totalAmountInSAR = `${totalAmount} ${localizationText.COMMON.SAR}`;
  return (
    <IPayView
      testID={`${testID}-sadad-footer`}
      style={checkIfSelectedCount ? styles.container : styles.containerConditionalStyles}
    >
      <IPayLinearGradientView
        style={[styles.gradientView, style]}
        gradientColors={colors.appGradient.gradientPrimary10}
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
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default SadadFooterComponent;
