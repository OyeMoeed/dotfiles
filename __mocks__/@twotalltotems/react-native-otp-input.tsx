// __mocks__/@twotalltotems/react-native-otp-input.tsx

import React from 'react';
import { TextInput, View } from 'react-native';

const OTPInputView = (props) => {
  const { pinCount, code, onCodeChanged, autoFocusOnLoad, codeInputFieldStyle, codeInputHighlightStyle } = props;

  return (
    <View testID="otp-input-view">
      {[...Array(pinCount)].map((_, index) => (
        <TextInput
          key={index}
          value={code[index] || ''}
          onChangeText={(text) => {
            const newCode = code.split('');
            newCode[index] = text;
            onCodeChanged(newCode.join(''));
          }}
          style={codeInputFieldStyle}
          testID={`otp-input-${index}`}
        />
      ))}
    </View>
  );
};

export default OTPInputView;
