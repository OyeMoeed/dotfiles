import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { IPayRHFAnimatedTextInput as IPayAnimatedTextInput } from '@app/components/molecules';
import { initializeDropdown, selectSelectedValue } from '@app/store/slices/dropdown-slice';
import { RootState, useTypedDispatch } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IPayDropdownComponentProps } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdown: React.FC<IPayDropdownComponentProps> = ({
  data,
  dropdownType,
  label,
  testID,
  isSearchable = false,
  size,
  name,
}) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />;
  const selectedValue = useSelector((state: RootState) => selectSelectedValue(state, dropdownType));
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });
  const dispatch = useTypedDispatch();
  const showActionSheet = () => {
    dispatch(
      initializeDropdown({
        data,
        heading: dropdownType,
        isSearchable,
        size,
      }),
    );
  };
  useEffect(() => {
    field.onChange(selectedValue);
  }, [selectedValue]);
  return (
    <IPayAnimatedTextInput
      name={name}
      testID={testID}
      label={label}
      editable={false}
      value={field.value}
      containerStyle={styles.inputContainerStyle}
      showRightIcon
      customIcon={listCheckIcon}
      onClearInput={() => {
        showActionSheet();
      }}
    />
  );
};

export default IPayDropdown;
