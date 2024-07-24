import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayInput, IPayPressable, IPayView } from '@app/components/atoms';
import { IPayBottomSheet } from '@app/components/organism';
import useLocalization from '@app/localization/hooks/localization.hook';
import { setSelectedType } from '@app/store/slices/dropdown-slice';
import { RootState } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { bottomSheetTypes } from '@app/utilities/types-helper.util';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPayDropdownComponentSheetProps, ListItem } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdownSheet: React.ForwardRefRenderFunction<IPayDropdownComponentSheetProps> = ({}, ref) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const localizationText = useLocalization();
  const [filteredListItems, setFilteredListItems] = useState<ListItem[]>([]);
  const [list, setList] = useState<ListItem[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const dropdownData = useSelector((state: RootState) => state.dropdownReducer.data);
  const isSearchable = useSelector((state: RootState) => state.dropdownReducer.isSearchable);
  const size = useSelector((state: RootState) => state.dropdownReducer.size);
  const heading = useSelector((state: RootState) => state.dropdownReducer.heading);
  const bottomSheetModalRef = useRef<bottomSheetTypes>(null);
  const listCheckIcon = <IPayIcon icon={icons.tick_check_mark_default} size={22} color={colors.primary.primary500} />;
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({
    present: handlePresentModalPress,
    close: handleClosePress,
  }));

  const onSearchChangeText = (text: string) => {
    setSearchText(text);
  };

  const filterListItems = () => {
    if (!searchText.trim()) {
      setFilteredListItems(list || []);
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
    dispatch(setSelectedType({ key: heading, value: item }));
    handleClosePress();
  };

  const renderListItems = ({ item }: { item: ListItem }) => {
    return (
      <IPayPressable style={styles.titleView} onPress={() => onPressListItem(item?.title)}>
        <IPayFootnoteText text={item.title} />
        {selectedListItem === item.title && listCheckIcon}
      </IPayPressable>
    );
  };
  const renderNoResults = () => (
    <IPayView style={styles.noResultsView}>
      <IPayFootnoteText text={localizationText.COMMON.NO_RESULTS_FOUND} />
    </IPayView>
  );

  useEffect(() => {
    if (dropdownData) {
      setList(dropdownData);
      setFilteredListItems(dropdownData);
    }
  }, [dropdownData]);

  return (
    <IPayBottomSheet
      heading={heading}
      customSnapPoint={size}
      ref={bottomSheetModalRef}
      enablePanDownToClose
      simpleHeader
      simpleBar
      bold
      cancelBnt
    >
      <IPayView style={[styles.container]}>
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
    </IPayBottomSheet>
  );
};

export default React.forwardRef(IPayDropdownSheet);
