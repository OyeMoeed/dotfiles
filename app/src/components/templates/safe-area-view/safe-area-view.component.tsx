import colors from '@styles/colors';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import styles from './safe-area-view.style';

/**
 * SafeAreaViewComp component renders a safe area view with custom styles.
 * @param {SafeAreaViewProps} props - SafeAreaViewProps containing children components.
 * @returns {JSX.Element} JSX element containing StatusBar and SafeAreaView components.
 */
const SafeAreaViewComp: React.FC<SafeAreaViewProps> = ({ children }): JSX.Element => {
  return (
    <>
      {/* StatusBar to manage the status bar color and style */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.creamWhite} />
      {/* SafeAreaView for top and bottom safe areas with custom styles */}
      <SafeAreaView style={styles.SafeAreaView1} />
      <SafeAreaView style={styles.SafeAreaView2}>{children}</SafeAreaView>
    </>
  );
};

export default SafeAreaViewComp;
