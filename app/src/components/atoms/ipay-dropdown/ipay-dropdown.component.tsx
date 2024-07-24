import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayAnimatedTextInput } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import { showDropdownSheet } from '@app/store/slices/dropdown-slice';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPayDropdownComponentProps, IPayDropdownComponentRef, ListItem } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdown: React.ForwardRefRenderFunction<IPayDropdownComponentRef, IPayDropdownComponentProps> = (
  { testID, style, list, onSelectListItem, searchText, setSearchText },
  ref,
) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const listCheckIcon = <IPayIcon icon={icons.arrow_circle_down} size={18} color={colors.primary.primary500} />;
  const localizationText = useLocalization();
  const [filteredListItems, setFilteredListItems] = useState<ListItem[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string>('');

  const resetSelectedListItem = () => {
    setSelectedListItem('');
  };

  const resetSelectedCity = () => {
    setSelectedListItem('');
    setSearchText('');
    setFilteredListItems(list || []);
  };

  const onSearchChangeText = (text: string) => {
    setSearchText(text);
  };

  const filterListItems = () => {
    if (!searchText.trim()) {
      setFilteredListItems(list || []); // Reset to original list if search text is empty
    } else {
      const lowerSearchText = searchText.trim().toLowerCase();
      const filtered = list?.filter((item) => item.title.toLowerCase().includes(lowerSearchText)) || [];
      setFilteredListItems(filtered);
    }
  };

  // Update filteredListItems whenever list or searchText changes
  useEffect(() => {
    filterListItems();
  }, [list, searchText]);

  const onPressListItem = (item: string) => {
    setSelectedListItem(item);
    if (onSelectListItem) onSelectListItem(item);
  };

  const renderListItems = ({ item }: { item: ListItem }) => (
    <IPayPressable style={styles.titleView} onPress={() => onPressListItem(item?.title)}>
      <IPayFootnoteText text={item.title} />
      {selectedListItem === item.title && (
        <IPayIcon icon={icons.tick_check_mark_default} size={22} color={colors.primary.primary500} />
      )}
    </IPayPressable>
  );

  const renderNoResults = () => (
    <IPayView style={styles.noResultsView}>
      <IPayFootnoteText text={localizationText.COMMON.NO_RESULTS_FOUND} />
    </IPayView>
  );

  const dispatch = useDispatch();
  // const selectedLanguage =
  //   useSelector((state: { languageReducer: LanguageState }) => state.languageReducer.selectedLanguage) ||
  //   LanguageCode.EN;

  const showActionSheet = () => {
    dispatch(showDropdownSheet());
  };

  return (
    <IPayView testID={`${testID}-select-item`} style={[styles.container, style]}>
      <IPayAnimatedTextInput
        label={'label'}
        editable={false}
        value={''}
        containerStyle={styles.inputContainerStyle}
        showRightIcon
        customIcon={listCheckIcon}
        onClearInput={() => {
          showActionSheet();
          // setCategory(type);
          // setCurrentView(CurrentViewTypes.FILTER_VALUES);
        }}
        onChangeText={() => {}}
      />
    </IPayView>
  );
};

export default React.forwardRef(IPayDropdown);
