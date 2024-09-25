/* eslint-disable react/jsx-props-no-spreading */
// IPaySkeletonView.tsx
import { Skeleton } from 'moti/skeleton';
import React, { useMemo } from 'react';
import { useTypedSelector } from '@app/store/store';
import images from '@app/assets/images';
import { scale, verticalScale } from 'react-native-size-matters';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPaySkeletonViewProps, SkeletonLoaderTypes } from './ipay-skeletonview.interface';
import IPayImage from '../ipay-image/ipay-image.component';

const IPaySkeletonView: React.FC<IPaySkeletonViewProps> = (props) => {
  const { isLoading, type } = props;
  const { appTheme } = useTypedSelector((state) => state.themeReducer);
  const colorMode = useMemo(() => (appTheme === 'dark' ? 'dark' : 'light'), [appTheme]);
  const { colors } = useTheme();

  switch (type) {
    case SkeletonLoaderTypes.IMAGE:
      return (
        <IPayImage
          image={images.imagePlaceholder}
          style={{
            width: props?.width || scale(64),
            height: props?.height || scale(64),
            tintColor: colors.natural.natural300,
          }}
        />
      );
    case SkeletonLoaderTypes.TITLE:
      return (
        <Skeleton show={isLoading} colorMode={colorMode} width={scale(120)} height={verticalScale(15)} {...props} />
      );

    case SkeletonLoaderTypes.TEXT:
    default:
      return (
        <Skeleton show={isLoading} colorMode={colorMode} width={scale(100)} height={verticalScale(10)} {...props} />
      );
  }
};

export default IPaySkeletonView;
