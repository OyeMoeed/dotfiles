import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPayCaption1Text, IPayImage, IPayInput, IPayPressable, IPayView } from '@components/atoms/index';

import { inputVariants } from '@app/utilities/enums.util';
import { ArrowIcon, Close } from '@app/assets/svgs/svg';
import useTheme from '@app/styles/hooks/theme.hook';
import commonStyles from '@app/styles/common.styles';
import textSelectorStyles from './ipay-selector-input.style';
import { IPaySelectorInputProps } from './ipay-selector-input.interface';
/**
 * A component to display and input text.
 * @param {IPaySelectorInputProps} props - The props for the RNTextInput component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPaySelectorInput: React.FC<IPaySelectorInputProps> = ({
  testID,
  text,
  placeholder,
  placeholderTextColor,
  onChangeText,
  onSubmitEditing,
  containerStyle = {},
  headingStyles,
  isError,
  assistiveText,
  editable = true,
  onClearInput,
  showLeftIcon,
  countryCode,
  currency = 'SAR',
  flagImage,
  showIcon = true,
  variant = inputVariants.PHONE_NUMBER,
}: IPaySelectorInputProps): JSX.Element => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useTheme();
  const styles = textSelectorStyles(colors);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <IPayView testID={`${testID}-selector`} style={styles.outerWrapper}>
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
          <IPayPressable activeOpacity={1} style={styles.rowStyles} onPressIn={onClearInput}>
            {variant == inputVariants.PHONE_NUMBER ? (
              <IPayImage image={flagImage} style={styles.flag} />
            ) : (
              <IPayCaption1Text text={currency} style={[styles.numberValue]} />
            )}
            {showIcon && <ArrowIcon color={!editable ? colors.natural.natural500 : colors.primary.primary500} />}
          </IPayPressable>

          <IPayView style={styles.outerView}>
            <IPayCaption1Text
              text={variant == inputVariants.PHONE_NUMBER ? t('phoneNumber') : t('currency')}
              style={[styles.label, !editable && styles.disableLabel, headingStyles]}
              regular
            />
            <IPayView style={styles.rowStyles}>
              {variant == inputVariants.PHONE_NUMBER && (
                <IPayCaption1Text text={countryCode} style={[styles.numberValue]} regular />
              )}
              <IPayInput
                isFocused={isFocused}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                text={t(`${text}`)}
                style={[styles.textInputStyle, commonStyles.subHeadlineText]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                keyboardType="number-pad"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                editable={editable}
              />
            </IPayView>
          </IPayView>
        </IPayView>
        {showLeftIcon && (
          <IPayPressable activeOpacity={1} style={styles.closeIcon} onPressIn={onClearInput}>
            <Close />
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

export default IPaySelectorInput;
