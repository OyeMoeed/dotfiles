import icons from '@app/assets/icons';
import { IPayIcon, IPayInput, IPayLargeTitleText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useRef, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { IPayAmountInputProps } from './ipay-amount-input.interface';
import amountInputStyles from './ipay-amount-input.styles';

const IPayAmountInput: React.FC<IPayAmountInputProps> = ({
  amount,
  showIcon = false,
  onAmountChange,
  testID,
  style,
  currencyStyle,
  defaultValue,
  maxLength,
  iconStyle
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = amountInputStyles(colors);

  // Ref for the input field
  const inputRef = useRef<TextInput>(null);

  // State to manage the editability of the input
  const [isEditable, setIsEditable] = useState(true); // Start as not editable

  // Function to format the amount with commas
  const formatAmount = (value: string): string => {
    return parseFloat(value.replace(/,/g, '')).toLocaleString('en-US');
  };

  // Ensure amount is treated as a string
  const amountStr = amount ? formatAmount(amount) : '';

  // Handle icon press to focus on the input and make it editable
  const handleIconPress = () => {
    setIsEditable(true); // Set the input to be editable
    // Focus the input to open the keyboard
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Handle blur event to disable edit mode when input loses focus
  const handleBlur = () => {
    setIsEditable(false); // Disable edit mode when the input loses focus
  };

  return (
    <IPayView testID={`${testID}-amount-input`} style={styles.inputContainer}>
      <IPayInput
        testID="amount-input"
        ref={inputRef}
        text={amountStr}
        maxLength={maxLength}
        placeholder={defaultValue}
        placeholderTextColor={colors.natural.natural300}
        style={[styles.textAmount, style]} // Combine styles
        onChangeText={onAmountChange}
        keyboardType="numeric"
        editable={isEditable} // Make the input editable based on the state
        onBlur={handleBlur} // Set the blur event to disable edit mode
        // Show the cursor when the input is editable
        selectionColor={isEditable ? colors.primary.primary500 : 'transparent'}
        caretHidden={!isEditable} // Hide the caret if not editable
      />
      <IPayLargeTitleText style={[styles.currencyText, currencyStyle]}>{localizationText.SAR}</IPayLargeTitleText>
      {showIcon && (
        <TouchableOpacity onPress={handleIconPress} style={iconStyle}>
          <IPayIcon icon={icons.edit_2} color={colors.primary.primary500} />
        </TouchableOpacity>
      )
      }
    </IPayView >
  );
};

export default IPayAmountInput;

