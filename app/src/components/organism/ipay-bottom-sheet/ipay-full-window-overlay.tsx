import React, { PropsWithChildren, ReactNode } from 'react';
import { Dimensions, Platform, StyleProp, ViewStyle } from 'react-native';
const width = Dimensions.get('screen').width;

// Native components
import { IPayView } from '@app/components/atoms';
import FullWindowOverlayNativeComponent from '../../../../../node_modules/react-native-screens/src/fabric/FullWindowOverlayNativeComponent';
import useTheme from '@app/styles/hooks/theme.hook';
import bottonSheetStyles from './ipay-bottom-sheet.style';
const NativeFullWindowOverlay: React.ComponentType<
  PropsWithChildren<{
    style: StyleProp<ViewStyle>;
  }>
> = FullWindowOverlayNativeComponent as any;

function FullWindowOverlay(props: { children: ReactNode }) {
  const { colors } = useTheme();
  const styles = bottonSheetStyles(colors);
  if (Platform.OS !== 'ios') {
    return <IPayView {...props} />;
  }

  return (
    <NativeFullWindowOverlay style={styles.fullWindowOverlay}>
      {props.children}
    </NativeFullWindowOverlay>
  );
}

export default FullWindowOverlay;
