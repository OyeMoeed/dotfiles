interface IPayActivationCallProps {
  testID?: string;
  contactList: ContactItem[];
  guideStepsToCall: GuideStep[];
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
}

export { ContactItem, GuideStep, IPayActivationCallProps };
