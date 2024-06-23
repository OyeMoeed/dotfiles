import React, { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, ViewStyle, Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;

// Native components
import { IPayView } from '@app/components/atoms';
import FullWindowOverlayNativeComponent from 'react-native-screens';

const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

function FullWindowOverlay(props: { children: ReactNode }) {
  if (Platform.OS !== 'ios') {
    return <IPayView {...props} />;
  }
  return (
    <NativeFullWindowOverlay style={{ position: 'absolute', width: width, height: '100%', bottom: '-15%' }}>
      {props.children}
    </NativeFullWindowOverlay>
  );
}

export default FullWindowOverlay;
