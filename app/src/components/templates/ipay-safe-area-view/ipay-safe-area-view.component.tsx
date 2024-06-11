import IPayStatusBar from '@app/components/atoms/ipay-statusbar/ipay-statusbar.component';
import React from 'react';
// import { SafeAreaView } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import styles from './ipay-safe-area-view.style';
import { IPayLinearGradientView } from '@app/components/atoms';
import colors from '@app/styles/colors.const';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {IPaySafeAreaViewProps} props - IPaySafeAreaViewProps containing children components.
 * @returns {JSX.Element} JSX element containing StatusBar and SafeAreaView components.
 */
const IPaySafeAreaView: React.FC<SafeAreaViewProps> = ({ children, style, testID }): JSX.Element => {
  return (
    <>
      <IPayLinearGradientView testID={testID} style={styles.container} gradientColors={colors.bottomsheetGradient}>
        <IPayStatusBar />
        <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
      </IPayLinearGradientView>
    </>
  );
};

export default IPaySafeAreaView;
