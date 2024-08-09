interface IPayActivationCallProps {
  testID?: string;
  contactList: ContactItem[];
  guideStepsToCall: GuideStep[];
  close: (text: string) => void;
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
