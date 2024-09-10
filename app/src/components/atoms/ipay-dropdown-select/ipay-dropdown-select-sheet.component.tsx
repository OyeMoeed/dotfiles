import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayInput, IPayPressable, IPayView } from '@app/components/atoms';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useState } from 'react';
import { IPayDropdownComponentSheetProps, ListItem } from './ipay-dropdown-select.interface';
import dropdownStyles from './ipay-dropdown-select.styles';

const IPayDropdownSheet: React.FC<IPayDropdownComponentSheetProps> = ({
  data,
  isSearchable,
  onSelectItem,
  selectedItem,
  snapPoints = ['60%', '90%'],
  heading,
  isVisible,
  onCloseBottomSheet,
  labelKey,
}) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const localizationText = useLocalization();
  const [filteredListItems, setFilteredListItems] = useState<ListItem[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const listCheckIcon = <IPayIcon icon={icons.tick_check_mark_default} size={22} color={colors.primary.primary500} />;

  const onSearchChangeText = (text: string) => {
    setSearchText(text);
  };

  const filterListItems = () => {
    if (!searchText.trim()) {
      setFilteredListItems(data || []);
    } else {
      const lowerSearchText = searchText.trim().toLowerCase();
      const filtered = data?.filter((item) => item[labelKey].toLowerCase().includes(lowerSearchText)) || []; // Use dynamic labelKey for filtering
      setFilteredListItems(filtered);
    }
  };

  useEffect(() => {
    filterListItems();
  }, [data, searchText]);

  const onPressListItem = (item: ListItem) => {
    onSelectItem(item);
  };

  const renderListItems = ({ item }: { item: ListItem }) => (
    <IPayPressable style={styles.titleView} onPress={() => onPressListItem(item)}>
      <IPayFootnoteText text={item[labelKey]} />
      {selectedItem === item[labelKey] && listCheckIcon}
    </IPayPressable>
  );

  const renderNoResults = () => (
    <IPayView style={styles.noResultsView}>
      <IPayFootnoteText text={localizationText.COMMON.NO_RESULTS_FOUND} />
    </IPayView>
  );

  return (
    <IPayPortalBottomSheet
      customSnapPoint={snapPoints}
      enablePanDownToClose
      heading={heading}
      isVisible={isVisible}
      simpleHeader
      simpleBar
      cancelBnt
      onCloseBottomSheet={onCloseBottomSheet}
    >
      <IPayView style={styles.container}>
        {isSearchable && (
          <IPayView style={styles.searchBarView}>
            <IPayIcon icon={icons.search1} size={20} color={colors.primary.primary500} />
            <IPayInput
              onChangeText={onSearchChangeText}
              text={searchText}
              placeholder={localizationText.COMMON.SEARCH}
              style={styles.searchInputText}
            />
          </IPayView>
        )}
        {filteredListItems?.length === 0 ? (
          renderNoResults()
        ) : (
          <IPayFlatlist
            showsVerticalScrollIndicator={false}
            data={filteredListItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderListItems}
            style={styles.flexStyles}
            itemSeparatorStyle={styles.itemSeparatorStyle}
          />
        )}
      </IPayView>
    </IPayPortalBottomSheet>
  );
};

export default IPayDropdownSheet;
