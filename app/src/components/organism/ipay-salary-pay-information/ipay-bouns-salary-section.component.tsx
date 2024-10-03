import { StyleSheet } from 'react-native';

import { IPayFootnoteText, IPayView } from '@app/components/atoms';
import { IPayAmountInput, IPayAnimatedTextInput } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { isArabic } from '@app/utilities/constants';
import { validateAmountInput } from '@app/utilities';

import salaryPayInformation from './ipay-salary-pay-information.style';
import { IPayBonesSalarySectionProps } from './ipay-salary-pay-information.interface';

const IPayBonesSalarySection = ({
  setBonusAmount,
  defaultValue,
  bonusAmount,
  amount,
  inputFieldStyle,
  bonusAmountNote,
  setBonusAmountNote,
}: IPayBonesSalarySectionProps) => {
  const { colors } = useTheme();
  const styles = salaryPayInformation(colors);

  return (
    <IPayView>
      <IPayView style={styles.deductAmountInput}>
        <IPayFootnoteText
          regular
          style={styles.text}
          text="MUSANED.ENTER_BONUS_AMOUNT"
          color={colors.natural.natural700}
        />
        <IPayAmountInput
          carretHidden={false}
          style={styles.amountInput}
          inputStyles={styles.inputText}
          currencyStyle={[styles.currencyStyle]}
          defaultValue={defaultValue}
          amount={bonusAmount}
          onAmountChange={(value) => setBonusAmount(validateAmountInput(value, amount))}
          isEditable
        />
      </IPayView>
      <IPayAnimatedTextInput
        withExtraPadding={false}
        containerStyle={[StyleSheet.flatten(styles.inputField), inputFieldStyle]}
        labelColor={colors.natural.natural500}
        label="MUSANED.NOTE"
        value={bonusAmountNote}
        onChange={(value) => setBonusAmountNote(String(value))}
        textAlign={isArabic ? 'right' : 'left'}
      />
    </IPayView>
  );
};

export default IPayBonesSalarySection;
