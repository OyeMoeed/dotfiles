// Overlay.tsx
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { IPayPressable } from '..';
import overlayStyles from './ipay-overlay.styles';

interface IPayOverlayProps {
  testID?: string; // Define testID prop as optional string
  onPress?: () => void;
}

const IPayOverlay: React.FC<IPayOverlayProps> = ({ testID, onPress }) => {
  const { colors } = useTheme();
  const styles = overlayStyles(colors);

  return <IPayPressable onPress={onPress} testID={`${testID}-overlay`} style={styles.overlay} />;
};

export default IPayOverlay;
