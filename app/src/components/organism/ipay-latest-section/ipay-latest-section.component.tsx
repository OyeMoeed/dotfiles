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
import IPayLatestListCard from '@app/components/molecules/ipay-latest-offers-card/ipay-latest-offers-card.component';

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
import { scaleSize } from '@app/styles/mixins';
import React, { forwardRef } from 'react';
import { IPayLatestSectionProps } from './ipay-latest-section.interface';
import sectionStyles from './ipay-latest-section.style';

const IPayLatestList: React.FC = forwardRef<{}, IPayLatestSectionProps>(
  ({ testID, transactionsData, offersData, openBottomSheet, openProfileBottomSheet }, ref) => {
    const { colors } = useTheme();
    const styles = sectionStyles(colors);
    const localizationText = useLocalization();
    const sampleData = constants.SAMPLE_DATA;

    // Get the current arrangement from the Redux store
    const arrangement = useTypedSelector((state) => state.rearrangement.items);

    // Render the sections dynamically based on the current arrangement
    const renderSection = (section: string) => {
      switch (section) {
        case 'Action Section':
          return (
            <>
              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                    {localizationText.HOME.NEED_MY_ACTION}
                  </IPayFootnoteText>
                  <IPayCaption2Text style={styles.captionTextStyle}>(3 {localizationText.HOME.PENDING})</IPayCaption2Text>
                </IPayView>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
                  <IPayPressable>
                    <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={scaleSize(14)} />
                  </IPayPressable>
                </IPayView>
              </IPayView>
              <IPayBannerAnimation onVerify={openProfileBottomSheet} />
            </>
          );
        case 'Suggested for you':
          return (
            <>
              <IPayFootnoteText style={styles.footnoteTextStyle}>{localizationText.HOME.SUGGESTED_FOR_YOU}</IPayFootnoteText>
              <IPayFlatlist
                contentContainerStyle={styles.adSectionContainer}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={sampleData}
                // renderItem={() => <IPaySuggestedSlider />}
                renderItem={() => <IPayImage style={styles.adImage} image={images.suggestionAd} />}
              />
            </>
          );
        case 'Transaction History':
          return (
            <React.Fragment key={section}>
              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
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
              {historyData.length ? (
                <IPayView style={styles.listContainer}>
                  <IPayFlatlist
                    data={historyData.slice(0, 3)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <IPayTransactionItem key={item.transaction_date} transaction={item} />}
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
        case 'Latest Offers':
          return (
            <>
              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                    {localizationText.HOME.LATEST_OFFER}
                  </IPayFootnoteText>
                </IPayView>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayText style={styles.subheadingTextStyle}>{localizationText.COMMON.VIEW_ALL}</IPayText>
                  <IPayPressable>
                    <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
                  </IPayPressable>
                </IPayView>
              </IPayView>
              <IPayFlatlist
                horizontal
                contentContainerStyle={styles.latestOfferListContainer}
                data={offersData}
                renderItem={({ item, index }) => <IPayLatestListCard offer={item} />}
              />
            </>
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
              <IPayIcon icon={icons.arrange_square_2} color={colors.primary.primary600} size={scaleSize(12)} />
            </IPayPressable>
          </IPayView>
        </IPayView>
      </IPayScrollView>
    );
  },
);

export default IPayLatestList;
