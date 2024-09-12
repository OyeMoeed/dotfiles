import icons from '@app/assets/icons';
import { IPayIcon, IPayInput, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatCurrencyValue } from '@app/utilities/currency-helper.util';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IPayAmountInputProps } from './ipay-amount-input.interface';
import amountInputStyles from './ipay-amount-input.styles';

const IPayAmountInput: React.FC<IPayAmountInputProps> = ({
  style,
  inputStyles,
  amount,
  carretHidden = true,
  showIcon = false,
  onAmountChange,
  testID,
  currencyStyle,
  defaultValue = '0',
  maxLength = 6,
  isEditable,
  handleBlur,
  handleIconPress,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = amountInputStyles(colors);
  const amountStr = amount ? formatCurrencyValue(amount) : '';

  return (
    <IPayView testID={`${testID}-amount-input`} style={[styles.inputContainer, style]}>
      <IPayInput
        testID="amount-input"
        text={amountStr}
        maxLength={maxLength}
        placeholder={defaultValue}
        placeholderTextColor={colors.natural.natural300}
        style={[styles.textAmount, !amount && styles.darkStyle, inputStyles]} // Combine styles
        onChangeText={onAmountChange}
        keyboardType="numeric"
        editable={isEditable}
        onBlur={handleBlur}
        selectionColor={colors.primary.primary500}
        caretHidden={carretHidden}
      />
      <IPayInput
        text={localizationText.COMMON.SAR}
        editable={false}
        style={[styles.currencyText, !amount && styles.darkStyle, currencyStyle]}
      />

      {showIcon && (
        <TouchableOpacity style={styles.editIconStyle} onPress={handleIconPress}>
          <IPayIcon icon={icons.edit_2} color={colors.primary.primary500} />
        </TouchableOpacity>
      )}
    </IPayView>
  );
};

export default IPayAmountInput;
