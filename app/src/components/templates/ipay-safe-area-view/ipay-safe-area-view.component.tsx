import IPayStatusBar from '@app/components/atoms/ipay-statusbar/ipay-statusbar.component';
import React from 'react';
// import { SafeAreaView } from 'react-native';
import { SafeAreaViewProps, SafeAreaView } from 'react-native-safe-area-context';
import styles from './ipay-safe-area-view.style';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {SafeAreaViewProps} props - SafeAreaViewProps containing children components.
 * @returns {JSX.Element} JSX element containing StatusBar and SafeAreaView components.
 */
const IPaySafeAreaView: React.FC<SafeAreaViewProps> = ({ children,style }): JSX.Element => {
  return (
    <>
      <IPayStatusBar />
      < SafeAreaView style={[styles.container,style]} edges={['top','left','right']}>{children}</SafeAreaView>
    </>
  );
};

export default IPaySafeAreaView;
