interface IPayActivationCallProps {
  testID?: string;
  contactList: ContactItem[];
}
interface ContactItem {
  title: string;
  phone_number: string;
}

export { ContactItem, IPayActivationCallProps };
