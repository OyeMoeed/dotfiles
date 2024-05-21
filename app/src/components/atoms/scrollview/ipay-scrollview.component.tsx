import React from 'react';
import { ScrollView } from 'react-native';
import { IPayScrollViewProps } from './ipay-scrollview.interface';
import styles from './ipay-scrollview.style';

/**
 * A customizable ScrollView component.
 * @param {IPayScrollViewProps} props - The props for the RNScrollView component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayScrollView: React.FC<IPayScrollViewProps> = ({
  testID,
  children,
  style,
  horizontal,
  refreshControl,
  ...rest
}: IPayScrollViewProps): JSX.Element => {
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

export default IPayScrollView;
