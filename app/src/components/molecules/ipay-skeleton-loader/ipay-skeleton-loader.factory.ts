import { SkeletonLoaderTypes } from '@app/components/atoms/ipay-skeletonview/ipay-skeletonview.interface';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { SCALE_34 } from '@app/styles/spacing.const';
import type { Colors } from '@app/styles/colors.const';
import { IPaySKeletonBuilderTypes, IPaySkeletonEnums } from './ipay-skeleton-loader.interface';

type IPaySkeletonFactoryType = (colors: Colors) => { [key in IPaySkeletonEnums]: IPaySKeletonBuilderTypes };

const IPAY_SKELETON_FACTORY: IPaySkeletonFactoryType = (colors: Colors) => ({
  [IPaySkeletonEnums.TRANSACTION_LIST]: {
    overrideStyle: {
      paddingLeft: moderateScale(16),
      paddingRight: moderateScale(24),
      paddingVertical: moderateScale(16),
      borderRadius: moderateScale(28),
      backgroundColor: colors.natural.natural0,
    },
    repeat: 3,
    left: [
      {
        type: SkeletonLoaderTypes.IMAGE,
        width: SCALE_34,
        height: SCALE_34,
      },
    ],
    center: [
      {
        type: SkeletonLoaderTypes.TEXT,
        repeat: 2,
        space: moderateScale(4),
        width: 200,
      },
    ],
    space: verticalScale(8),
  },
});

export default IPAY_SKELETON_FACTORY;
