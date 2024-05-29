// IPaySkeletonView.tsx
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View } from 'react-native';
import { IPaySkeletonViewProps } from './ipay-skeletonview.interface';

const IPaySkeletonView: React.FC<IPaySkeletonViewProps> = ({ children, containerStyle, isLoading }) => (
  <View style={containerStyle}>
    <Skeleton show={isLoading}>{children}</Skeleton>
  </View>
);

export default IPaySkeletonView;
