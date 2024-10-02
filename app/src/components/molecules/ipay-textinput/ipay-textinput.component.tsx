import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
import { IPayCaption1Text, IPayIcon, IPayInput, IPayPressable, IPayView } from '@components/atoms/index';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPayButton from '../ipay-button/ipay-button.component';
import { IPayTextInputProps } from './ipay-textinput.interface';
import textInputStyles from './ipay-textinput.style';
/**
 * A component to display and input text.
 * @param {IPayTextInputProps} props - The props for the RNTextInput component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayTextInput: React.FC<IPayTextInputProps> = ({
  testID,
  text,
  style,
  placeholder,
  placeholderTextColor,
  autoCapitalize,
  maxLength,
  multiline,
  keyboardType,
  onBlur,
  onChangeText,
  onFocus,
  onSubmitEditing,
  containerStyle = {},
  headingStyles,
  label,
  isError,
  assistiveText,
  editable = true,
  rightIcon,
  onPressCancle,
  leftIcon,
  closeIconStyle,
  showLeftIcon,
  onClearInput,
  caretHidden,
  returnKeyLabel,
  simpleInput = false,
  assistiveTextStyle,
  showFocusStyle,
  showCancleButton = false,
}: IPayTextInputProps): React.JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = textInputStyles(colors);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const shouldRenderLabel = isFocused || text;
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  useEffect(() => {
    setIsFocused(!!showFocusStyle);
  }, [showFocusStyle]);

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <IPayView testID={`${testID}-text-input`} style={styles.outerWrapper}>
      <IPayView
        style={[
          styles.container,
          isFocused && styles.focusedContainer,
          isError && styles.errorContainer,
          !editable && styles.disabledContainer,
          containerStyle,
        ]}
      >
        <IPayView style={styles.container2}>
          <IPayView style={styles.iconAndInputStyles}>
            {rightIcon}
            <IPayView style={styles.outerView}>
              {!simpleInput && shouldRenderLabel && (
                <IPayCaption1Text
                  text={label}
                  style={[styles.label, !editable && styles.disableLabel, headingStyles]}
                  regular
                />
              )}
              <IPayInput
                isFocused={isFocused}
                returnKeyLabel={returnKeyLabel}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                testID={testID}
                text={t(`${text}`)}
                style={style}
                caretHidden={caretHidden}
                placeholder={isFocused || simpleInput ? placeholder : label}
                placeholderTextColor={placeholderTextColor}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                multiline={multiline}
                keyboardType={keyboardType}
                onBlur={onBlur}
                onFocus={onFocus}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                editable={editable}
              />
            </IPayView>
          </IPayView>
          {showLeftIcon && (
            <IPayPressable activeOpacity={1} style={[styles.closeIcon, closeIconStyle]} onPressIn={onClearInput}>
              {leftIcon || <IPayIcon icon={icons.close} size={18} color={colors.natural.natural500} />}
            </IPayPressable>
          )}
        </IPayView>
        {showCancleButton && (
          <IPayButton
            btnText="COMMON.CANCEL"
            onPress={onPressCancle}
            btnStyle={styles.cancleButton}
            textColor={colors.primary.primary600}
            btnType={buttonVariants.LINK_BUTTON}
            btnIconsDisabled
          />
        )}
      </IPayView>

      {assistiveText && (
        <IPayCaption1Text
          style={[isError ? styles.errorAssistiveTextText : styles.assistiveText, assistiveTextStyle]}
          text={assistiveText}
          regular
        />
      )}
    </IPayView>
  );
};

export default IPayTextInput;
