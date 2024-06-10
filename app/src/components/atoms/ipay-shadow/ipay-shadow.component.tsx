import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayView from '../ipay-view/ipay-view.component';
import { IPayShadowProps } from './ipay-shadow.interface';
import styles from './ipay-shadow.styles';

const IPayShadow: React.FC<IPayShadowProps> = ({ testID, variant, children }) => {
  const { colors } = useTheme();
  const dynamicStyles = styles(colors);

  return (
    <IPayView testID={`${testID}-shadow`} style={[dynamicStyles.container, dynamicStyles[variant]]}>
      {children}
    </IPayView>
  );
};

export default IPayShadow;