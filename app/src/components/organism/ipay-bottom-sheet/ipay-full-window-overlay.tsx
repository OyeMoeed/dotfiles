import React, { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, View, ViewStyle } from 'react-native';

// Native components
import FullWindowOverlayNativeComponent from '../../../../../node_modules/react-native-screens/src/fabric/FullWindowOverlayNativeComponent';
const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

function FullWindowOverlay(props: { children: ReactNode }) {
  if (Platform.OS !== 'ios') {
    console.warn('Using FullWindowOverlay is only valid on iOS devices.');
    return <View {...props} />;
  }
  return (
    <NativeFullWindowOverlay style={{ position: 'absolute', width: '100%', height: '100%', bottom: '-24%' }}>
      {props.children}
    </NativeFullWindowOverlay>
  );
}

export default FullWindowOverlay;
