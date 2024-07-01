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
          title={localizationText.title_onboarding_one}
          description={localizationText.description_onboarding_one}
          gradientColors={colors.appGradient.gradientSecondary10}
          onSkip={skip}
          onNext={() => handleNext(OnboardingSteps.SendAndReceiveStep)}
          skipText={localizationText.skip}
          nextText={localizationText.next}
          type={OnboardingSteps.OpportunitiesStep}
        />
      )}
      {currentView === OnboardingSteps.SendAndReceiveStep && (
        <OnboardingScreen
          currentStep={2}
          image={images.money}
          title={localizationText.title_onboarding_two}
          description={localizationText.description_onboarding_two}
          gradientColors={colors.appGradient.gradientSecondary20}
          onSkip={skip}
          onNext={() => handleNext(OnboardingSteps.PurchasesStep)}
          skipText={localizationText.skip}
          nextText={localizationText.next}
          type={OnboardingSteps.SendAndReceiveStep}
        />
      )}

      {currentView === OnboardingSteps.PurchasesStep && (
        <OnboardingScreen
          currentStep={3}
          image={images.globe}
          title={localizationText.title_onboarding_three}
          description={localizationText.description_onboarding_three}
          gradientColors={colors.appGradient.gradientSecondary30}
          onSkip={skip}
          onNext={() => getStarted()}
          nextText={localizationText.get_started}
          type={OnboardingSteps.PurchasesStep}
        />
      )}
    </>
  );
};

export default UserOnBoarding;
