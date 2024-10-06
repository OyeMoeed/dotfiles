import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { Controller } from 'react-hook-form';
import { FiltersType } from '@app/utilities';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import { SNAP_POINT } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayFilterStyles from './ipay-filter.styles';
import { IPayFilterBeneficiariesProps } from './ipay-filter-beneficiaries.interface';

const IPayFilterBeneficiaries = ({ control, beneficiaryData, bankList }: IPayFilterBeneficiariesProps) => {
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);

  return (
    <>
      <Controller
        control={control}
        name={FiltersType.BENEFICIARY_NAME}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={beneficiaryData as ListItem[]}
            selectedValue={value}
            label="TRANSACTION_HISTORY.BENEFICIARY_NAME"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            isSearchable
            testID="beneficiary-name-dropdown"
            labelKey="value"
            valueKey="key"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
      <Controller
        control={control}
        name={FiltersType.BANK_NAME_LIST}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={bankList as ListItem[]}
            selectedValue={value}
            label="TRANSACTION_HISTORY.BANK_NAME"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            testID="beneficiary-banks-dropdown"
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

export default IPayFilterBeneficiaries;
