// Overlay.tsx
import React from 'react';
import useTheme from '@app/styles/hooks/theme.hook';
import overlayStyles from './ipay-overlay.styles';
import { IPayView } from '..';

interface IpayOverlayProps {
  testID?: string; // Define testID prop as optional string
}


const IpayOverlay: React.FC<IpayOverlayProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = overlayStyles(colors);
  return <IPayView testID={`${testID}-overlay`} style={styles.overlay} />;
};

export default IpayOverlay;
