/* eslint-disable react/no-array-index-key */
import { useCallback } from 'react';
import { MotiView } from 'moti';
import IPaySkeletonView from '@app/components/atoms/ipay-skeletonview/ipay-skeletonview.component';
import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';
import useTheme from '@app/styles/hooks/theme.hook';
import transactionItemStyles from './ipay-skeleton-loader.style';
import { IPaySkeletonLoaderConfig, IPaySkeletonBuilderProps } from './ipay-skeleton-loader.interface';
import IPAY_SKELETON_FACTORY from './ipay-skeleton-loader.factory';

const IPaySkeletonBuilder = ({ variation, isLoading }: IPaySkeletonBuilderProps) => {
  const { colors } = useTheme();
  const styles = transactionItemStyles(IPAY_SKELETON_FACTORY(colors)?.[variation]?.space);

  const skeletonBuilder = useCallback((sklProps?: Array<IPaySkeletonLoaderConfig>) => {
    if (sklProps?.length) {
      return (
        <MotiView>
          {sklProps.map((item) =>
            Array(item?.repeat)
              ?.fill(null)
              ?.map((_, index) => (
                <Skeleton.Group show key={`IPay-skeleton-loader-${index}`}>
                  <IPaySkeletonView isLoading {...item} />
                  <View style={{ height: item?.space || 0 }} />
                </Skeleton.Group>
              )),
          )}
        </MotiView>
      );
    }
    return null;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        {Array(IPAY_SKELETON_FACTORY(colors)?.[variation]?.repeat)
          .fill(null)
          .map((_, idx) => (
            <MotiView
              style={[styles.container, IPAY_SKELETON_FACTORY(colors)?.[variation]?.overrideStyle]}
              key={`loader-${idx}`}
            >
              {skeletonBuilder(IPAY_SKELETON_FACTORY(colors)?.[variation]?.left)}
              {skeletonBuilder(IPAY_SKELETON_FACTORY(colors)?.[variation]?.center)}
              {skeletonBuilder(IPAY_SKELETON_FACTORY(colors)?.[variation]?.right)}
            </MotiView>
          ))}
      </View>
    );
  }
  return <View />;
};

export default IPaySkeletonBuilder;
