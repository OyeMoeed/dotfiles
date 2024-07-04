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
import { scaleFont } from '@app/styles/mixins';
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

    const isLastItem = (dataLength: number, index: number) => dataLength > 1 && index === dataLength - 1;

    // Render the sections dynamically based on the current arrangement
    const renderSection = (section: string) => {
      switch (section) {
        case 'Action Section':
          return (
            <>
              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                    {localizationText.need_my_action}
                  </IPayFootnoteText>
                  <IPayCaption2Text style={styles.captionTextStyle}>(3 {localizationText.pending})</IPayCaption2Text>
                </IPayView>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayText style={styles.subheadingTextStyle}>{localizationText.view_all}</IPayText>
                  <IPayPressable>
                    <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={scaleFont(14)} />
                  </IPayPressable>
                </IPayView>
              </IPayView>
              <IPayView style={styles.bannerActionContainer}>
                <IPayBannerAnimation onVerify={openProfileBottomSheet} />
              </IPayView>
            </>
          );
        case 'Suggested for you':
          return (
            <>
              <IPayView style={styles.suggestedContainerHeading}>
                <IPayFootnoteText style={styles.footnoteTextStyle}>
                  {localizationText.suggested_for_you}
                </IPayFootnoteText>
              </IPayView>
              <IPayFlatlist
                contentContainerStyle={styles.adSectionContainer}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={sampleData}
                renderItem={({ item, index }) => (
                  <IPayImage
                    style={[styles.adImage, isLastItem(sampleData?.length as number, index) && styles.lastItem]}
                    image={images.suggestionAd}
                  />
                )}
                isGHFlatlist
              />
            </>
          );
        case 'Transaction History':
          return (
            <React.Fragment key={section}>
              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={[styles.footnoteTextStyle]}>
                    {localizationText.transaction_history}
                  </IPayFootnoteText>
                </IPayView>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayText style={styles.subheadingTextStyle}>{localizationText.view_all}</IPayText>
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
                    message={localizationText.no_records_transactions_history}
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
                    {localizationText.latest_offer}
                  </IPayFootnoteText>
                </IPayView>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayText style={styles.subheadingTextStyle}>{localizationText.view_all}</IPayText>
                  <IPayPressable>
                    <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
                  </IPayPressable>
                </IPayView>
              </IPayView>
              <IPayFlatlist
                horizontal
                contentContainerStyle={styles.latestOfferListContainer}
                data={offersData}
                renderItem={({ item, index }) => (
                  <IPayLatestListCard isLastItem={isLastItem(offersData?.length as number, index)} offer={item} />
                )}
                isGHFlatlist
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
            <IPayText style={styles.subheadingTextStyle}>{localizationText.re_arrange_sections}</IPayText>
            <IPayPressable onPress={openBottomSheet}>
              <IPayIcon icon={icons.arrange_square_2} color={colors.primary.primary600} size={scaleFont(12)} />
            </IPayPressable>
          </IPayView>
        </IPayView>
      </IPayScrollView>
    );
  },
);

export default IPayLatestList;
