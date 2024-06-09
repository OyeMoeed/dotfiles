import { IPayBodyText, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import icons from '@app/assets/icons';
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
}) => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);

  const btnStyle = useMemo(() => {
    const baseStyle = {
      width,
      borderColor: disabled ? colors.natural.natural200 : buttonColor || colors.primary.primary500,
    };
    if (small) return [styles.btnSmall, baseStyle];
    if (medium) return [styles.btnMedium, baseStyle];
    if (large) return [styles.btnLarge, baseStyle];
    return baseStyle;
  }, [small, medium, large, width, buttonColor, disabled, colors]);

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

  const justifyContent: ViewStyle['justifyContent'] =
    btnIconsDisabled || (leftIcon && !rightIcon) || (!leftIcon && rightIcon) ? 'center' : 'space-between';

  const alignItemsStyle = useMemo(
    () => (btnIconsDisabled || (leftIcon && !rightIcon) || (!leftIcon && rightIcon) ? { alignItems: 'center' } : {}),
    [btnIconsDisabled, leftIcon, rightIcon],
  );

  return (
    <IPayPressable
      testID={`${testID}-button-outline`}
      disabled={disabled}
      onPress={onPress}
      style={[btnStyle, alignItemsStyle, style]}
    >
      <IPayView style={[styles.childContainer, { justifyContent }]}>
        {!btnIconsDisabled &&
          (leftIcon || (!rightIcon && <IPayIcon icon={icons.ARROW_LEFT} size={20} color={arrowColor} />))}
        <IPayView style={styles.btnTextView}>{ButtonText}</IPayView>
        {!btnIconsDisabled &&
          (rightIcon || (!leftIcon && <IPayIcon icon={icons.ARROW_RIGHT} size={20} color={arrowColor} />))}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayOutlineButton;
