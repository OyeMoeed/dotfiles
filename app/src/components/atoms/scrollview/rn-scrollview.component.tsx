import React from 'react';
import { ScrollView } from 'react-native';
import styles from './rn-scrollview.style';
import { RNScrollViewProps } from './rn-scrollview.interface';

/**
 * A customizable ScrollView component.
 * @param {RNScrollViewProps} props - The props for the RNScrollView component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNScrollView: React.FC<RNScrollViewProps> = ({
  testID,
  children,
  style,
  horizontal,
  refreshControl,
  ...rest
}: RNScrollViewProps): JSX.Element => {
  return (
    <ScrollView
      testID={testID}
      style={[styles.container, style]}
      horizontal={horizontal}
      refreshControl={refreshControl}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};

export default RNScrollView;
