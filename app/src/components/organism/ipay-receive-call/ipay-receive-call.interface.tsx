import { ApiResponseStatusType } from '@app/utilities/enums.util';

interface IPayReceiveCallProps {
  testID?: string;
  guideToReceiveCall: GuideStep[];
  activateInternationalBeneficiary: () => Promise<ApiResponseStatusType | void>;
  hanldePageNavigation:()=>void
}

interface GuideStep {
  title: string;
  stepNumber: string;
  pressNumber?: string;
  isContactList?: boolean;
  extraText?: string;
}

export { GuideStep, IPayReceiveCallProps };
