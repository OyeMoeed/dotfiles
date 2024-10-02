import React, { useCallback, useMemo, useRef } from 'react';
import { useStepper } from '@app/hooks';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { isIosOS } from '@app/utilities/constants';
import images from '@assets/images';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from 'react-native';
import { IPayFlatlist } from '@app/components/atoms';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import OnboardingSteps from './onboarding-enum.util';
import OnboardingScreen from './onboarding.component'; // Adjust the import path as needed

export interface OnBoardInterface {
  image: number;
  title: string;
  description: string;
  gradientColors: string[];
  nextText: string;
  type: OnboardingSteps;
  bottomButtonViewStyle?: ViewStyle;
  skipText?: string;
}

const UserOnBoarding: React.FC = () => {
  const { colors } = useTheme();
  const listRef = useRef<FlatList>(null);
  const { handleNext, skip, currentStep } = useStepper({ listRef });

  const listData: OnBoardInterface[] = useMemo(
    () => [
      {
        image: images.cards,
        title: 'ONBOARDING.TITLE_ONBOARDING_ONE',
        description: 'ONBOARDING.DESCRIPTION_ONBOARDING_ONE',
        gradientColors: colors.appGradient.gradientSecondary10,
        skipText: 'ONBOARDING.SKIP',
        nextText: 'COMMON.NEXT',
        type: OnboardingSteps.OpportunitiesStep,
      },

      {
        image: images.money,
        title: 'ONBOARDING.TITLE_ONBOARDING_TWO',
        description: 'ONBOARDING.DESCRIPTION_ONBOARDING_TWO',
        gradientColors: colors.appGradient.gradientSecondary20,
        skipText: 'ONBOARDING.SKIP',
        nextText: 'COMMON.NEXT',
        type: OnboardingSteps.SendAndReceiveStep,
      },
      {
        image: images?.globe,
        title: 'ONBOARDING.TITLE_ONBOARDING_THREE',
        description: 'ONBOARDING.DESCRIPTION_ONBOARDING_THREE',
        gradientColors: colors.appGradient.gradientSecondary30,
        nextText: 'ONBOARDING.GET_STARTED',
        type: OnboardingSteps.PurchasesStep,
        bottomButtonViewStyle: {
          marginBottom: isIosOS ? scaleSize(0) : scaleSize(6),
        } as ViewStyle,
      },
    ],
    [
      colors.appGradient.gradientSecondary10,
      colors.appGradient.gradientSecondary20,
      colors.appGradient.gradientSecondary30,
    ],
  );

  const renderItem = useCallback(
    (info: { item: OnBoardInterface; index: number }) => (
      <OnboardingScreen
        key={info?.index}
        currentStep={currentStep + 1}
        image={info?.item?.image}
        title={info?.item?.title}
        description={info?.item?.description}
        gradientColors={info?.item?.gradientColors}
        onSkip={skip}
        onNext={() => handleNext(info.index + 1)}
        skipText={info?.item?.skipText}
        nextText={info?.item?.nextText}
        type={info?.item?.type}
        bottomButtonViewStyle={info?.item?.bottomButtonViewStyle}
        runAnimation={info?.index === currentStep}
      />
    ),
    [currentStep, handleNext, skip],
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<OnBoardInterface> | null | undefined, index: number) => ({
      length: SCREEN_WIDTH, // You might want to calculate this based on your item size
      offset: SCREEN_WIDTH * index, // Adjust offset based on index
      index,
    }),
    [],
  );
  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      handleNext(nextIndex, true);
    },
    [handleNext],
  );

  return (
    <IPayFlatlist
      ref={listRef}
      data={listData}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      isGHFlatlist={false}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      bounces={false}
    />
  );
};

export default UserOnBoarding;
