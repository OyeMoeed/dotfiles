import IPayDropdownSelect from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.component';
import { Controller } from 'react-hook-form';
import { FiltersType } from '@app/utilities';
import { ListItem } from '@app/components/atoms/ipay-dropdown-select/ipay-dropdown-select.interface';
import { SNAP_POINT } from '@app/constants/constants';
import useTheme from '@app/styles/hooks/theme.hook';
import IPayFilterStyles from './ipay-filter.styles';

const IPayMusanedFilter = ({ control, laborerList, salaryTypes }) => {
  const { colors } = useTheme();
  const styles = IPayFilterStyles(colors);

  return (
    <>
      <Controller
        control={control}
        name={FiltersType.LABORER_NAME}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={laborerList as ListItem[]}
            selectedValue={value}
            label="MUSANED.LABORER_NAME"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            isSearchable
            testID="laborer-name-dropdown"
            labelKey="text"
            valueKey="id"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.MEDIUM_LARGE}
          />
        )}
      />
      <Controller
        control={control}
        name={FiltersType.SALARY_TYPE}
        render={({ field: { onChange, value } }) => (
          <IPayDropdownSelect
            data={salaryTypes as ListItem[]}
            selectedValue={value}
            label="MUSANED.SALARY_TYPE"
            onSelectListItem={(selectedItem: string) => {
              onChange(selectedItem);
            }}
            testID="salary-type-dropdown"
            labelKey="text"
            valueKey="type"
            containerStyle={styles.inputContainerStyle}
            customSnapPoints={SNAP_POINT.SMALL}
          />
        )}
      />
    </>
  );
};

export default IPayMusanedFilter;
