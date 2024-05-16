import React from 'react';
import { View } from 'react-native';
import styles from './rn-view.style';
import { RNViewProps } from './rn-view.interface';

/**
 * A container component to layout and arrange child components.
 * @param {RNViewProps} props - The props for the RNView component.
 * @returns {JSX.Element} - The rendered component.
 */
const RNView: React.FC<RNViewProps> = ({ testID, children, style }: RNViewProps): JSX.Element => {
  return (
    <View testID={testID} style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default RNView;
