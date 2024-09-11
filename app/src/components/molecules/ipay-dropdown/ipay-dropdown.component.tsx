import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayInput, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import IPayButton from '../ipay-button/ipay-button.component';
import { IPayDropdownComponentProps, IPayDropdownComponentRef, ListItem } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';

const IPayDropdownComponent: React.ForwardRefRenderFunction<IPayDropdownComponentRef, IPayDropdownComponentProps> = (
  { testID, style, list, onSelectListItem, searchText, setSearchText, onSave, selectedItem },
  ref,
) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
  const localizationText = useLocalization();
  const [filteredListItems, setFilteredListItems] = useState<ListItem[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<ListItem | null>(selectedItem || null);

  const resetSelectedListItem = () => {
    setSelectedListItem(null);
  };

  const resetSelectedCity = () => {
    setSelectedListItem(null);
    setSearchText('');
    setFilteredListItems(list || []);
  };

  // Expose resetSelectedListItem and resetSelectedCity functions through ref
  useImperativeHandle(ref, () => ({
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

  // Update filteredListItems whenever list or searchText changes
  useEffect(() => {
    filterListItems();
  }, [list, searchText]);

  const onPressListItem = (item: ListItem) => {
    setSelectedListItem(item);
  };

  const renderListItems = ({ item }: { item: ListItem }) => (
    <IPayPressable style={styles.titleView} onPress={() => onPressListItem(item)}>
      <IPayFootnoteText text={item.title} />
      {selectedListItem?.id === item?.id && (
        <IPayIcon icon={icons.tick_check_mark_default} size={22} color={colors.primary.primary500} />
      )}
    </IPayPressable>
  );

  const renderNoResults = () => (
    <IPayView style={styles.noResultsView}>
      <IPayFootnoteText text={'COMMON.NO_RESULTS_FOUND'} />
    </IPayView>
  );

  return (
    <IPayView testID={`${testID}-select-item`} style={[styles.container, style]}>
      <IPayView style={styles.searchBarView}>
        <IPayIcon icon={icons.search1} size={20} color={colors.primary.primary500} />
        <IPayInput
          onChangeText={onSearchChangeText}
          text={searchText}
          placeholder={'COMMON.SEARCH'}
          style={styles.searchInputText}
        />
      </IPayView>
      {filteredListItems.length === 0 ? (
        renderNoResults()
      ) : (
        <IPayFlatlist
          showsVerticalScrollIndicator={false}
          data={filteredListItems}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderListItems}
          itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
        />
      )}
      <IPayView style={styles.btnContainer}>
        <IPayButton
          onPress={() => {
            if (onSelectListItem) onSelectListItem(selectedListItem as ListItem);
            onSave();
          }}
          large
          btnIconsDisabled
          btnType={buttonVariants.PRIMARY}
          btnText={localizationText.COMMON.SAVE}
        />
      </IPayView>
    </IPayView>
  );
};

export default React.forwardRef(IPayDropdownComponent);
