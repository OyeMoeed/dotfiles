import icons from '@app/assets/icons';
import { IPayIcon, IPayInput, IPayLargeTitleText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { IPayAmountInputProps } from './ipay-amount-input.interface';
import amountInputStyles from './ipay-amount-input.styles';

const IPayAmountInput: React.FC<IPayAmountInputProps> = ({
  amount,
  editable = false, // Set editable to false by default
  onAmountChange,
  testID,
  style,
  currencyStyle,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = amountInputStyles(colors);

  // Ref for the input field
  const inputRef = useRef<TextInput>(null);

  // Ensure amount is treated as a string
  const amountStr = amount ? formatAmount(amount) : '';

  // Function to format amount with commas
  const formatAmount = (value: string): string => {
    // Convert to number and then to locale string with commas
    return parseFloat(value.replace(/,/g, '')).toLocaleString('en-US');
  };

  // Handle icon press to focus on the input
  const handleIconPress = () => {
    inputRef.current?.focus(); // Focus the input to open the keyboard
  };

  return (
    <IPayView testID={`${testID}-amount-input`} style={styles.inputContainer}>
      <IPayInput
        testID="amount-input"
        ref={inputRef}
        text={amountStr}
        placeholder="0"
        placeholderTextColor={colors.natural.natural300}
        style={[styles.textAmount, style]} // Combine styles
        onChangeText={onAmountChange}
        keyboardType="numeric"
        editable={editable} // Pass editable prop here
      />
      <IPayLargeTitleText style={[styles.currencyText, currencyStyle]}>
        {localizationText.SAR}
      </IPayLargeTitleText>
      {editable && (
        <TouchableOpacity onPress={handleIconPress}>
          <IPayIcon icon={icons.EDIT} />
        </TouchableOpacity>
      )}
    </IPayView>
  );
};

export default IPayAmountInput;
