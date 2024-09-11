import React from 'react';
import { useStepper } from '@app/hooks';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { scaleSize } from '@app/styles/mixins';
import { isIosOS } from '@app/utilities/constants';
import images from '@assets/images';
import OnboardingSteps from './onboarding-enum.util';
import OnboardingScreen from './onboarding.component'; // Adjust the import path as needed

const UserOnBoarding: React.FC = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const { handleNext, skip, currentView, getStarted } = useStepper();

  return (
    <>
      {currentView === OnboardingSteps.OpportunitiesStep && (
        <OnboardingScreen
          currentStep={1}
          image={images.cards}
          title={'ONBOARDING.TITLE_ONBOARDING_ONE'}
          description={'ONBOARDING.DESCRIPTION_ONBOARDING_ONE'}
          gradientColors={colors.appGradient.gradientSecondary10}
          onSkip={skip}
          onNext={() => handleNext(OnboardingSteps.SendAndReceiveStep)}
          skipText={'ONBOARDING.SKIP'}
          nextText={'COMMON.NEXT'}
          type={OnboardingSteps.OpportunitiesStep}
        />
      )}
      {currentView === OnboardingSteps.SendAndReceiveStep && (
        <OnboardingScreen
          currentStep={2}
          image={images.money}
          title={'ONBOARDING.TITLE_ONBOARDING_TWO'}
          description={'ONBOARDING.DESCRIPTION_ONBOARDING_TWO'}
          gradientColors={colors.appGradient.gradientSecondary20}
          onSkip={skip}
          onNext={() => handleNext(OnboardingSteps.PurchasesStep)}
          skipText={'ONBOARDING.SKIP'}
          nextText={'COMMON.NEXT'}
          type={OnboardingSteps.SendAndReceiveStep}
        />
      )}

      {currentView === OnboardingSteps.PurchasesStep && (
        <OnboardingScreen
          currentStep={3}
          image={images.globe}
          title={'ONBOARDING.TITLE_ONBOARDING_THREE'}
          description={'ONBOARDING.DESCRIPTION_ONBOARDING_THREE'}
          gradientColors={colors.appGradient.gradientSecondary30}
          onSkip={skip}
          onNext={() => getStarted()}
          nextText={'ONBOARDING.GET_STARTED'}
          type={OnboardingSteps.PurchasesStep}
          bottomButtonViewStyle={{
            marginBottom: isIosOS ? scaleSize(0) : scaleSize(6),
          }}
        />
      )}
    </>
  );
};

export default UserOnBoarding;
