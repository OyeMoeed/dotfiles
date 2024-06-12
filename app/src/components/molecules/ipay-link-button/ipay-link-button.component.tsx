import { IPayBodyText, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@assets/icons/index';
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
  hasLeftIcon,
  hasRightIcon,
}) => {
  const { colors } = useTheme();
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
    () =>
      btnIconsDisabled || (hasLeftIcon && !hasRightIcon) || (!hasLeftIcon && hasRightIcon) ? 'center' : 'space-between',
    [btnIconsDisabled, hasLeftIcon, hasRightIcon],
  );

  const alignItemsStyle = useMemo(
    () =>
      btnIconsDisabled || (hasLeftIcon && !hasRightIcon) || (!hasLeftIcon && hasRightIcon)
        ? { alignItems: 'center' }
        : {},
    [btnIconsDisabled, hasLeftIcon, hasRightIcon],
  );

  return (
    <IPayPressable
      testID={`${testID}-button-link`}
      disabled={disabled}
      onPress={onPress}
      style={[btnStyle, alignItemsStyle, style]}
    >
      <IPayView style={[styles.childContainer, { justifyContent }]}>
        {!btnIconsDisabled &&
          (leftIcon || (!hasRightIcon && <IPayIcon icon={icons.ARROW_LEFT} size={20} color={arrowColor} />))}
        <IPayView style={styles.btnTextView}>{ButtonText}</IPayView>
        {!btnIconsDisabled &&
          (rightIcon || (!hasLeftIcon && <IPayIcon icon={icons.ARROW_RIGHT} size={20} color={arrowColor} />))}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayLinkButton;
