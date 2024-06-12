import { IPayLinearGradientView } from '@app/components/atoms';
import IPayStatusBar from '@app/components/atoms/ipay-statusbar/ipay-statusbar.component';
import React from 'react';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import styles from './ipay-safe-area-view.style';
import colors from '@app/styles/colors.const';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {SafeAreaViewProps & IPaySafeAreaViewProps} props - SafeAreaViewProps containing children components and optional linearGradientColors.
 * @returns {JSX.Element} JSX element containing StatusBar, LinearGradientView, and SafeAreaView components.
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
