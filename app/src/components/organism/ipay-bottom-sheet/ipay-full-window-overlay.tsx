import React, { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';

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
    console.warn('Using FullWindowOverlay is only valid on iOS devices.');
    return <IPayView {...props} />;
  }
  return (
    <NativeFullWindowOverlay
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        bottom: '-24%',
      }}
    >
      {props.children}
    </NativeFullWindowOverlay>
  );
}

export default FullWindowOverlay;
