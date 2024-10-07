import icons from '@app/assets/icons';
import {
  IPayBodyText,
  IPayCaption2Text,
  IPayFlatlist,
  IPayIcon,
  IPayImage,
  IPayImageBackground,
  IPayLinearGradientView,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import {
  IPayCategoryCard,
  IPayHeader,
  IPayMerchantCard,
  IPaySectionHeader,
  IPayTextInput,
} from '@app/components/molecules';
import { MerchantItem } from '@app/components/molecules/ipay-merchant-card/ipay-merchant-card.interface';
import { useToastContext } from '@app/components/molecules/ipay-toast/context/ipay-toast-context';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import getApVoucherCategories from '@app/network/services/market/ap-vouchers-categories/ap-vouchers-categories.service';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType } from '@app/utilities';
import React, { useCallback, useEffect, useState } from 'react';
import useGetAppConfigurations, {
  ModulesNameEnum,
} from '@app/network/services/core/app-configurations/use-get-app-configurations.hook';
import { useFocusEffect } from '@react-navigation/core';
import { mapCategoriesByCode } from './marketplace.constant';
import { MarketPlaceCategoriesProps } from './marketplace.interface';
import marketplaceStyles from './marketplace.style';

const MarketPlace: React.FC = () => {
  const { triggerDisabledSheet } = useGetAppConfigurations({ modules: [ModulesNameEnum.MAZAYA_IS_ACTIVE] });
  const { colors } = useTheme();
  const styles = marketplaceStyles(colors);

  const showOffer = true;
  const { merchantData, shopsOffers, offerDetailData } = useConstantData();
  const { showToast } = useToastContext();

  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState<MarketPlaceCategoriesProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      triggerDisabledSheet(ModulesNameEnum.MAZAYA_IS_ACTIVE);
    }, [triggerDisabledSheet]),
  );

  const renderToast = (toastMsg: string) => {
    showToast({
      title: toastMsg,
      borderColor: colors.error.error25,
      isShowRightIcon: false,
      leftIcon: <IPayIcon icon={icons.warning} size={24} color={colors.natural.natural0} />,
    });
  };

  const getCategories = async () => {
    try {
      const apiResponse: any = await getApVoucherCategories();
      if (apiResponse?.status?.type === APIResponseType.SUCCESS) {
        const data = mapCategoriesByCode(apiResponse?.response?.categories);
        setCategories(data);
      } else if (apiResponse?.apiResponseNotOk) {
        renderToast('ERROR.API_ERROR_RESPONSE');
      } else {
        renderToast(apiResponse?.error);
      }
    } catch (error: any) {
      renderToast(error?.message || 'ERROR.SOMETHING_WENT_WRONG');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onPressViewAllCategories = () => {
    if (categories.length > 0) navigate(ScreenNames.ALL_CATEGORIES_SCREEN, { categories });
  };

  const onPressCategory = (category?: MarketPlaceCategoriesProps) => {
    navigate(ScreenNames.SHOP_CATEGORIES, { categories, selectedCategory: category });
  };

  const onPressViewAllMerchants = () => {
    navigate(ScreenNames.MERCHANTS);
  };

  const allCategoriesPress = () => navigate(ScreenNames.SHOP_ALL_CATEGORIES);

  const allMerchantPress = () => navigate(ScreenNames.MERCHANTS);

  const offerDetailPress = () => navigate(ScreenNames.SHOP_DETAILS, { details: offerDetailData });

  const renderOfferItem = ({ item: { title, image, description } }: { item: MerchantItem }) => (
    <IPayLinearGradientView
      gradientColors={colors.appGradient.gradientPrimary20}
      useAngle
      angle={79.03}
      style={styles.gradientView}
    >
      <IPayPressable style={styles.offerCard} onPress={offerDetailPress}>
        <IPayView style={styles.offerDetail}>
          <IPayBodyText text={title} color={colors.natural.natural900} regular={false} />
          <IPayCaption2Text text={description} />
          <IPaySubHeadlineText text="SHOP.READ_MORE" color={colors.primary.primary500} regular />
        </IPayView>

        <IPayView style={styles.offerImageView}>
          <IPayImage image={image} style={styles.offerCardImage} />
        </IPayView>
        <IPayImageBackground image={image} style={styles.offerCardImageBackground} />
      </IPayPressable>
    </IPayLinearGradientView>
  );
  const renderItem = ({ item }: { item: MerchantItem }) => <IPayMerchantCard item={item} />;

  const renderCategoryItem = ({ item }: { item: MarketPlaceCategoriesProps }) => (
    <IPayCategoryCard item={item} cardContainerStyle={styles.categoryCardContainer} onPressCategory={onPressCategory} />
  );

  const orderHistory = () => navigate(ScreenNames.ALL_ORDERS);

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="shop-ipay-header"
        title="HOME.SHOP"
        applyFlex
        rightComponent={
          <IPayPressable style={styles.history} onPress={orderHistory}>
            <IPayIcon icon={icons.clock_1} size={18} color={colors.primary.primary500} />
            <IPaySubHeadlineText text="COMMON.HISTORY" regular color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayView style={styles.shopContainer}>
        <IPayTextInput
          text={search}
          onChangeText={setSearch}
          placeholder="COMMON.SEARCH"
          rightIcon={<IPayIcon icon={icons.search2} size={20} color={colors.primary.primary500} />}
          simpleInput
          containerStyle={styles.searchInputStyle}
        />

        {showOffer && (
          <IPayFlatlist
            data={shopsOffers}
            renderItem={renderOfferItem}
            keyExtractor={(item) => `${item.title}-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerContentContainer}
            style={styles.offerContentStyle}
          />
        )}

        <IPaySectionHeader
          leftText="SHOP.SHOP_BY_CATEGORIES"
          rightText="COMMON.VIEW_ALL"
          onRightOptionPress={allCategoriesPress}
          rightIcon={icons.arrow_right_square}
          showRightIcon
          onPress={onPressViewAllCategories}
        />
        <IPayFlatlist
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => `SHOP.SHOP_BY_CATEGORIES-${item?.desc}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryListStyle}
          contentContainerStyle={styles.categoryListContent}
        />

        <IPaySectionHeader
          leftText="SHOP.SHOP_BY_MERCHANTS"
          rightText="COMMON.VIEW_ALL"
          rightIcon={icons.arrow_right_square}
          onRightOptionPress={allMerchantPress}
          showRightIcon
          onPress={onPressViewAllMerchants}
        />

        <IPayFlatlist
          data={merchantData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `SHOP_BY_MERCHANTS-${item?.desc}-${index}`}
          style={styles.merchantList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerWrapper}
          horizontal={false}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapperMerchant}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MarketPlace;
