import icons from '@app/assets/icons';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayCaption1Text, IPayIcon, IPayInput, IPayPressable, IPayView } from '@components/atoms/index';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  showLeftIcon,
  onClearInput,
  simpleInput = false,
}: IPayTextInputProps): JSX.Element => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = textInputStyles(colors);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const shouldRenderLabel = isFocused || text || !editable;
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

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
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              testID={testID}
              text={t(`${text}`)}
              style={style}
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
          <IPayPressable activeOpacity={1} style={styles.closeIcon} onPressIn={onClearInput}>
            <IPayIcon icon={icons.close} size={18} color={colors.natural.natural500} />
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

export default IPayTextInput;
