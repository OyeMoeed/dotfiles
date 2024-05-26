
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import styles from './ipay-safe-area-view.style';
import IPayStatusBar from '@app/components/atoms/statusbar/ipay-statusbar.component';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {SafeAreaViewProps} props - SafeAreaViewProps containing children components.
 * @returns {JSX.Element} JSX element containing StatusBar and SafeAreaView components.
 */
const IPaySafeAreaView: React.FC<SafeAreaViewProps> = ({ children }): JSX.Element => {
  return (
    <>
      <IPayStatusBar />
      < SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </>
  );
};

export default IPaySafeAreaView;
