import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayDescriptiveCard, IPayHeader, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import CardDetails from '@app/enums/card-types.enum';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import shopCategoriesStyles from './shop-categories.styles';

const ShopCategoriesScreen: React.FC = () => {
  const { t } = useTranslation();
  const { playstationData } = useConstantData();
  const { colors } = useTheme();
  const styles = shopCategoriesStyles(colors);
  const [search, setSearch] = useState<string>('');

  // Tabs and selectedTab state
  const CATEGORY_TABS = [
    t('SHOP.SHOPPING'),
    t('SHOP.PLAYSTATION'),
    t('SHOP.FOOD'),
    t('SHOP.ENTERTAINMENT'),
    t('SHOP.TELECOM'),
    t('SHOP.GOOGLE'),
    t('SHOP.GAMES'),
    t('SHOP.STORE'),
    t('SHOP.TRANSPORTATION'),
    t('SHOP.XBOX'),
    t('SHOP.ITUNES'),
  ];

  const [selectedTab, setSelectedTab] = useState(CATEGORY_TABS[0]);

  // Handle tab selection
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleSearch = (newText: string) => {
    setSearch(newText);
  };

  const onCardPress = () => navigate(ScreenNames.PLAYSTATION);

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title="SHOP.TITLE" applyFlex />
      <IPayTabs
        tabs={CATEGORY_TABS}
        scrollable
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
        onSelect={handleTabChange}
      />
      <IPayView style={styles.searchRow}>
        <IPayTextInput
          text={search}
          onChangeText={handleSearch}
          placeholder="COMMON.SEARCH"
          rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
          simpleInput
          containerStyle={styles.background}
        />
        <IPayIcon icon={icons.arrow_updown1} />
      </IPayView>

      <IPayView style={styles.container}>
        {/* Conditionally render content based on the selected tab */}
        {selectedTab === t('SHOP.PLAYSTATION') ? (
          <IPayDescriptiveCard cardType={CardDetails.NORMAL} data={playstationData} onCardPress={onCardPress} />
        ) : (
          <IPayView style={styles.noResultContainer}>
            <IPayNoResult showEmptyBox message="SHOP.NO_RESULT" />
          </IPayView>
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default ShopCategoriesScreen;
