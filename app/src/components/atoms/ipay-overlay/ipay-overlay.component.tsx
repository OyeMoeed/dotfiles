// Overlay.tsx
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import overlayStyles from './ipay-overlay.styles';
import { IPayOverlayProps } from './ipay-overly.interface';
import IPayPressable from '../ipay-pressable/ipay-pressable.component';

const IPayOverlay: React.FC<IPayOverlayProps> = ({ testID, style, onPress }) => {
  const { colors } = useTheme();
  const styles = overlayStyles(colors);
  return <IPayPressable onPress={onPress} testID={`${testID}-overlay`} style={[styles.overlay, style]} />;
};

export default IPayOverlay;
