import React from 'react';
import { IPayLinearGradientView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPaySafeAreaViewProps } from './ipay-safe-area-view.interface';
import styles from './ipay-safe-area-view.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import IPayStatusBar from '@app/components/atoms/ipay-statusbar/ipay-statusbar.component';

/**
 * IPaySafeAreaView component renders a safe area view with custom styles and linear gradient background.
 * @param {IPaySafeAreaViewProps} props - Props containing children components and linear gradient colors.
 * @returns {JSX.Element} JSX element containing StatusBar and SafeAreaView components.
 */
const IPaySafeAreaView: React.FC<IPaySafeAreaViewProps> = ({
  children,
  linearGradientColors,
  style
}: IPaySafeAreaViewProps): JSX.Element => {
  const { colors } = useTheme();


  return (
    <IPayLinearGradientView
      style={styles.linearGradientStyles}
      gradientColors={linearGradientColors || colors.bottomsheetGradient}
    >
      <SafeAreaView style={[styles.container,style]}>
        <IPayStatusBar />
        {children}
      </SafeAreaView>
    </IPayLinearGradientView>
  );
};

export default IPaySafeAreaView;
