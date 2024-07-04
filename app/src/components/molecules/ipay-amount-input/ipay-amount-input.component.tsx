import icons from '@app/assets/icons';
import { IPayIcon, IPayInput, IPayLargeTitleText, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { formatCurrencyValue } from '@app/utilities/currency-helper.util';
import { TopUpStates } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
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
  currentState,
}) => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const styles = amountInputStyles(colors);

  const amountStr = amount ? formatCurrencyValue(amount) : '';

 
  const [isEditable, setIsEditable] = useState(true); // Start as not editable

 
  const handleIconPress = () => {
    setIsEditable(!isEditable); 

  };

  const handleBlur = () => {
    setIsEditable(false); // Disable edit mode when the input loses focus
  };
  useEffect(() => {
    if (currentState != TopUpStates.INITAL_STATE) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  }, [currentState]);

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
        {localizationText.SAR}
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
