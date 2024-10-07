import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { Controller } from 'react-hook-form';
import { FiltersType } from '@app/utilities';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import useTheme from '@app/styles/hooks/theme.hook';
import { SNAP_POINT } from '@app/constants/constants';
import IPayFilterStyles from './ipay-filter.styles';
import { IPayFilterTransactionTypesProps } from './ipay-filter-transaction-types.interface';

const IPayFilterTransactionTypes = ({
  control,
  transactionTypes,
  handleSelectType,
}: IPayFilterTransactionTypesProps) => {
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);
  return (
    <Controller
      control={control}
      name={FiltersType.TRANSACTION_TYPE}
      render={({ field: { onChange, value } }) => (
        <IPayDropdownSelect
          data={transactionTypes as ListItem[]}
          selectedValue={value}
          label="TRANSACTION_HISTORY.TRANSACTION_TYPE"
          onSelectListItem={(selectedItem: string) => {
            handleSelectType(selectedItem);
            onChange(selectedItem);
          }}
          testID="transactionTypes-dropdown"
          labelKey="value"
          valueKey="key"
          containerStyle={styles.inputContainerStyle}
          customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
        />
      )}
    />
  );
};

export default IPayFilterTransactionTypes;
