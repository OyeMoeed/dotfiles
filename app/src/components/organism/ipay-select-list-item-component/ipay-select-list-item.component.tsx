import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayInput, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  IPaySelectListItemComponentProps,
  IPaySelectListItemComponentRef,
  ListItem,
} from './ipay-select-list-item-component.interface';
import selectListItemStyles from './ipay-select-list-item-component.styles';

const IPaySelectListItemComponent: React.ForwardRefRenderFunction<
  IPaySelectListItemComponentRef,
  IPaySelectListItemComponentProps
> = ({ testID = 'test', style, data, onSelectListItem }, ref) => {
  const { colors } = useTheme();
  const styles = selectListItemStyles(colors);
  const localizationText = useLocalization();
  const [searchText, setSearchText] = useState<string>('');
  const [filteredListItems, setFilteredListItems] = useState<ListItem[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string>('');

  const resetSelectedListItem = () => {
    setSelectedListItem('');
  };

  const resetSelectedCity = () => {
    setSelectedListItem('');
    setSearchText('');
    setFilteredListItems(data || []);
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
      setFilteredListItems(data || []); // Reset to original list if search text is empty
    } else {
      const lowerSearchText = searchText.trim().toLowerCase();
      const filtered = data?.filter((item) => item.title.toLowerCase().includes(lowerSearchText)) || [];
      setFilteredListItems(filtered);
    }
  };

  // Update filteredListItems whenever data or searchText changes
  useEffect(() => {
    filterListItems();
  }, [data, searchText]);

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
    </IPayView>
  );
};

export default React.forwardRef(IPaySelectListItemComponent);
