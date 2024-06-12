import React, { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';

// Native components
import { IPayView } from '@app/components/atoms';
import FullWindowOverlayNativeComponent from 'react-native-screens';
import bottonSheetStyles from './ipay-bottom-sheet.style';

const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

const FullWindowOverlay = (props: { children: ReactNode }) => {
  const styles = bottonSheetStyles();
  if (Platform.OS !== 'ios') {
    return <IPayView {...props} />;
  }
  return <NativeFullWindowOverlay style={styles.fullWindowOverlay}>{props.children}</NativeFullWindowOverlay>;
};

export default FullWindowOverlay;
