import { IPayLinearGradientView } from '@app/components/atoms';
import IPayStatusBar from '@app/components/atoms/ipay-statusbar/ipay-statusbar.component';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { JSX } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IPaySafeAreaViewProps } from './ipay-safe-area-view.interface';
import safeAreaViewStyles from './ipay-safe-area-view.style';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {SafeAreaViewProps & IPaySafeAreaViewProps} props - SafeAreaViewProps containing children components and optional linearGradientColors.
 * @returns {JSX.Element} JSX element containing StatusBar, LinearGradientView, and SafeAreaView components.
 */
const IPaySafeAreaView: React.FC<IPaySafeAreaViewProps> = ({
  testID,
  children,
  style,
  linearGradientColors,
}: IPaySafeAreaViewProps): JSX.Element => {
  const { colors } = useTheme();
  const styles = safeAreaViewStyles();

  return (
    <IPayLinearGradientView
      testID={`${testID}-safe-area-view`}
      style={styles.container}
      gradientColors={linearGradientColors || colors.bottomsheetGradient}
    >
      <>
        <IPayStatusBar />
        <SafeAreaView style={[styles.safeAreaView, style]} edges={['top', 'left', 'right']}>
          {children}
        </SafeAreaView>
      </>
    </IPayLinearGradientView>
  );
};

export default IPaySafeAreaView;
