import React, { forwardRef } from 'react';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { IPayKeyboardAwareScrollViewProps } from './ipay-keyboard-aware-scroll-view.interface'
import styles from './ipay-keyboard-aware-scroll-view.styles'

/**
 * A customizable KeyboardAwareScrollView component.
 * @param {IPayScrollViewProps} props - The props for the KeyboardAwareScrollView component.
 * @param {React.Ref<KeyboardAwareScrollView>} ref - The ref for the KeyboardAwareScrollView component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayKeyboardAwareScrollView = forwardRef<KeyboardAwareScrollView, IPayKeyboardAwareScrollViewProps>(
  (
    { testID, children, style, horizontal, refreshControl, showsVerticalScrollIndicator, ...rest },
    ref,
  ): JSX.Element => {
    return (
      <KeyboardAwareScrollView
        ref={ref as any} // Type casting is needed for KeyboardAwareScrollView's ref
        testID={`${testID}-keyboard-aware-scroll-view`}
        style={[styles.container, style]}
        horizontal={horizontal}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        {...(rest as KeyboardAwareScrollViewProps)}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  },
);

export default IPayKeyboardAwareScrollView;
