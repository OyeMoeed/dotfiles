// Overlay.tsx
import React from 'react';
import { RNView } from '..';
import styles from './ipay-overlay.styles';

interface IpayOverlayProps {
  testID?: string; // Define testID prop as optional string
}

const IpayOverlay: React.FC<IpayOverlayProps> = ({ testID }) => {
    return <RNView testID={testID} style={styles.overlay} />;
};

export default IpayOverlay;
