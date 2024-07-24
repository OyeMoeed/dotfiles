import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import { setData, setHeading, showDropdownSheet } from '@app/store/slices/dropdown-slice';
import { RootState } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPayDropdownComponentProps, IPayDropdownComponentRef } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdown: React.ForwardRefRenderFunction<IPayDropdownComponentRef, IPayDropdownComponentProps> = ({
  testID,
  data,
  label,
  dropdownType,
}) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />;
  const selectedType = useSelector((state: RootState) => state.dropdownReducer.selectedValue);
  const dispatch = useDispatch();
  const showActionSheet = () => {
    dispatch(setData(data));
    dispatch(showDropdownSheet());
  };

  useEffect(() => {
    dispatch(setHeading(dropdownType));
  }, []);

  return (
    <IPayAnimatedTextInput
      testID={testID}
      label={label}
      editable={false}
      value={selectedType}
      containerStyle={styles.inputContainerStyle}
      showRightIcon
      customIcon={listCheckIcon}
      onClearInput={() => {
        showActionSheet();
      }}
    />
  );
};

export default React.forwardRef(IPayDropdown);
