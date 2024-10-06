import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { Controller } from 'react-hook-form';
import { FiltersType } from '@app/utilities';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import { SNAP_POINT } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayFilterStyles from './ipay-filter.styles';
import { IPayFilterGiftsProps } from './ipay-filter-gifts.interface';

const IPayFilterGifts = ({ control, giftOccasion, giftStatus }: IPayFilterGiftsProps) => {
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);

  return (
    <>
      <Controller
        control={control}
        name={FiltersType.STATUS}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={giftStatus as ListItem[]}
            selectedValue={value}
            label="SEND_GIFT.STATUS"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            isSearchable
            testID="gift-status-dropdown"
            labelKey="value"
            valueKey="key"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
      <Controller
        control={control}
        name={FiltersType.OCCASION}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={giftOccasion as ListItem[]}
            selectedValue={value}
            label="SEND_GIFT.OCCASION"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            testID="gift-occasion-dropdown"
            labelKey="value"
            valueKey="key"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
    </>
  );
};

export default IPayFilterGifts;
