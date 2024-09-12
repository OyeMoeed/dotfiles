import icons from '@app/assets/icons';
import { IPayIcon, IPayView } from '@app/components/atoms';
import { IPayDescriptiveCard, IPayHeader, IPayNoResult, IPayTextInput } from '@app/components/molecules';
import IPayTabs from '@app/components/molecules/ipay-tabs/ipay-tabs.component';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import CardDetails from '@app/enums/card-types.enum';
import useLocalization from '@app/localization/hooks/localization.hook';
import { PayloadMerchantsCategoryProps } from '@app/network/services/market/get-products-by-category-id/get-products-by-category-id.interface';
import getProductsByCategoryId from '@app/network/services/market/get-products-by-category-id/get-products-by-category-id.service';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { LanguageCode } from '@app/utilities/enums.util';
import React, { useEffect, useState } from 'react';
import { MarketPlaceCategoriesProps } from '../marketplace/marketplace.interface';
import shopCategoriesStyles from './shop-categories.styles';

const ShopCategoriesScreen: React.FC = ({ route }) => {
  const {
    categories,
    selectedCategory,
  }: { categories: MarketPlaceCategoriesProps[]; selectedCategory: MarketPlaceCategoriesProps } = route.params;
  const { colors } = useTheme();
  const styles = shopCategoriesStyles(colors);
  const localizationText = useLocalization();
  const [search, setSearch] = useState<string>('');
  const [categoriesTabsData, setCategoriesTabsData] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [categoryProductsData, setCategoryProductsData] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { selectedLanguage } = useTypedSelector((state) => state.languageReducer);
  const { showToast } = useToastContext();

  const renderToast = (apiError?: string) => {
    showToast({
      title: localizationText.ERROR.API_ERROR_RESPONSE,
      subTitle: apiError,
      borderColor: colors.error.error25,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getProducts = async (categoryId: string) => {
    try {
      const payload: PayloadMerchantsCategoryProps = {
        categoryId,
      };

      const apiResponse: any = await getProductsByCategoryId(payload);
      if (apiResponse?.status?.type === 'SUCCESS') {
        setCategoryProductsData(apiResponse?.response?.merchants);
        setCategoryProducts(apiResponse?.response?.merchants);
      } else if (apiResponse?.apiResponseNotOk) {
        renderToast();
      } else {
        renderToast(apiResponse?.error);
      }
    } catch (error: any) {
      renderToast(error?.message || localizationText.ERROR.SOMETHING_WENT_WRONG);
    }
  };

  const getCategoriesForTabs = () => {
    let catagoryTabs: string[] = [];
    switch (selectedLanguage) {
      case LanguageCode.AR:
        catagoryTabs = categories.map((item: { addtionalAttribute1: string }) => item.addtionalAttribute1);
        break;
      default:
        catagoryTabs = categories.map((item: { desc: string }) => item.desc);
        break;
    }
    setCategoriesTabsData(catagoryTabs);
    setSelectedTab(selectedCategory.desc);
  };

  useEffect(() => {
    getCategoriesForTabs();
    const categoryId = selectedCategory.code;
    if (categoryId) getProducts(categoryId);
  }, [selectedLanguage]);

  // Function to get code based on desc or addtionalAttribute1
  const getCodeByDescOrAttribute = (keyword: string) => {
    const item = categories.find(
      (element: { desc: string; addtionalAttribute1: string }) =>
        element.desc.toLowerCase().includes(keyword.toLowerCase()) ||
        element.addtionalAttribute1.toLowerCase().includes(keyword.toLowerCase()),
    );
    return item ? item.code : null;
  };

  // Handle tab selection
  const handleTabChange = (tab: string) => {
    if (tab !== selectedTab) {
      setSelectedTab(tab);
      const code = getCodeByDescOrAttribute(tab);
      getProducts(code);
    }
  };

  // Search function
  const searchByDesc = (keyword: string) =>
    categoryProductsData.filter((item: { desc: string }) => item.desc.toLowerCase().includes(keyword.toLowerCase()));

  const handleSearch = (newText: string) => {
    if (newText.length > 0) {
      const searchResult = searchByDesc(newText);
      setCategoryProducts(searchResult);
    } else {
      setCategoryProducts(categoryProductsData);
    }
    setSearch(newText);
  };

  const onPressCategoryCard = (code: string) => {};

  return (
    <IPaySafeAreaView>
      <IPayHeader backBtn title={localizationText.SHOP.TITLE_SHOP} applyFlex />
      <IPayTabs
        tabs={categoriesTabsData}
        scrollable
        customStyles={styles.tabs}
        unselectedTabStyle={styles.unselectedTab}
        preSelectedTab={selectedTab}
        onSelect={handleTabChange}
      />
      <IPayView style={styles.searchRow}>
        <IPayTextInput
          text={search}
          onChangeText={handleSearch}
          placeholder={localizationText.COMMON.SEARCH}
          rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
          simpleInput
          containerStyle={styles.background}
        />
        <IPayIcon icon={icons.arrow_updown1} />
      </IPayView>

      <IPayView style={styles.container}>
        {/* Conditionally render content based on the selected tab */}
        {categoryProducts.length > 0 ? (
          <IPayView>
            <IPayDescriptiveCard
              cardType={CardDetails.NORMAL}
              data={categoryProducts}
              onCardPress={onPressCategoryCard}
            />
          </IPayView>
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
