import { useState, useEffect } from 'react';
import { PermissionsStatus, PermissionTypes } from '@app/enums';
import Contacts, { Contact } from 'react-native-contacts';
import { REGEX } from '@app/constants/app-validations';
import usePermissions from './permissions.hook';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { permissionStatus } = usePermissions(PermissionTypes.CONTACTS, true);

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

  useEffect(() => {
    (async () => {
      if (permissionStatus === PermissionsStatus.GRANTED) {
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
          const listWithUniqueId: any = saudiNumbers.map((item: Contact) => ({
            ...item,
            givenName: `${item.givenName}${item.middleName ? ` ${item.middleName}` : ''}${item.familyName ? ` ${item.familyName}` : ''}`,
            recordID: `${item?.recordID}#${item?.phoneNumbers[0]?.number}`,
          }));
          setContacts(listWithUniqueId);
        });
      }
    })();
  }, [permissionStatus]);

  return contacts;
};

export default useContacts;
