import { ActivationMethods } from '@app/network/services/international-transfer/activate-international-beneficiary';

interface IPayActivationCallProps {
  testID?: string;
  contactList: ContactItem[];
  guideStepsToCall: GuideStep[];
  close: (text: string) => void;
  onPressActivateBeneficiary?: (ac: ActivationMethods) => Promise<void>;
}
interface ContactItem {
  title: string;
  phone_number: string;
}
interface GuideStep {
  title: string;
  stepNumber: string;
  pressNumber?: string;
  isContactList?: boolean;
  extraText?: string;
}

export { ContactItem, GuideStep, IPayActivationCallProps };
