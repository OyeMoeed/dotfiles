import { IPayBodyText, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { IPayPrimaryButtonProps } from './ipay-primary-button.interface';
import genratedStyles from './ipay-primary-button.style';

const IPayPrimaryButton: React.FC<IPayPrimaryButtonProps> = ({
  disabled,
  testID,
  small,
  medium,
  large,
  width,
  btnText,
  buttonColor,
  arrowIconColor,
  style,
  onPress,
  btnIconsDisabled,
  leftIcon,
  rightIcon,
}) => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);

  const buttonBackgroundColor = disabled ? colors.natural.natural200 : buttonColor || colors.primary.primary500;
  const btnStyle = useMemo(() => {
    if (small) return [styles.btnSmall, { width, backgroundColor: buttonBackgroundColor }];
    if (medium) return [styles.btnMedium, { width, backgroundColor: buttonBackgroundColor }];
    if (large) return [styles.btnLarge, { width, backgroundColor: buttonBackgroundColor }];
  }, [small, medium, large, width, buttonBackgroundColor]);

  const arrowColor = disabled ? colors.natural.natural300 : arrowIconColor;

  function ButtonText(): JSX.Element {
    const textColor = disabled ? colors.natural.natural300 : colors.natural.natural0;
    return large ? (
      <IPayBodyText regular text={btnText} color={textColor} />
    ) : (
      <IPaySubHeadlineText text={btnText} regular color={textColor} />
    );
  }

  const justifyContent: ViewStyle['justifyContent'] =
    btnIconsDisabled || (leftIcon && !rightIcon) || (!leftIcon && rightIcon) ? 'center' : 'space-between';

  const alignItemsStyle = useMemo(
    () => (btnIconsDisabled || (leftIcon && !rightIcon) || (!leftIcon && rightIcon) ? { alignItems: 'center' } : {}),
    [btnIconsDisabled, leftIcon, rightIcon],
  );
  return (
    <IPayPressable testID={testID} disabled={disabled} onPress={onPress} style={[btnStyle, alignItemsStyle, style]}>
      <IPayView style={[styles.childContainer, justifyContent]}>
        {!btnIconsDisabled && (leftIcon || (!rightIcon && <IPayIcon icon="arrow-left" size={20} color={arrowColor} />))}
        <IPayView style={styles.btnTextView}>
          <ButtonText />
        </IPayView>
        {!btnIconsDisabled &&
          (rightIcon || (!leftIcon && <IPayIcon icon="arrow-right" size={20} color={arrowColor} />))}
      </IPayView>
    </IPayPressable>
  );
};

export default IPayPrimaryButton;
