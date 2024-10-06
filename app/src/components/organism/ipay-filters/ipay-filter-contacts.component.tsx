import { useCallback, useMemo } from 'react';
import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { Controller } from 'react-hook-form';
import { FiltersType } from '@app/utilities';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import { SNAP_POINT } from '@app/constants/constants';
import { IPayIcon } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import icons from '@app/assets/icons';
import IPayFilterStyles from './ipay-filter.styles';
import { IPayFilterContactsProps } from './ipay-filter-contacts.interface';

const IPayFilterContacts = ({ control, contacts }: IPayFilterContactsProps) => {
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);
  const onContactsList = useCallback(
    () =>
      contacts?.map((item: any, index: any) => ({
        id: index,
        key: item?.phoneNumbers[0]?.number,
        displayValue: item?.givenName,
        value: item?.phoneNumbers[0]?.number,
        description: item?.phoneNumbers[0]?.number,
      })),
    [contacts],
  );

  const mappedContacts = useMemo(() => onContactsList(), [onContactsList]);
  const searchIcon = <IPayIcon icon={icons.user_filled} size={20} color={colors.primary.primary500} />;

  return (
    <Controller
      control={control}
      name={FiltersType.CONTACT_NUMBER}
      render={({ field: { onChange, value } }) => (
        <IPayDropdownSelect
          data={mappedContacts as ListItem[]}
          selectedValue={value}
          label="WALLET_TO_WALLET.CONTACT_NUMBER_OR_NAME"
          onSelectListItem={(selectedItem: string) => onChange(selectedItem)}
          testID="contacts-dropdown"
          labelKey="displayValue"
          valueKey="value"
          customIcon={searchIcon}
          editable
          containerStyle={styles.inputContainerStyle}
          customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
        />
      )}
    />
  );
};

export default IPayFilterContacts;
