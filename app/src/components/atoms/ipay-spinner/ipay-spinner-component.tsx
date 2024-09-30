// ipaySpinner.tsx
import useTheme from '@app/styles/hooks/theme.hook';
import { SpinnerVariant } from '@app/utilities/enums.util';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Portal } from 'react-native-portalize';
import IPayText from '../ipay-text/ipay-base-text/ipay-text.component';
import IPayView from '../ipay-view/ipay-view.component';
import { IPaySpinnerProps } from './ipay-spinner-interface';
import spinnerStyles from './ipay-spinner-styles';

/**
 * A container component to layout and arrange child components.
 * @param {IPaySpinnerProps} props - The props for the RNView component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPaySpinner: React.FC<IPaySpinnerProps> = ({
  testID,
  text,
  variant,
  color,
  hasBackgroundColor = true,
}: IPaySpinnerProps) => {
  const { colors } = useTheme();
  const styles = spinnerStyles(colors, hasBackgroundColor);
  return (
    <Portal>
      <IPayView style={styles.container}>
        <ActivityIndicator size="large" color={color || colors.primary.primary500} testID={`${testID}-spinner`} />
        {variant === SpinnerVariant.TEXT && text && <IPayText style={styles.text}>{text}</IPayText>}
      </IPayView>
    </Portal>
  );
};
export default IPaySpinner;
