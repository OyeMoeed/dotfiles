import icons from '@app/assets/icons';
import images from '@app/assets/images';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPayText,
  IPayView,
} from '@app/components/atoms';
import { IPayNoResult } from '@app/components/molecules';
import IPayBannerAnimation from '@app/components/molecules/ipay-banner-animation/ipay-banner-animation.component';
import IPayLatestOfferCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import FeatureSections from '@app/utilities/enum/feature-sections.enum';
import React from 'react';
import { IPayLatestSectionProps } from './ipay-latest-section.interface';
import sectionStyles from './ipay-latest-section.style';

const IPayLatestList: React.FC<IPayLatestSectionProps> = ({
  testID,
  transactionsData,
  offersData,
  openBottomSheet,
  openProfileBottomSheet,
}) => {
  const { colors } = useTheme();
  const styles = sectionStyles(colors);
  const localizationText = useLocalization();
  const sampleData = constants.SAMPLE_DATA;
  const userInfo = useTypedSelector((state) => state.userInfoReducer.userInfo);

  // Get the current arrangement from the Redux store
  const arrangement = useTypedSelector((state) => state.rearrangement.items);

  const isLastItem = (dataLength: number, index: number) => dataLength > 1 && index === dataLength - 1;

  // Render the sections dynamically based on the current arrangement
  const renderSection = (section: string) => {
    switch (section) {
      case FeatureSections.ACTION_SECTIONS:
        return (
          <React.Fragment key={section}>
            {userInfo?.walletTier == 'B' && userInfo?.basicTier && (
              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={styles.footnoteTextStyle}>
                    {localizationText.HOME.NEED_MY_ACTION}
                  </IPayFootnoteText>
                  <IPayCaption2Text style={styles.captionTextStyle}>
                    (3 {localizationText.HOME.PENDING})
                  </IPayCaption2Text>
                </IPayView>
                <IPayPressable style={styles.commonContainerStyle}>
                  <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
                  <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
                </IPayPressable>
              </IPayView>
            )}
            {userInfo?.walletTier == 'B' && userInfo?.basicTier && (
              <IPayView style={styles.bannerActionContainer}>
                <IPayBannerAnimation onVerify={() => openProfileBottomSheet?.()} />
              </IPayView>
            )}
          </React.Fragment>
        );
      case FeatureSections.SUGGESTED_FOR_YOU:
        return (
          <React.Fragment key={section}>
            <IPayView style={styles.suggestedContainerHeading}>
              <IPayFootnoteText style={styles.footnoteTextStyle}>
                {localizationText.COMMON.SUGGESTED_FOR_YOU}
              </IPayFootnoteText>
            </IPayView>
            <IPayFlatlist
              contentContainerStyle={styles.adSectionContainer}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={sampleData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ index }) => (
                <IPayImage
                  style={[styles.adImage, isLastItem(sampleData?.length as number, index) && styles.lastItem]}
                  image={images.suggestionAd}
                  key={`suggested-image-${index + 1}`}
                />
              )}
              isGHFlatlist
            />
          </React.Fragment>
        );
      case FeatureSections.TRANSACTION_HISTORY:
        return (
          <React.Fragment key={section}>
            <IPayView style={styles.headingsContainer}>
              <IPayView style={styles.commonContainerStyle}>
                <IPayFootnoteText style={styles.footnoteTextStyle}>
                  {localizationText.COMMON.TRANSACTION_HISTORY}
                </IPayFootnoteText>
              </IPayView>
              <IPayPressable
                onPress={() =>
                  navigate(ScreenNames.TRANSACTIONS_HISTORY, {
                    transactionsData,
                    isShowCard: false,
                    isShowAmount: false,
                  })
                }
                style={styles.commonContainerStyle}
              >
                <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
                <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
              </IPayPressable>
            </IPayView>
            {transactionsData?.length ? (
              <IPayView style={styles.listContainer}>
                <IPayFlatlist
                  data={transactionsData}
                  scrollEnabled={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <IPayTransactionItem key={`transaction-${index + 1}`} transaction={item ? item : []} />
                  )}
                />
              </IPayView>
            ) : (
              <IPayView style={styles.noRecordWrapper}>
                <IPayNoResult
                  textColor={colors.natural.natural500}
                  message={localizationText.TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY}
                  showIcon
                  displayInRow
                />
              </IPayView>
            )}
          </React.Fragment>
        );
      case FeatureSections.LATEST_OFFERS:
        return (
          <React.Fragment key={section}>
            <IPayView style={styles.headingsContainer}>
              <IPayView style={styles.commonContainerStyle}>
                <IPayFootnoteText style={styles.footnoteTextStyle}>
                  {localizationText.COMMON.LATEST_OFFER}
                </IPayFootnoteText>
              </IPayView>
              <IPayPressable onPress={() => navigate(ScreenNames.OFFERS_LIST)} style={styles.commonContainerStyle}>
                <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
                <IPayView>
                  <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
                </IPayView>
              </IPayPressable>
            </IPayView>
            <IPayFlatlist
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.latestOfferListContainer}
              data={offersData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <IPayLatestOfferCard
                  onPress={() =>
                    navigate(ScreenNames.OFFER_DETAILS, {
                      id: item.id,
                    })
                  }
                  containerStyle={styles.offerContainerStyle}
                  key={`offer-${index + 1}`}
                  isLastItem={isLastItem(offersData?.length as number, index)}
                  offer={item}
                />
              )}
              isGHFlatlist
            />
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  return (
    <IPayView testID={testID} style={styles.container}>
      {arrangement?.map((section) => renderSection(section))}
      <IPayView style={[styles.commonContainerStyle, styles.rearrangeContainerStyle]}>
        <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.RE_ARRANGE_SECTIONS}</IPayText>
        <IPayPressable onPress={openBottomSheet}>
          <IPayIcon icon={icons.arrange_square_2} color={colors.primary.primary600} size={18} />
        </IPayPressable>
      </IPayView>
    </IPayView>
  );
};

export default IPayLatestList;
