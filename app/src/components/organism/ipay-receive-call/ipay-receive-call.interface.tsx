import { ApiResponseStatusType } from '@app/utilities/enums.util';

interface IPayReceiveCallProps {
  testID?: string;
  makeTransfer?: boolean;
  guideToReceiveCall: GuideStep[];
  activateInternationalBeneficiary: () => Promise<ApiResponseStatusType | ''>;
  hanldePageNavigation: () => void;
}

interface GuideStep {
  title: string;
  stepNumber: string;
  pressNumber?: string;
  isContactList?: boolean;
  extraText?: string;
}

export { GuideStep, IPayReceiveCallProps };
