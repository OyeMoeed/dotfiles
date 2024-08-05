import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import React, { useEffect, useRef, useState } from 'react';
import { UseControllerProps, useController, useFormContext } from 'react-hook-form';
import { Animated, TextInput } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { AnimatedTextInputProps } from './ipay-animated-input-text.interface';
import inputFieldStyles from './ipay-animated-input-text.styles';

interface ControlledInputProps extends AnimatedTextInputProps, UseControllerProps {
  name: string;
  defaultValue?: string;
}

const IPayRHFAnimatedTextInput: React.FC<ControlledInputProps> = ({
  name,
  testID,
  label,
  rightIcon,
  isError,
  editable,
  containerStyle,
  actionDisabled,
  onClearInput,
  assistiveText,
  showRightIcon,
  customIcon,
  rules = {},
  labelColor,
  defaultValue = '',
  ...props
}) => {
  const { colors } = useTheme();
  const styles = inputFieldStyles(colors);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const [isFocused, setIsFocused] = useState((!editable && !!field.value) || false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: !isFocused && field.value === '' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, field.value]);

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
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <IPayView testID={`${testID}-animated-input`}>
      <IPayView
        style={[
          styles.container,
          isFocused && styles.focusedContainer,
          !editable && styles.disabledContainer,
          errors[name] && styles.errorContainer,
          containerStyle,
        ]}
      >
        <IPayView style={styles.iconAndInputStyles}>
          {rightIcon}
          <IPayView style={styles.outerView}>
            <Animated.Text style={[labelStyle, labelColor]}>{label}</Animated.Text>
            <TextInput
              {...props}
              onChangeText={field.onChange}
              value={field.value}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              editable={editable}
            />
          </IPayView>
        </IPayView>
        {showRightIcon && (
          <IPayPressable disabled={actionDisabled} activeOpacity={1} style={styles.closeIcon} onPressIn={onClearInput}>
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
      {errors[name] && (
        <IPayCaption1Text style={styles.errorAssistiveTextText} text={errors[name]?.message as string} regular />
      )}
    </IPayView>
  );
};

export default IPayRHFAnimatedTextInput;
