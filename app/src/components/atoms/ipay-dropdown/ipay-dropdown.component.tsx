import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { setdata, showDropdownSheet } from '@app/store/slices/dropdown-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPayDropdownComponentProps, IPayDropdownComponentRef } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdown: React.ForwardRefRenderFunction<IPayDropdownComponentRef, IPayDropdownComponentProps> = (
  { testID, style, list, onSelectListItem },
  ref,
) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />;
  const localizationText = useLocalization();

  const [selectedListItem, setSelectedListItem] = useState<string>('');

  const onPressListItem = (item: string) => {
    setSelectedListItem(item);
    if (onSelectListItem) onSelectListItem(item);
  };

  const dispatch = useDispatch();
  const showActionSheet = () => {
    dispatch(setdata({ isDropdownVisible: true, data: list }));
    dispatch(showDropdownSheet());
  };
  return (
    <IPayAnimatedTextInput
      label={'label'}
      editable={false}
      value={''}
      containerStyle={styles.inputContainerStyle}
      showRightIcon
      customIcon={listCheckIcon}
      onClearInput={() => {
        showActionSheet();
      }}
      onChangeText={() => {}}
    />
  );
};

export default React.forwardRef(IPayDropdown);
