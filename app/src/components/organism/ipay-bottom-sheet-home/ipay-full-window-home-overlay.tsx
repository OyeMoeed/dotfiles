import React, { PropsWithChildren, ReactNode } from 'react';
import { Platform, StyleProp, ViewStyle } from 'react-native';

// Native components
import { IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import FullWindowOverlayNativeComponent from 'react-native-screens/src/fabric/FullWindowOverlayNativeComponent';
import bottonSheetStyles from './ipay-bottom-sheet-home.style';

const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

const FullWindowOverlay = (props: { children: ReactNode }) => {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);
  if (Platform.OS !== 'ios') {
    return <IPayView {...props} />;
  }
  return <NativeFullWindowOverlay style={styles.fullWindowOverlay}>{props?.children}</NativeFullWindowOverlay>;
};

export default FullWindowOverlay;
