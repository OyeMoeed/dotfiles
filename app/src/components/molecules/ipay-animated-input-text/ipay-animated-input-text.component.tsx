import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, TextInput } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { AnimatedTextInputProps } from './ipay-animated-input-text.interface';
import { inputFieldStyles } from './ipay-animated-input-text.styles';

const IPayAnimatedTextInput: React.FC<AnimatedTextInputProps> = ({
  testID,
  label,
  rightIcon,
  isError,
  editable,
  containerStyle,
  onClearInput,
  assistiveText,
  onFocus,
  onBlur,
  onChangeText,
  value = '',
  showRightIcon,
  customIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState((!editable && !!value) || false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
  const styles = inputFieldStyles(colors);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: !isFocused && value === '' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [moderateScale(isAndroidOS ? 13 : 16), moderateScale(1)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [moderateScale(13.5), moderateScale(12)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.natural.natural500, colors.primary.primary500],
    }),
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleOnChangeText = (txt: string) => {
    if (onChangeText) onChangeText(txt);
  };

  return (
    <IPayView testID={`${testID}-animated-input`}>
      <IPayView
        style={[
          styles.container,
          isFocused && styles.focusedContainer,
          !editable && styles.disabledContainer,
          isError && styles.errorContainer,
          containerStyle,
        ]}
      >
        <IPayView style={styles.iconAndInputStyles}>
          {rightIcon}
          <IPayView style={styles.outerView}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
              {...props}
              onChangeText={handleOnChangeText}
              value={value}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              blurOnSubmit
              editable={editable}
            />
          </IPayView>
        </IPayView>
        {showRightIcon && (
          <IPayPressable activeOpacity={1} style={styles.closeIcon} onPressIn={onClearInput}>
            {customIcon ? customIcon : <IPayIcon icon={icons.close} />}
          </IPayPressable>
        )}
      </IPayView>
      {assistiveText && (
        <IPayCaption1Text
          style={isError ? styles.errorAssistiveTextText : styles.assistiveText}
          text={assistiveText}
          regular
        />
      )}
    </IPayView>
  );
};

export default IPayAnimatedTextInput;
