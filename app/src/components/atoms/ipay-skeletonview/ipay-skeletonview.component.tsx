// IPaySkeletonView.tsx
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import IPayView from '../ipay-view/ipay-view.component';
import { IPaySkeletonViewProps } from './ipay-skeletonview.interface';

const IPaySkeletonView: React.FC<IPaySkeletonViewProps> = ({ testID, children, containerStyle, isLoading }) => (
  <IPayView testID={`${testID}-skeleton-view`} style={containerStyle}>
    <Skeleton testID={`${testID}-skeleton`} show={isLoading}>
      {children}
    </Skeleton>
  </IPayView>
);

export default IPaySkeletonView;
