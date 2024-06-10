import React, { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, ViewStyle, Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;


// Native components
import { IPayView } from '@app/components/atoms';
import FullWindowOverlayNativeComponent from '../../../../../node_modules/react-native-screens/src/fabric/FullWindowOverlayNativeComponent';
const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

function FullWindowOverlay(props: { children: ReactNode }) {
  if (Platform.OS !== 'ios') {
    console.warn('Using FullWindowOverlay is only valid on iOS devices.');
    return <IPayView {...props} />;
  }
  return (
    <NativeFullWindowOverlay style={{ position: 'absolute', width: width, height: '100%', bottom: '-15%' }}>
      {props.children}
    </NativeFullWindowOverlay>
  );
}

export default FullWindowOverlay;
