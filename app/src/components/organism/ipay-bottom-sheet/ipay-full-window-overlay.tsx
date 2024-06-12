import React, { PropsWithChildren, ReactNode } from 'react';
import { Dimensions, Platform, StyleProp, ViewStyle } from 'react-native';

// Native components
import { IPayView } from '@app/components/atoms';
import FullWindowOverlayNativeComponent from 'react-native-screens';

const { width } = Dimensions.get('screen');

const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

const FullWindowOverlay = (props: { children: ReactNode }) => {
  if (Platform.OS !== 'ios') {
    return <IPayView {...props} />;
  }
  return (
    <NativeFullWindowOverlay style={{ position: 'absolute', width, height: '100%', bottom: '-15%' }}>
      {props.children}
    </NativeFullWindowOverlay>
  );
};

export default FullWindowOverlay;
