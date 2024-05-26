// IPaySkeletonView.tsx
import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { IPaySkeletonViewProps } from './ipay-skeletonview.interface';

const IPaySkeletonView: React.FC<IPaySkeletonViewProps> = ({ children, containerStyle, isLoading }) => {
  return (
    <View style={containerStyle}>
      <Skeleton show={isLoading}>{children}</Skeleton>
    </View>
  );
};

export default IPaySkeletonView;
