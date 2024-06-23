import React, { PropsWithChildren, ReactNode } from 'react';
import { Dimensions, Platform, StyleProp, ViewStyle } from 'react-native';
const width = Dimensions.get('screen').width;

// Native components
import { IPayView } from '@app/components/atoms';
import FullWindowOverlayNativeComponent from 'react-native-screens/src/fabric/FullWindowOverlayNativeComponent';
import bottonSheetStyles from './ipay-bottom-sheet-home.style';
import useTheme from '@app/styles/hooks/theme.hook';
const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

function FullWindowOverlay(props: { children: ReactNode }) {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);
  if (Platform.OS !== 'ios') {
    console.warn('Using FullWindowOverlay is only valid on iOS devices.');
    return <IPayView {...props} />;
  }
  return (
    <NativeFullWindowOverlay style={styles.fullWindowOverlay}>
      {props.children}
    </NativeFullWindowOverlay>
  );
}

export default FullWindowOverlay;
