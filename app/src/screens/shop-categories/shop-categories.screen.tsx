import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayDescriptiveCard, IPayHeader, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import CardDetails from '@app/enums/card-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import shopCategoriesStyles from './shop-categories.styles';

const ShopCategoriesScreen: React.FC = () => {
  const { playstationData } = useConstantData();
  const { colors } = useTheme();
  const styles = shopCategoriesStyles(colors);
  const localizationText = useLocalization();
  const [search, setSearch] = useState<string>('');

  // Tabs and selectedTab state
  const CATEGORY_TABS = [
    localizationText.SHOP.SHOPPING,
    localizationText.SHOP.PLAYSTATION,
    localizationText.SHOP.FOOD,
    localizationText.SHOP.ENTERTAINMENT,
    localizationText.SHOP.TELECOM,
    localizationText.SHOP.GOOGLE,
    localizationText.SHOP.GAMES,
    localizationText.SHOP.STORE,
    localizationText.SHOP.TRANSPORTATION,
    localizationText.SHOP.XBOX,
    localizationText.SHOP.ITUNES,
  ];

  const [selectedTab, setSelectedTab] = useState(CATEGORY_TABS[0]);

  // Handle tab selection
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSearch = (newText: string) => {
    setSearch(newText);
  };
  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SHOP.TITLE} applyFlex />
      <IPayTabs
        tabs={CATEGORY_TABS}
        scrollable
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
        onSelect={handleTabChange}
      />
      <IPayView style={styles.searchRow}>
        <IPayTextInput
          rightIcon={<IPayIcon icon={icons.search1} color={colors.primary.primary500} />}
          label={localizationText.COMMON.SEARCH}
          text={search}
          onChangeText={handleSearch}
          containerStyle={styles.background}
          placeholderTextColor={colors.natural.natural500}
        />
        <IPayIcon icon={icons.arrow_updown} />
      </IPayView>

      <IPayView style={styles.container}>
        {/* Conditionally render content based on the selected tab */}
        {selectedTab === localizationText.SHOP.PLAYSTATION ? (
          <IPayDescriptiveCard cardType={CardDetails.NORMAL} data={playstationData} />
        ) : (
          <IPayView style={styles.noResultContainer}>
            <IPayNoResult showEmptyBox message={localizationText.SHOP.NO_RESULT} />
          </IPayView>
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default ShopCategoriesScreen;