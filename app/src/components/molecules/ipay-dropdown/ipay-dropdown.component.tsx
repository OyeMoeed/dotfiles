import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayInput, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import { buttonVariants } from '@app/utilities/enums.util';
import { IPayDropdownComponentProps, IPayDropdownComponentRef, ListItem } from './ipay-dropdown.interface';
import dropdownStyles from './ipay-dropdown.styles';
import IPayButton from '../ipay-button/ipay-button.component';

const IPayDropdownComponent: React.ForwardRefRenderFunction<IPayDropdownComponentRef, IPayDropdownComponentProps> = (
  { testID, style, list, onSelectListItem, searchText, setSearchText, onSave },
  ref,
) => {
  const { colors } = useTheme();
  const styles = dropdownStyles(colors);
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

  return (
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
      {filteredListItems.length === 0 ? (
        renderNoResults()
      ) : (
        <IPayFlatlist
          data={filteredListItems}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderListItems}
          itemSeparatorStyle={StyleSheet.flatten(styles.itemSeparatorStyle)}
        />
      )}
      <IPayView style={styles.btnContainer}>
        <IPayButton
          onPress={onSave}
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
