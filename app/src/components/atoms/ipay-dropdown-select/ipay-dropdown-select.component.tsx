import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import IPayDropdownSheet from './ipay-dropdown-select-sheet.component';
import { IPayDropdownSelectProps, ListItem } from './ipay-dropdown-select.interface';
import dropdownStyles from './ipay-dropdown-select.styles';

const IPayDropdownSelect: React.FC<IPayDropdownSelectProps> = ({
  data,
  label,
  testID,
  isSearchable = false,
  disabled,
  onSelectListItem,
  labelKey = 'title', // Default key for label
  valueKey = 'id', // Default key for value
  selectedValue,
  errorMessage,
  placeholder,
  customIcon,
  editable,
  containerStyle,
  customSnapPoints,
}) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(
    data.find((item) => item[valueKey] === selectedValue)?.[labelKey] ?? '',
  );

  const listCheckIcon = (
    <IPayIcon
      icon={icons.arrow_circle_down}
      size={20}
      color={disabled ? colors.natural.natural500 : colors.primary.primary500}
    />
  );

  const handlePresentDropdown = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  const handleSelectItem = (item: ListItem) => {
    setSelectedItem(item[labelKey]);
    if (onSelectListItem) {
      onSelectListItem(item[valueKey]);
    }
    setIsVisible(false);
  };

  return (
    <>
      <IPayAnimatedTextInput
        testID={testID}
        label={label}
        editable={editable ?? false}
        value={selectedItem}
        containerStyle={[containerStyle ?? styles.inputContainerStyle, disabled && styles.disabledInput]}
        showRightIcon
        customIcon={customIcon ?? listCheckIcon}
        onClearInput={handlePresentDropdown}
        assistiveText={errorMessage}
        isError={!!errorMessage}
        placeholderTextColor={colors.natural.natural500}
        placeholder={placeholder ?? ''}
      />
      <IPayDropdownSheet
        data={data}
        isSearchable={isSearchable}
        onSelectItem={handleSelectItem}
        selectedItem={selectedItem || ''}
        snapPoints={customSnapPoints ?? ['60%', '90%']}
        heading={label}
        isVisible={isVisible}
        labelKey={labelKey}
        valueKey={valueKey}
        onCloseBottomSheet={() => {
          setIsVisible(false);
        }}
      />
    </>
  );
};

export default IPayDropdownSelect;
