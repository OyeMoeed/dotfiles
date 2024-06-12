import IPayStatusBar from '@app/components/atoms/ipay-statusbar/ipay-statusbar.component';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { IPaySafeAreaViewProps } from './ipay-safe-area-view.interface';
import styles from './ipay-safe-area-view.style';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {IPaySafeAreaViewProps} props - IPaySafeAreaViewProps containing children components.
 * @returns {JSX.Element} JSX element containing StatusBar and SafeAreaView components.
 */
const IPaySafeAreaView: React.FC<IPaySafeAreaViewProps> = ({ testID, children }): JSX.Element => (
  <>
    <IPayStatusBar />
    <SafeAreaView testID={`${testID}-safe-area`} style={styles.container}>
      {children}
    </SafeAreaView>
  </>
);

export default IPaySafeAreaView;
