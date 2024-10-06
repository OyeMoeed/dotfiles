import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { Controller } from 'react-hook-form';
import { FiltersType } from '@app/utilities';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayFilterStyles from './ipay-filter.styles';
import { IPayFilterCardsProps } from './ipay-filter-cards.interface';

const IPayFilterCards = ({ control, label, cards }: IPayFilterCardsProps) => {
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);

  return (
    <Controller
      control={control}
      name={FiltersType.CARD}
      render={({ field: { onChange, value } }) => (
        <IPayDropdownSelect
          data={cards as ListItem[]}
          selectedValue={value}
          label={label}
          onSelectListItem={(selectedItem: string) => {
            onChange(selectedItem);
          }}
          isSearchable={false}
          testID="cards-dropdown"
          labelKey="value"
          valueKey="key"
          containerStyle={styles.inputContainerStyle}
        />
      )}
    />
  );
};

export default IPayFilterCards;
