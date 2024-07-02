import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native';
import { IPayScrollViewProps } from './ipay-scrollview.interface';
import styles from './ipay-scrollview.style';

/**
 * A customizable ScrollView component.
 * @param {IPayScrollViewProps} props - The props for the RNScrollView component.
 * @param {React.Ref<ScrollView>} ref - The ref for the ScrollView component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayScrollView = forwardRef<ScrollView, IPayScrollViewProps>(
  ({ testID, children, style, horizontal, refreshControl, ...rest }, ref): JSX.Element => (
    <ScrollView
      ref={ref}
      testID={`${testID}-scroll-view`}
      style={[styles.container, style]}
      horizontal={horizontal}
      refreshControl={refreshControl}
      {...rest}
    >
      {children}
    </ScrollView>
  ),
);

export default IPayScrollView;
