import icons from '@app/assets/icons';
import {
  IPayCaption1Text,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayTitle2Text,
  IPayTitle3Text,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayCarousel, IPayHeader } from '@app/components/molecules';
import { IPayLoadFailed, IPayTermsAndConditions } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { WINDOW_WIDTH } from '@app/styles/mixins';
import { buttonVariants } from '@app/utilities/enums.util';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import { TermsAndConditionsRefTypes } from '../card-renewal/card-renewal.screen.interface';
import { RenderItemProps } from '../send-gift-card/send-gift-card.interface';
import shopDetailStyles from './shop-details.style';

const ShopDetails: React.FC = (route) => {
  const { heading = '', details = [] } = route?.params || {};
  const { colors } = useTheme();
  const styles = shopDetailStyles(colors);
  const termsAndConditionSheetRef = useRef<TermsAndConditionsRefTypes>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useState(new Animated.Value(100))[0];
  const discountDetail = '20% Discount on Yearly subscribe on Spotify'; // TODO: Replace with API
  const amount = '470.00'; // TODO: Replace with API
  const localizationText = useLocalization();

  const requestFailed = false;
  const {
    SHOP: { PRODUCT_DISCRIPTION, VIEW_ALL_DETAILS, HIDE_DETAILS, PLAYSTATION, OFFER_DETAILS, PAY },
    COMMON: { SAR },
  } = localizationText;

  const bulletPoints = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0.2 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onPressTermsAndConditions = () => {
    termsAndConditionSheetRef.current?.showTermsAndConditions();
  };

  const renderCarouselItem = ({ item }: RenderItemProps) => (
    <IPayView style={[styles.carouselItem, { backgroundColor: item.background }]}>
      <IPayImage image={item.image} style={styles.image}></IPayImage>
    </IPayView>
  );

  const renderBulletPoints = (point: string, index: number) => (
    <IPayView key={index} style={styles.bulletContainer}>
      <IPayCaption1Text style={styles.bulletSymbol}>•</IPayCaption1Text>
      <IPayCaption1Text style={styles.bulletPoint}>{point}</IPayCaption1Text>
    </IPayView>
  );
  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="shop-details-ipay-header" backBtn title={heading || OFFER_DETAILS} applyFlex />
      {!requestFailed ? (
        <>
          <IPayScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <>
              {!!details?.length && (
                <IPayCarousel
                  data={details}
                  carouselContainerStyle={styles.carouselContainer}
                  height={WINDOW_HEIGHT}
                  width={WINDOW_WIDTH / 1.15}
                  stylePagination={styles.paginationStyle}
                  pagination
                  loop={false}
                  style={styles.carouselStyle}
                  renderItem={renderCarouselItem}
                />
              )}
              <IPayView style={styles.discountCard}>
                <IPaySubHeadlineText text={PLAYSTATION} regular />
                <IPayTitle2Text text={discountDetail} />
              </IPayView>
              <Animated.View style={[styles.pointsCard, { flex: animatedHeight }]}>
                <IPayFootnoteText style={styles.title} regular={false}>
                  {PRODUCT_DISCRIPTION}
                </IPayFootnoteText>

                {isExpanded
                  ? bulletPoints.map((point, index) => renderBulletPoints(point, index))
                  : bulletPoints.slice(0, 1).map((point, index) => renderBulletPoints(point, index))}

                <IPayPressable onPress={toggleExpanded}>
                  <IPaySubHeadlineText style={styles.viewDetailToggle} color={colors.primary.primary500} regular>
                    {isExpanded ? HIDE_DETAILS : VIEW_ALL_DETAILS}
                  </IPaySubHeadlineText>
                </IPayPressable>
              </Animated.View>
              <IPayPressable onPress={onPressTermsAndConditions} style={styles.termsContainer}>
                <IPayView style={styles.termsChildContainer}>
                  <IPayFootnoteText style={styles.termText} text={localizationText.SHOP.TERMS_AND_CONDITIONS} />
                  <IPayIcon icon={icons.infoIcon} size={18} color={colors.primary.primary500} />
                </IPayView>
              </IPayPressable>
            </>
          </IPayScrollView>
          <IPayView style={styles.bottomContainer}>
            <IPayTitle3Text text={`${SAR} ${amount}`} regular={false} style={styles.amountText} />

            <IPayButton
              btnText={PAY}
              btnType={buttonVariants.PRIMARY}
              large
              btnIconsDisabled
              btnStyle={styles.payButton}
            />
          </IPayView>
        </>
      ) : (
        <IPayLoadFailed />
      )}

      <IPayTermsAndConditions ref={termsAndConditionSheetRef} />
    </IPaySafeAreaView>
  );
};

export default ShopDetails;
