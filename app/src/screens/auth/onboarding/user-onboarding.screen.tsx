import { useStepper } from '@app/hooks/stepper.hook';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import images from '@assets/images';
import { OnboardingSteps } from './onboarding-enum.util';
import OnboardingScreen from './onboarding.component'; // Adjust the import path as needed

const UserOnBoarding = () => {
  const { colors } = useTheme();
  const localizationText = useLocalization();
  const { handleNext, skip, currentView, getStarted } = useStepper();

  return (
    <>
      {currentView === OnboardingSteps.OpportunitiesStep && (
        <OnboardingScreen
          currentStep={1}
          image={images.cards}
          title={localizationText.ONBOARDING.TITLE_ONBOARDING_ONE}
          description={localizationText.ONBOARDING.DESCRIPTION_ONBOARDING_ONE}
          gradientColors={colors.appGradient.gradientSecondary10}
          onSkip={skip}
          onNext={() => handleNext(OnboardingSteps.SendAndReceiveStep)}
          skipText={localizationText.ONBOARDING.SKIP}
          nextText={localizationText.next}
          type={OnboardingSteps.OpportunitiesStep}
        />
      )}
      {currentView === OnboardingSteps.SendAndReceiveStep && (
        <OnboardingScreen
          currentStep={2}
          image={images.money}
          title={localizationText.ONBOARDING.TITLE_ONBOARDING_TWO}
          description={localizationText.ONBOARDING.DESCRIPTION_ONBOARDING_TWO}
          gradientColors={colors.appGradient.gradientSecondary20}
          onSkip={skip}
          onNext={() => handleNext(OnboardingSteps.PurchasesStep)}
          skipText={localizationText.ONBOARDING.SKIP}
          nextText={localizationText.next}
          type={OnboardingSteps.SendAndReceiveStep}
        />
      )}

      {currentView === OnboardingSteps.PurchasesStep && (
        <OnboardingScreen
          currentStep={3}
          image={images.globe}
          title={localizationText.ONBOARDING.TITLE_ONBOARDING_THREE}
          description={localizationText.ONBOARDING.DESCRIPTION_ONBOARDING_THREE}
          gradientColors={colors.appGradient.gradientSecondary30}
          onSkip={skip}
          onNext={() => getStarted()}
          nextText={localizationText.ONBOARDING.GET_STARTED}
          type={OnboardingSteps.PurchasesStep}
        />
      )}
    </>
  );
};

export default UserOnBoarding;
