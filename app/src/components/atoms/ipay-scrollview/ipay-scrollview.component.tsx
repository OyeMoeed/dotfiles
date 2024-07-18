import React, { forwardRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { ScrollView as GHScrollView } from 'react-native-gesture-handler';
import { IPayScrollViewProps } from './ipay-scrollview.interface';
import styles from './ipay-scrollview.style';

/**
 * A customizable ScrollView component.
 * @param {IPayScrollViewProps} props - The props for the RNScrollView component.
 * @param {React.Ref<ScrollView>} ref - The ref for the ScrollView component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayScrollView = forwardRef<RNScrollView, IPayScrollViewProps>(
  (
    { testID, children, style, horizontal, refreshControl, isGHScrollView, showsVerticalScrollIndicator, ...rest },
    ref,
  ): JSX.Element => {
    const ScrollViewComponent = isGHScrollView ? GHScrollView : RNScrollView;

    return (
      <ScrollViewComponent
        ref={ref}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        testID={`${testID}-scroll-view`}
        style={[styles.container, style]}
        horizontal={horizontal}
        refreshControl={refreshControl}
        {...rest}
      >
        {children}
      </ScrollViewComponent>
    );
  },
);

export default IPayScrollView;
