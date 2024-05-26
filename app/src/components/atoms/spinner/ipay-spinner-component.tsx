// ipaySpinner.tsx
import { spinnerVariant } from '@app/utilities/enums.util';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import IPayText from '../text/ipay-base-text/ipay-text.component';
import IPayView from '../view/ipay-view.component';
import { IPaySpinnerProps } from './ipay-spinner-interface';
import { styles } from './ipay-spinner-styles';

/**
 * A container component to layout and arrange child components.
 * @param {IPaySpinnerProps} props - The props for the RNView component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPaySpinner: React.FC<IPaySpinnerProps> = ({ testID, text, variant, color }: IPaySpinnerProps): JSX.Element => {
  return (
    <IPayView>
      <IPayView style={styles.container}>
        <ActivityIndicator color={color || '#0000ff'} testID={testID} />
        {variant === spinnerVariant.TEXT && text && <IPayText style={styles.text}>{text}</IPayText>}
      </IPayView>
    </IPayView>
  );
};

export default IPaySpinner;
