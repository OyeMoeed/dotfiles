import icons from '@app/assets/icons';
import { IPayIcon, IPayInput, IPayLargeTitleText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatCurrencyValue } from '@app/utilities/currency-helper.util';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { IPayAmountInputProps } from './ipay-amount-input.interface';
import amountInputStyles from './ipay-amount-input.styles';
const IPayAmountInput: React.FC<IPayAmountInputProps> = ({
  amount,
  showIcon = false,
  onAmountChange,
  testID,
  defaultValue = '0',
  maxLength = 6,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = amountInputStyles(colors);

  const amountStr = amount ? formatCurrencyValue(amount) : '';

  // State to manage the editability of the input
  const [isEditable, setIsEditable] = useState(true); // Start as not editable

  // Handle icon press to focus on the input and make it editable
  const handleIconPress = () => {
    setIsEditable(!isEditable); // Set the input to be editable
    // Focus the input to open the keyboard
  };

  const handleBlur = () => {
    setIsEditable(false); // Disable edit mode when the input loses focus
  };

  return (
    <IPayView testID={`${testID}-amount-input`} style={styles.inputContainer}>
      <IPayInput
        testID="amount-input"
        text={amountStr}
        maxLength={maxLength}
        placeholder={defaultValue}
        placeholderTextColor={colors.natural.natural300}
        style={[styles.textAmount, !amount && styles.darkStyle]} // Combine styles
        onChangeText={onAmountChange}
        keyboardType="numeric"
        editable={isEditable && disabled} // Make the input editable based on the state
        onBlur={handleBlur} // Set the blur event to disable edit mode
        selectionColor={isEditable ? colors.primary.primary500 : 'transparent'}
        caretHidden={!isEditable} // Hide the caret if not editable
      />
      <IPayLargeTitleText style={[styles.currencyText, !amount && styles.darkStyle]}>
        {localizationText.COMMON.SAR}
      </IPayLargeTitleText>
      {showIcon && (
        <TouchableOpacity onPress={handleIconPress}>
          <IPayIcon icon={icons.edit_2} color={colors.primary.primary500} />
        </TouchableOpacity>
      )}
    </IPayView>
  );
};

export default IPayAmountInput;
