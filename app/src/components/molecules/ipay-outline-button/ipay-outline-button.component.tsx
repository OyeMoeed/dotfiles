import { IPayBodyText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { IPayOutlineButtonProps } from './ipay-outline-button.interface';
import genratedStyles from './ipay-outline-button.style';

const IPayOutlineButton: React.FC<IPayOutlineButtonProps> = ({
  disabled,
  testID,
  small,
  medium,
  large,
  width,
  buttonColor,
  btnText,
  arrowIconColor,
  style,
  onPress,
  btnIconsDisabled,
  leftIcon,
  rightIcon,
  buttonTextStyle
}) => {
  const { colors, icons } = useTheme();
  const styles = genratedStyles(colors);

  const btnStyle = useMemo(() => {
    const baseStyle = {
      width,
      borderColor: disabled ? colors.natural.natural200 : buttonColor || colors.primary.primary500
    };
    if (small) return [styles.btnSmall, baseStyle];
    if (medium) return [styles.btnMedium, baseStyle];
    if (large) return [styles.btnLarge, baseStyle];
    return baseStyle;
  }, [small, medium, large, width, buttonColor, disabled, colors]);

  const arrowColor = useMemo(
    () => (disabled ? colors.natural.natural300 : arrowIconColor || colors.primary.primary500),
    [disabled, arrowIconColor, colors]
  );

  const ButtonText = useMemo(() => {
    const textColor = disabled ? colors.natural.natural300 : colors.primary.primary500;
    return large ? (
      <IPayBodyText regular text={btnText} color={textColor} style={[buttonTextStyle]} />
    ) : (
      <IPaySubHeadlineText text={btnText} regular color={textColor} style={[buttonTextStyle]} />
    );
  }, [btnText, disabled, large, colors]);

  const justifyContent: ViewStyle['justifyContent'] =
    btnIconsDisabled || (leftIcon && !rightIcon) || (!leftIcon && rightIcon) ? 'center' : 'space-between';

  return (
    <IPayPressable testID={testID} disabled={disabled} onPress={onPress} style={[btnStyle, style]}>
      <IPayView style={[styles.childContainer, { justifyContent }]}>
        {!btnIconsDisabled && (leftIcon || (!rightIcon && <icons.arrowLeft color={arrowColor} />))}
        <IPayView style={styles.btnTextView}>{ButtonText}</IPayView>
        {!btnIconsDisabled && (rightIcon || (!leftIcon && <icons.arrowRight color={arrowColor} />))}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayOutlineButton;
