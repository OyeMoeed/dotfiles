import icons from '@app/assets/icons';
import { IPayCaption1Text, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { isAndroidOS } from '@app/utilities/constants';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { UseControllerProps, useController, useFormContext } from 'react-hook-form';
import { Animated, StyleProp, TextInput, ViewStyle } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { AnimatedTextInputProps } from './ipay-animated-input-text.interface';
import inputFieldStyles from './ipay-animated-input-text.styles';

interface ControlledInputProps extends AnimatedTextInputProps, UseControllerProps {
  name: string;
  defaultValue?: string;
  onMaxLengthReach?: (value: string, maxLength: number) => void;
  mainContainerStyles?: StyleProp<ViewStyle>;
}

const IPayRHFAnimatedTextInput = forwardRef<TextInput, ControlledInputProps>(
  (
    {
      name,
      testID,
      label,
      rightIcon,
      isError,
      editable = true,
      containerStyle,
      actionDisabled,
      onClearInput,
      assistiveText,
      showRightIcon,
      customIcon,
      rules = {},
      inputStyle,
      multiline,
      labelColor,
      defaultValue = '',
      onMaxLengthReach,
      mainContainerStyles,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
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
        outputRange: [moderateScale(isAndroidOS ? 13 : 15), moderateScale(isAndroidOS ? 3 : 5)],
      }),
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [moderateScale(13.5), moderateScale(12)],
      }),
      color: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.natural.natural500, labelColor ?? colors.primary.primary500],
      }),
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <IPayView style={mainContainerStyles} testID={`${testID}-animated-input`}>
        <IPayView
          style={[
            styles.containerWithoutPadding,
            !editable && styles.disabledContainer,
            isFocused && styles.focusedContainer,
            errors[name] && styles.errorContainer,
            containerStyle,
          ]}
        >
          <IPayView style={styles.iconAndInputStyles}>
            {rightIcon}
            <IPayView style={styles.outerView}>
              <Animated.Text style={labelStyle}>{t(label)}</Animated.Text>
              <TextInput
                ref={ref}
                {...props}
                onChangeText={(text) => {
                  field.onChange(text);
                  if (props.maxLength && text.length === props.maxLength && onMaxLengthReach) {
                    onMaxLengthReach(field.value, props.maxLength);
                  }
                }}
                value={field.value}
                style={[styles.input, multiline && styles.inputLineHeight, inputStyle]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                editable={editable}
              />
            </IPayView>
          </IPayView>
          {showRightIcon && (
            <IPayPressable
              disabled={actionDisabled}
              activeOpacity={1}
              style={styles.closeIcon}
              onPressIn={onClearInput}
            >
              {customIcon || <IPayIcon icon={icons.close} />}
            </IPayPressable>
          )}
        </IPayView>
        {(errors[name]?.message || assistiveText) && (
          <IPayCaption1Text
            style={errors[name]?.message ? styles.errorAssistiveTextText : styles.assistiveText}
            text={errors[name]?.message ? (errors[name]?.message as string) : assistiveText}
            regular
          />
        )}
      </IPayView>
    );
  },
);
export default IPayRHFAnimatedTextInput;
