interface IPayReceiveCallProps {
  testID?: string;
  guideToReceiveCall: GuideStep[];
}

interface GuideStep {
  title: string;
  stepNumber: string;
  pressNumber?: string;
  isContactList?: boolean;
  extraText?: string;
}

export { GuideStep, IPayReceiveCallProps };
