import React, { JSX } from 'react';
import { View } from 'react-native';
import { IPayViewProps } from './ipay-view.interface';
import styles from './ipay-view.style';

/**
 * A container component to layout and arrange child components.
 * @param {IPayViewProps} props - The props for the IPayView component.
 * @returns {JSX.Element} - The rendered component.
 */
const IPayView: React.FC<IPayViewProps> = ({ testID, children, style, ...props }: IPayViewProps): JSX.Element => (
  <View testID={`${testID}-base-view`} style={[styles.container, style]} {...props}>
    {children}
  </View>
);

export default IPayView;
