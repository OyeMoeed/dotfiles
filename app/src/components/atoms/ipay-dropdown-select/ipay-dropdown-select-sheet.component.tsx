import icons from '@app/assets/icons';
import { SearchNormalIcon } from '@app/assets/svgs';
import {
  IPayFlag,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayInput,
  IPayPressable,
  IPayView,
} from '@app/components/atoms';
import { IPayButton } from '@app/components/molecules';
import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities';
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
  isCountry,
  isCurrency,
}) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);

  const [filteredListItems, setFilteredListItems] = useState<ListItem[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const listCheckIcon = <IPayIcon icon={icons.tick_check_mark_default} size={22} color={colors.primary.primary500} />;

  const filterListItems = () => {
    if (!searchText.trim()) {
      setFilteredListItems(data || []);
    } else {
      const lowerSearchText = searchText.trim().toLowerCase();
      const filtered = data?.filter((item) => item?.[labelKey]?.toLowerCase()?.includes(lowerSearchText)) || []; // Use dynamic labelKey for filtering
      setFilteredListItems(filtered);
    }
  };

  useEffect(() => {
    if (searchText.length === 0 || searchText.length > 3) {
      filterListItems();
    }
  }, [data, searchText]);

  const onPressListItem = (item: ListItem) => {
    onSelectItem(item);
  };

  const renderListItems = ({ item }: { item: ListItem }) => (
    <IPayPressable
      style={styles.titleView}
      onPress={() => {
        onPressListItem(item);
        setSearchText('');
      }}
    >
      <IPayView style={styles.flagTitleContainer}>
        {!!(isCountry || isCurrency) && !!item?.code && (
          <IPayFlag countryCode={item?.code} style={styles.flagStyle} isCurrency={isCurrency} />
        )}
        <IPayFootnoteText text={item?.[labelKey]} />
      </IPayView>
      {selectedItem === item?.[labelKey] ? listCheckIcon : <IPayView />}
    </IPayPressable>
  );

  const renderNoResults = () => (
    <IPayView style={styles.noResultsView}>
      <IPayFootnoteText text="COMMON.NO_RESULTS_FOUND" />
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
      onCloseBottomSheet={() => {
        setSearchText('');
        onCloseBottomSheet();
      }}
    >
      <IPayView style={styles.container}>
        {isSearchable && (
          <IPayView style={styles.searchInputWrapper}>
            <IPayView style={styles.searchBarView}>
              <SearchNormalIcon style={styles.searchIcon} color={colors.primary.primary500} />
              <IPayInput
                onChangeText={setSearchText}
                text={searchText}
                placeholder="COMMON.SEARCH"
                placeholderTextColor={colors.natural.natural500}
                style={styles.searchInputText}
                selectionColor={undefined}
              />
            </IPayView>
            {searchText && (
              <IPayButton
                btnStyle={styles.cancel}
                btnText="COMMON.CANCEL"
                btnIconsDisabled
                small
                btnType={buttonVariants.LINK_BUTTON}
                onPress={() => setSearchText('')}
              />
            )}
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
            ListFooterComponent={<IPayView style={styles.flexStyles} />}
            itemSeparatorStyle={styles.itemSeparatorStyle}
          />
        )}
      </IPayView>
    </IPayPortalBottomSheet>
  );
};

export default IPayDropdownSheet;
