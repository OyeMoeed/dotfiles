import { StyleSheet } from 'react-native';

import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayChip, IPayList } from '@app/components/molecules';
import { isArabic } from '@app/utilities/constants';
import { States, validateAmountInput } from '@app/utilities';
import icons from '@app/assets/icons';

import { DeductExtraComponentProps } from './ipay-salary-pay-information.interface';

const deductExtraComponent = ({
  deductFlag,
  defaultValue,
  deductionAmount,
  setDeductionAmount,
  amount,
  chipValue,
  comingMonthsNow,
  onPressDeductionShow,
  backgroundStyle,
  inputFieldStyle,
  textStyle,
  selectedDeductionReason,
  styles,
  colors,
  t,
}: DeductExtraComponentProps) =>
  deductFlag ? (
    <IPayView style={styles.deductInputContainer}>
      <IPayView style={styles.deductAmountInput}>
        <IPayFootnoteText
          regular
          style={styles.text}
          text="MUSANED.ENTER_DEDUCTION_AMOUNT"
          color={colors.natural.natural700}
        />
        <IPayAmountInput
          carretHidden={false}
          style={styles.amountInput}
          inputStyles={styles.inputText}
          currencyStyle={[styles.currencyStyle]}
          defaultValue={defaultValue}
          amount={deductionAmount}
          onAmountChange={(value) => setDeductionAmount(validateAmountInput(value, amount))}
          isEditable
        />
      </IPayView>

      {chipValue ? (
        <IPayChip
          textValue={chipValue ? 'MUSANED.DEDUCTION_AMOUNT_NOTE' : ''}
          variant={chipValue ? States.WARNING : States.NATURAL}
          isShowIcon={chipValue}
          fullWidth
          containerStyle={styles.deductChipContainer}
          icon={<IPayIcon icon={icons.shield_cross} color={colors.critical.critical800} size={16} />}
        />
      ) : (
        <IPayList
          title="MUSANED.PAID_SALARY"
          isShowIcon
          isShowDetail
          textStyle={{
            ...styles.titleStyle,
            ...textStyle,
          }}
          containerStyle={backgroundStyle}
          detailTextStyle={styles.listTextStyle}
          detailText={`${Number(amount) * comingMonthsNow - Number(deductionAmount)} ${t('COMMON.SAR')}`}
          detailIconDisabled
          shouldTranslateSubTitle={false}
        />
      )}

      <IPayPressable onPress={onPressDeductionShow} style={styles.reasonsView}>
        <IPayAnimatedTextInput
          withExtraPadding={false}
          pointerEvents="none"
          containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
          labelColor={colors.natural.natural500}
          label="MUSANED.DEDUCTION_REASON"
          value={t(selectedDeductionReason?.text || '')}
          textAlign={isArabic ? 'right' : 'left'}
          editable={false}
          showRightIcon
          customIcon={
            <IPayPressable onPress={onPressDeductionShow}>
              <IPayIcon icon={icons.arrow_circle_down} size={20} color={colors.primary.primary500} />
            </IPayPressable>
          }
        />
      </IPayPressable>
    </IPayView>
  ) : null;

export default deductExtraComponent;
