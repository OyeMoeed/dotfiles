import { IPayPressable, IPayText, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayCounterButtonProps } from './ipay-counter-button.interface';
import styles from './ipay-counter-button.style';

/**
 * A component to display localized text.
 * @param {RNSwitchProps} props - The props for the IPayText component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayCounterButton: React.FC<IPayCounterButtonProps> = ({
  testID,
  onPressUp,
  onPressDown,
}: IPayCounterButtonProps): JSX.Element => {
  const { colors } = useTheme();
  const counterStyles = styles(colors);
  return (
    <IPayView testID={`${testID}-counter-button`} style={counterStyles.counterContainerStyle}>
      <IPayPressable onPress={onPressUp} style={counterStyles.counterButtonContainer}>
        <IPayText style={counterStyles.counterTextStyle}>-</IPayText>
      </IPayPressable>
      <IPayView style={counterStyles.counterBorder} />
      <IPayPressable onPress={onPressDown} style={counterStyles.counterButtonContainer}>
        <IPayText style={counterStyles.counterTextStyle}>+</IPayText>
      </IPayPressable>
    </IPayView>
  );
};

export default IPayCounterButton;
