import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayInput, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import { SNAP_POINTS } from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';

import { RootState } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IPayDropdownComponentProps, IPayDropdownComponentRef, ListItem } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdownSheet: React.ForwardRefRenderFunction<IPayDropdownComponentRef, IPayDropdownComponentProps> = (
  { testID, style, onSelectListItem },
  ref,
) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);

  const localizationText = useLocalization();
  const [filteredListItems, setFilteredListItems] = useState<ListItem[]>([]);
  const [list, setList] = useState<ListItem[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const resetSelectedListItem = () => {
    setSelectedListItem('');
  };
  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const resetSelectedCity = () => {
    setSelectedListItem('');
    setSearchText('');
    setFilteredListItems(list || []);
  };

  useImperativeHandle(ref, () => ({
    present: handlePresentModalPress,
    close: handleClosePress,
    resetSelectedListItem,
    resetSelectedCity,
  }));

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

  useEffect(() => {
    filterListItems();
  }, [list, searchText]);

  const onPressListItem = (item: string) => {
    setSelectedListItem(item);
    if (onSelectListItem) onSelectListItem(item);
  };

  const renderListItems = ({ item }: { item: ListItem }) => {
    return (
      <IPayPressable style={styles.titleView} onPress={() => onPressListItem(item?.title)}>
        <IPayFootnoteText text={item.title} />
        {selectedListItem === item.title && (
          <IPayIcon icon={icons.tick_check_mark_default} size={22} color={colors.primary.primary500} />
        )}
      </IPayPressable>
    );
  };
  const renderNoResults = () => (
    <IPayView style={styles.noResultsView}>
      <IPayFootnoteText text={localizationText.COMMON.NO_RESULTS_FOUND} />
    </IPayView>
  );

  const dropdownData = useSelector((state: RootState) => state.dropdownReducer.data);

  useEffect(() => {
    if (dropdownData) {
      setList(dropdownData);
      setFilteredListItems(dropdownData);
    }
  }, [dropdownData]);

  return (
    <IPayBottomSheet
      heading={localizationText.ATM_WITHDRAWAL.ATM_DETAILS}
      customSnapPoint={SNAP_POINTS.MEDIUM}
      ref={bottomSheetModalRef}
      enablePanDownToClose
      simpleHeader
      simpleBar
      bold
      cancelBnt
    >
      <IPayView testID={`${testID}-select-item`} style={[styles.container, style]}>
        <IPayView style={styles.searchBarView}>
          <IPayIcon icon={icons.search1} size={20} color={colors.primary.primary500} />
          <IPayInput
            onChangeText={onSearchChangeText}
            text={searchText}
            placeholder={localizationText.search}
            style={styles.searchInputText}
          />
        </IPayView>
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
    </IPayBottomSheet>
  );
};

export default React.forwardRef(IPayDropdownSheet);
