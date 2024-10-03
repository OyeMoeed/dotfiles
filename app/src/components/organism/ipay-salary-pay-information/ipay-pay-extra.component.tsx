import { StyleSheet } from 'react-native';

import { IPayFootnoteText, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput, IPayList } from '@app/components/molecules';
import { isArabic } from '@app/utilities/constants';
import { validateAmountInput } from '@app/utilities';

import { PayExtraComponentProps } from './ipay-salary-pay-information.interface';

const payExtraComponent = ({
  payExtraFlag,
  defaultValue,
  payExtraAmount,
  setPayExtraAmount,
  textStyle,
  backgroundStyle,
  amount,
  inputFieldStyle,
  payExtraNote,
  setPayExtraNote,
  t,
  colors,
  styles,
}: PayExtraComponentProps) =>
  payExtraFlag ? (
    <IPayView style={styles.deductInputContainer}>
      <IPayView style={styles.deductAmountInput}>
        <IPayFootnoteText regular style={styles.text} text="MUSANED.EXTRA_AMOUNT" color={colors.natural.natural700} />
        <IPayAmountInput
          carretHidden={false}
          style={styles.amountInput}
          inputStyles={styles.inputText}
          currencyStyle={[styles.currencyStyle]}
          defaultValue={defaultValue}
          amount={payExtraAmount}
          onAmountChange={(value) => setPayExtraAmount(validateAmountInput(value, amount))}
          isEditable
        />
      </IPayView>

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
        detailText={`${Number(amount) + Number(payExtraAmount)} ${t('COMMON.SAR')}`}
        detailIconDisabled
        shouldTranslateSubTitle={false}
      />
      <IPayAnimatedTextInput
        withExtraPadding={false}
        containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
        labelColor={colors.natural.natural500}
        label="MUSANED.NOTE"
        value={payExtraNote}
        onChangeText={(text) => setPayExtraNote(text)}
        textAlign={isArabic ? 'right' : 'left'}
      />
    </IPayView>
  ) : null;

export default payExtraComponent;
