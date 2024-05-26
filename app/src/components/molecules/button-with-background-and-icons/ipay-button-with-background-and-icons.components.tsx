import { IPayBodyText, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/theming/theme.hook';
import { ArrowLeft, ArrowRight } from '@assets/svgs/index';
import React from 'react';
import { IPayButtonWithBackgroundAndIconsProps } from './ipay-button-with-background-and-icons.interface';
import styles from './ipay-button-with-background-and-icons.style';

const IPayButtonWithBackgroundAndIcons: React.FC<IPayButtonWithBackgroundAndIconsProps> = ({
  disabled,
  testID,
  small,
  medium,
  large,
  width,
  buttonColor,
  arrowIconColor,
  onPress
}) => {
  const { colors } = useTheme();
  const btnStyle = () => {
    if (small) {
      return [
        styles.btnSmall,
        { width, backgroundColor: disabled ? colors.natural.natural200 : buttonColor || colors.primary.primary500 }
      ];
    } else if (medium) {
      return [
        styles.btnMedium,
        { width, backgroundColor: disabled ? colors.natural.natural200 : buttonColor || colors.primary.primary500 }
      ];
    } else if (large) {
      return [
        styles.btnLarge,
        { width, backgroundColor: disabled ? colors.natural.natural200 : buttonColor || colors.primary.primary500 }
      ];
    } else {
      return {};
    }
  };

  const arrowColor = disabled ? colors.natural.natural300 : arrowIconColor;

  const ButtonText = ({}): JSX.Element => {
    if (large) {
      return (
        <IPayBodyText regular text="Button" color={disabled ? colors.natural.natural300 : colors.natural.natural0} />
      );
    } else {
      return (
        <IPaySubHeadlineText
          text="Button"
          regular
          color={disabled ? colors.natural.natural300 : colors.natural.natural0}
        />
      );
    }
  };

  return (
    <IPayPressable testID={testID} disabled={disabled} onPress={onPress} style={btnStyle()}>
      <IPayView style={styles.childContainer}>
        <ArrowLeft color={arrowColor} />
        <IPayView style={styles.btnTextView}>
          <ButtonText />
        </IPayView>
        <ArrowRight color={arrowColor} />
      </IPayView>
    </IPayPressable>
  );
};

export default IPayButtonWithBackgroundAndIcons;
