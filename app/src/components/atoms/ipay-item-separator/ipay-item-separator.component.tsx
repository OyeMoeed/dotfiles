import React from 'react';
import IPayView from '../ipay-view/ipay-view.component';
import { IPayItemSeparatorProps } from './ipay-item-separator.interface';
import styles from './ipay-item-separator.style';

const IPayItemSeparator: React.FC<IPayItemSeparatorProps> = ({ testID, itemSeparatorStyle }) => {
  return <IPayView testID={`${testID}-item-separator`} style={[styles.container, itemSeparatorStyle]} />;
};

export default IPayItemSeparator;
