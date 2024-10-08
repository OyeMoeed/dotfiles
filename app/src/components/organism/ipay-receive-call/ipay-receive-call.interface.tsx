import { ActivationMethods } from '@app/network/services/international-transfer/activate-international-beneficiary';
import { ApiResponseStatusType } from '@app/utilities/enums.util';

interface IPayReceiveCallProps {
  testID?: string;
  makeTransfer?: boolean;
  guideToReceiveCall: GuideStep[];
  activateInternationalBeneficiary: (activation: ActivationMethods) => Promise<ApiResponseStatusType | void>;
  hanldePageNavigation?: () => void;
}

interface GuideStep {
  title: string;
  stepNumber: string;
  pressNumber?: string;
  isContactList?: boolean;
  extraText?: string;
}

export { GuideStep, IPayReceiveCallProps };
