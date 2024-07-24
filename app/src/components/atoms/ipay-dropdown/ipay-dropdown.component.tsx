import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import {
  selectSelectedValue,
  setData,
  setHeading,
  setSearchable,
  setSize,
  showDropdownSheet,
} from '@app/store/slices/dropdown-slice';
import { RootState, useTypedDispatch } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import { useSelector } from 'react-redux';
import { IPayDropdownComponentProps } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdown: React.FC<IPayDropdownComponentProps> = ({
  data,
  dropdownType,
  label,
  testID,
  isSearchable=false,
  size,
}) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />;
  const selectedValue = useSelector((state: RootState) => selectSelectedValue(state, dropdownType));

  const dispatch = useTypedDispatch();
  const showActionSheet = () => {
    dispatch(setData(data));
    dispatch(showDropdownSheet());
    dispatch(setHeading(dropdownType));
    dispatch(setSearchable(isSearchable));
    dispatch(setSearchable(isSearchable));
    dispatch(setSize(size));
  };

  return (
    <IPayAnimatedTextInput
      testID={testID}
      label={label}
      editable={false}
      value={selectedValue}
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
