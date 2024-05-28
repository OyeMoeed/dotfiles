import { IPayBodyText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { IPayLinkButtonProps } from './ipay-link-button.interface';
import genratedStyles from './ipay-link-button.style';

const IPayLinkButton: React.FC<IPayLinkButtonProps> = ({
  disabled,
  testID,
  small,
  medium,
  large,
  width,
  arrowIconColor,
  btnText,
  style,
  onPress,
  btnIconsDisabled,
  leftIcon,
  rightIcon,
}) => {
  const { colors, icons } = useTheme();
  const styles = genratedStyles(colors);

  const btnStyle = useMemo(() => {
    const baseStyle = { width };
    if (small) return [styles.btnSmall, baseStyle];
    if (medium) return [styles.btnMedium, baseStyle];
    if (large) return [styles.btnLarge, baseStyle];
    return baseStyle;
  }, [small, medium, large, width, styles]);

  const arrowColor = useMemo(
    () => (disabled ? colors.natural.natural300 : arrowIconColor || colors.primary.primary500),
    [disabled, arrowIconColor, colors],
  );

  const ButtonText = useMemo(() => {
    const textColor = disabled ? colors.natural.natural300 : colors.primary.primary500;
    return large ? (
      <IPayBodyText regular text={btnText} color={textColor} />
    ) : (
      <IPaySubHeadlineText text={btnText} regular color={textColor} />
    );
  }, [btnText, disabled, large, colors]);

  const justifyContent: ViewStyle['justifyContent'] = useMemo(
    () => (btnIconsDisabled || (leftIcon && !rightIcon) || (!leftIcon && rightIcon) ? 'center' : 'space-between'),
    [btnIconsDisabled, leftIcon, rightIcon],
  );

  const alignItemsStyle = useMemo(
    () => (btnIconsDisabled || (leftIcon && !rightIcon) || (!leftIcon && rightIcon) ? { alignItems: 'center' } : {}),
    [btnIconsDisabled, leftIcon, rightIcon],
  );

  return (
    <IPayPressable testID={testID} disabled={disabled} onPress={onPress} style={[btnStyle, alignItemsStyle, style]}>
      <IPayView style={[styles.childContainer, { justifyContent }]}>
        {!btnIconsDisabled && (leftIcon || (!rightIcon && <icons.arrowLeft color={arrowColor} />))}
        <IPayView style={styles.btnTextView}>{ButtonText}</IPayView>
        {!btnIconsDisabled && (rightIcon || (!leftIcon && <icons.arrowRight color={arrowColor} />))}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayLinkButton;
