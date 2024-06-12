import React, { PropsWithChildren, ReactNode } from 'react';
import { Dimensions, Platform, StyleProp, ViewStyle } from 'react-native';
const width = Dimensions.get('screen').width;

// Native components
import { IPayView } from '@app/components/atoms';
import FullWindowOverlayNativeComponent from 'react-native-screens';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

function FullWindowOverlay(props: { children: ReactNode }) {
  const styles = bottonSheetStyles();
  if (Platform.OS !== 'ios') {
    console.warn('Using FullWindowOverlay is only valid on iOS devices.');
    return <IPayView {...props} />;
  }
  return <NativeFullWindowOverlay style={styles.fullWindowOverlay}>{props.children}</NativeFullWindowOverlay>;
}

export default FullWindowOverlay;
