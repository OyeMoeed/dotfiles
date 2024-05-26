// Overlay.tsx
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayView from '../view/ipay-view.component';
import overlayStyles from './ipay-overlay.styles';

interface IPayOverlayProps {
  testID?: string; // Define testID prop as optional string
}

const IPayOverlay: React.FC<IPayOverlayProps> = ({ testID }) => {
  const { colors } = useTheme();
  const styles = overlayStyles(colors);
  return <IPayView testID={`${testID}-overlay`} style={styles.overlay} />;
};

export default IPayOverlay;
