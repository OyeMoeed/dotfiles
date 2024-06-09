import IPayStatusBar from '@app/components/atoms/ipay-statusbar/ipay-statusbar.component';
import React from 'react';
// import { SafeAreaView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IPaySafeAreaViewProps } from './ipay-safe-area-view.interface';
import styles from './ipay-safe-area-view.style';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {IPaySafeAreaViewProps} props - IPaySafeAreaViewProps containing children components.
 * @returns {JSX.Element} JSX element containing StatusBar and SafeAreaView components.
 */
const IPaySafeAreaView: React.FC<IPaySafeAreaViewProps> = ({ testID, children, style }): JSX.Element => (
  <>
    <IPayStatusBar />
    <SafeAreaView testID={`${testID}-safe-area`} style={[styles.container, style]} edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  </>
);

export default IPaySafeAreaView;
