import { IPayBodyText, IPayView } from '@app/components/atoms';
import constants from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { IPayOtpInputTextProps } from './ipay-otp-input-text.interface';
import genratedStyles from './ipay-otp-input-text.style';

const IPayOtpInputText: React.FC<IPayOtpInputTextProps> = ({ testID, isError, onChangeText }) => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: constants.OTP_CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  const onChange = (text: string) => {
    setValue(text);
    if (onChangeText) onChangeText(text);
  };

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={onChange}
      cellCount={constants.OTP_CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
      testID={`${testID}-otp-input`}
      renderCell={({ index, symbol, isFocused }) => (
        <IPayView
          key={index}
          onLayout={getCellOnLayoutHandler(index)}
          style={[
            styles.underlineStyleBase,
            isError && { borderColor: colors.error.error500 },
            isFocused && styles.underlineStyleHighLighted
          ]}
        >
          <IPayBodyText color={symbol ? colors.natural.natural900 : colors.natural.natural300}>
            {symbol || (isFocused ? <Cursor /> : '-')}
          </IPayBodyText>
        </IPayView>
      )}
    />
  );
};

export default IPayOtpInputText;
