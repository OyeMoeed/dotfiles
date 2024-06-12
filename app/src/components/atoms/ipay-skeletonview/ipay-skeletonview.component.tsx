// IPaySkeletonView.tsx
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { IPaySkeletonViewProps } from './ipay-skeletonview.interface';
import IPayView from '../ipay-view/ipay-view.component';

const IPaySkeletonView: React.FC<IPaySkeletonViewProps> = ({ children, containerStyle, isLoading }) => (
  <IPayView style={containerStyle}>
    <Skeleton show={isLoading}>{children}</Skeleton>
  </IPayView>
);

export default IPaySkeletonView;
