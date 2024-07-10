import icons from '@app/assets/icons';
import { IPayFlatlist, IPayFootnoteText, IPayIcon, IPayInput, IPayPressable, IPayView } from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import {
  CityItemProps,
  IPaySelectCityComponentProps,
  IPaySelectCityComponentRef,
} from './ipay-selecte-city-component.interface';
import selecteCityStyles from './ipay-selecte-city-component.styles';

const IPaySelectCityComponent: React.ForwardRefRenderFunction<
  IPaySelectCityComponentRef,
  IPaySelectCityComponentProps
> = ({ testID = 'test', style, data, onSelectCity }, ref) => {
  const { colors } = useTheme();
  const styles = selecteCityStyles(colors);
  const localizationText = useLocalization();
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<CityItemProps[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');

  const resetSelectedCity = () => {
    setSelectedCity('');
  };

  // Expose resetSelectedCity function through ref
  useImperativeHandle(ref, () => ({
    resetSelectedCity,
  }));

  const onSearchChangeText = (text: string) => {
    setSearchText(text);
  };

  const filterCities = () => {
    if (!searchText.trim()) {
      setFilteredCities(data); // Reset to original list if search text is empty
    } else {
      const lowerSearchText = searchText.trim().toLowerCase();
      const filtered = data && data.filter((city) => city.cityName.toLowerCase().includes(lowerSearchText));
      setFilteredCities(filtered);
    }
  };

  // Update filteredCities whenever data or searchText changes
  useEffect(() => {
    filterCities();
  }, [data, searchText]);

  const onPressCity = (city: string) => {
    setSelectedCity(city);
    if (onSelectCity) onSelectCity(city);
  };

  const renderCities = ({ item }: { item: CityItemProps }) => (
    <IPayPressable style={styles.cityNameView} onPress={() => onPressCity(item?.cityName)}>
      <IPayFootnoteText text={item.cityName} />
      {selectedCity === item.cityName && (
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
    <IPayView testID={`${testID}-select-city`} style={[styles.container, style]}>
      <IPayView style={styles.searchBarView}>
        <IPayIcon icon={icons.search1} size={20} color={colors.primary.primary500} />
        <IPayInput
          onChangeText={onSearchChangeText}
          text={searchText}
          placeholder={localizationText.search}
          style={styles.searchInputText}
        />
      </IPayView>
      {filteredCities.length === 0 ? (
        renderNoResults()
      ) : (
        <IPayFlatlist
          data={filteredCities}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderCities}
          itemSeparatorStyle={styles.itemSeparatorStyle}
        />
      )}
    </IPayView>
  );
};

export default React.forwardRef(IPaySelectCityComponent);
