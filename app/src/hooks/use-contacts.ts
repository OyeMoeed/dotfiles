import { useState, useCallback } from 'react';
import Contacts, { Contact } from 'react-native-contacts';
import { REGEX } from '@app/constants/app-validations';

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const formatMobileNumber = (mobile: string): string => {
    const mobileWithoutSpaces = mobile.replace(/ /g, '');
    if (REGEX.longSaudiMobileNumber.test(mobileWithoutSpaces)) {
      return `0${mobileWithoutSpaces.substr(3)}`;
    }
    if (REGEX.longSaudiMobileNumber2.test(mobileWithoutSpaces)) {
      return `0${mobileWithoutSpaces.substr(4)}`;
    }
    if (REGEX.longSaudiMobileNumber3.test(mobileWithoutSpaces)) {
      return `0${mobileWithoutSpaces.substr(5)}`;
    }
    return mobileWithoutSpaces;
  };

  const onPermissionGranted = useCallback(async () => {
    await Contacts.getAll().then((contactsList: Contact[]) => {
      const flattenedArray = contactsList.reduce((acc: Contact[], obj) => {
        const mappedValues = obj.phoneNumbers.map((item) => ({
          ...obj,
          phoneNumbers: [
            {
              ...item,
              number: formatMobileNumber(item.number),
            },
          ],
        }));
        return acc.concat(mappedValues);
      }, []);
      const saudiNumbers = flattenedArray.filter((item: Contact) => {
        const isSaudiNumber = REGEX.saudiMobileNumber.test(item?.phoneNumbers[0]?.number);
        return isSaudiNumber;
      });
      const listWithUniqueId = saudiNumbers.map((item: Contact) => ({
        ...item,
        givenName: `${item.givenName}${item.middleName ? ` ${item.middleName}` : ''}${item.familyName ? ` ${item.familyName}` : ''}`,
        recordID: `${item?.recordID}#${item?.phoneNumbers[0]?.number}`,
      }));
      setContacts(listWithUniqueId);
    });
  }, []);

  return { contacts, onPermissionGranted };
};

export default useContacts;
