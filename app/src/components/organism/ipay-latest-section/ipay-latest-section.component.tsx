import icons from '@app/assets/icons';
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
import IPayScrollView from '@app/components/atoms/ipay-scrollview/ipay-scrollview.component';
import IPayBannerAnimation from '@app/components/molecules/ipay-banner-animation/ipay-banner-animation.component';
import IPayLatestOfferCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';
import React from 'react';

import images from '@app/assets/images';
import { IPayNoResult } from '@app/components/molecules';
import constants from '@app/constants/constants';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import screenNames from '@app/navigation/screen-names.navigation';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import historyData from '@app/screens/transaction-history/transaction-history.constant';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import FeatureSections from '@app/utilities/enum/feature-sections.enum';
import { IPayLatestSectionProps } from './ipay-latest-section.interface';
import sectionStyles from './ipay-latest-section.style';
import ScreenNames from '@app/navigation/screen-names.navigation';

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

  // Get the current arrangement from the Redux store
  const arrangement = useTypedSelector((state) => state.rearrangement.items);

  const isLastItem = (dataLength: number, index: number) => dataLength > 1 && index === dataLength - 1;

  // Render the sections dynamically based on the current arrangement
  const renderSection = (section: string) => {
    switch (section) {
      case FeatureSections.ACTION_SECTIONS:
        return (
          <React.Fragment key={section}>
            <IPayView style={styles.headingsContainer}>
              <IPayView style={styles.commonContainerStyle}>
                <IPayFootnoteText style={styles.footnoteTextStyle}>
                  {localizationText.HOME.NEED_MY_ACTION}
                </IPayFootnoteText>
                <IPayCaption2Text style={styles.captionTextStyle}>(3 {localizationText.HOME.PENDING})</IPayCaption2Text>
              </IPayView>
              <IPayView style={styles.commonContainerStyle}>
                <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
                <IPayPressable>
                  <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
                </IPayPressable>
              </IPayView>
            </IPayView>
            <IPayView style={styles.bannerActionContainer}>
              <IPayBannerAnimation onVerify={() => openProfileBottomSheet?.()} />
            </IPayView>
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
              <IPayView style={styles.commonContainerStyle}>
                <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
                <IPayPressable onPress={() => navigate(screenNames.TRANSACTIONS_HISTORY, { transactionsData })}>
                  <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
                </IPayPressable>
              </IPayView>
            </IPayView>
            {transactionsData?.length ? (
              <IPayView style={styles.listContainer}>
                <IPayFlatlist
                  data={transactionsData}
                  scrollEnabled={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <IPayTransactionItem key={`transaction-${index + 1}`} transaction={item} />
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
              horizontal
              contentContainerStyle={styles.latestOfferListContainer}
              data={offersData}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <IPayLatestOfferCard
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
    <IPayScrollView>
      <IPayView testID={testID} style={styles.container}>
        {arrangement?.map((section) => renderSection(section))}
        <IPayView style={[styles.commonContainerStyle, styles.rearrangeContainerStyle]}>
          <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.RE_ARRANGE_SECTIONS}</IPayText>
          <IPayPressable onPress={openBottomSheet}>
            <IPayIcon icon={icons.arrange_square_2} color={colors.primary.primary600} size={18} />
          </IPayPressable>
        </IPayView>
      </IPayView>
    </IPayScrollView>
  );
};

export default IPayLatestList;
