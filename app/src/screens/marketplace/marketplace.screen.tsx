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
import { CategoriesItem } from '@app/components/molecules/ipay-all-categories/ipay-all-categories.interface';
import { MerchantItem } from '@app/components/molecules/ipay-merchant-card/ipay-merchant-card.interface';
import { IPaySafeAreaView } from '@app/components/templates';
import useConstantData from '@app/constants/use-constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useState } from 'react';
import marketplaceStyles from './marketplace.style';

const MarketPlace: React.FC = () => {
  const { colors } = useTheme();
  const styles = marketplaceStyles(colors);
  const localizationText = useLocalization();
  const {
    SHOP: { READ_MORE, SHOP_BY_MERCHANTS, SHOP_BY_CATEGORIES },
    COMMON: { HISTORY, SEARCH, VIEW_ALL },
  } = localizationText;
  const showOffer = true;
  const { merchantData, allCategories, shopsOffers, offerDetailData } = useConstantData();

  const [search, setSearch] = useState<string>('');

  const renderOfferItem = ({ item: { title, image, description } }: { item: MerchantItem }) => (
    <IPayLinearGradientView
      gradientColors={colors.appGradient.gradientPrimary20}
      useAngle={true}
      angle={79.03}
      style={styles.gradientView}
    >
      <IPayPressable style={styles.offerCard} onPress={() => navigate(ScreenNames.SHOP_DETAILS, {details: offerDetailData})}>
        <IPayView style={styles.offerDetail}>
          <IPayBodyText text={title} color={colors.natural.natural900} regular={false} />
          <IPayCaption2Text text={description} />
          <IPaySubHeadlineText text={READ_MORE} color={colors.primary.primary500} regular />
        </IPayView>

        <IPayView style={styles.offerImageView}>
          <IPayImage image={image} style={styles.offerCardImage} />
        </IPayView>
        <IPayImageBackground image={image} style={styles.offerCardImageBackground} />
      </IPayPressable>
    </IPayLinearGradientView>
  );
  const renderItem = ({ item }: { item: MerchantItem }) => <IPayMerchantCard item={item} />;

  const renderCategoryItem = ({ item }: { item: CategoriesItem }) => (
    <IPayCategoryCard item={item} cardContainerStyle={styles.categoryCardContainer} onPress={() => navigate(ScreenNames.SHOP_CATEGORIES)} />
  );

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader
        testID="shop-ipay-header"
        title={localizationText.HOME.SHOP}
        applyFlex
        rightComponent={
          <IPayPressable style={styles.history} onPress={() => navigate(ScreenNames.ALL_ORDERS)}>
            <IPayIcon icon={icons.clock_1} size={18} color={colors.primary.primary500} />
            <IPaySubHeadlineText text={HISTORY} regular color={colors.primary.primary500} />
          </IPayPressable>
        }
      />
      <IPayView style={styles.shopContainer}>
        <IPayTextInput
          text={search}
          onChangeText={setSearch}
          placeholder={SEARCH}
          rightIcon={<IPayIcon icon={icons.SEARCH} size={20} color={colors.primary.primary500} />}
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
          leftText={SHOP_BY_CATEGORIES}
          rightText={VIEW_ALL}
          onRightOptionPress={() => navigate(ScreenNames.SHOP_ALL_CATEGORIES)}
          rightIcon={icons.arrow_right_square}
          showRightIcon
        />
        <IPayFlatlist
          data={allCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => `${SHOP_BY_CATEGORIES}-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryListStyle}
          contentContainerStyle={styles.categoryListContent}
        />

        <IPaySectionHeader
          leftText={SHOP_BY_MERCHANTS}
          rightText={VIEW_ALL}
          rightIcon={icons.arrow_right_square}
          onRightOptionPress={() => navigate(ScreenNames.MERCHANTS)}
          showRightIcon
        />

        <IPayFlatlist
          data={merchantData}
          renderItem={renderItem}
          keyExtractor={(item) => `${SHOP_BY_MERCHANTS}-${item.id}`}
          style={styles.merchantList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerWrapper}
        />
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MarketPlace;
