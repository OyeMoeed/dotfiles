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
import { FeatureSections } from '@app/enums';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import { isBasicTierSelector } from '@app/store/slices/wallet-info-slice';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import { IPayLatestSectionProps } from './ipay-latest-section.interface';
import sectionStyles from './ipay-latest-section.style';
import { IPayTransactionItemProps } from '@app/screens/transaction-history/component/ipay-transaction.interface';
import { isAndroidOS } from '@app/utilities/constants';
import { heightMapping } from '@app/components/templates/ipay-transaction-history/ipay-transaction-history.constant';
import { IPayBottomSheet } from '@app/components/organism';
import { IPayTransactionHistory } from '@app/components/templates';

const IPayLatestList: React.FC<IPayLatestSectionProps> = ({
  testID,
  transactionsData,
  offersData,
  openBottomSheet,
  openProfileBottomSheet,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = sectionStyles(colors);
  const sampleData = constants.SAMPLE_DATA;
  const isBasicTier = useTypedSelector(isBasicTierSelector);
  // Get the current arrangement from the Redux store
  const arrangement = useTypedSelector((state) => state.rearrangement.items);

  const isLastItem = (dataLength: number, index: number) => dataLength > 1 && index === dataLength - 1;

  const transactionRef = React.createRef<any>();

  const [transaction, setTransaction] = useState<IPayTransactionItemProps | null>(null);
  const [snapPoint, setSnapPoint] = useState<Array<string>>(['1%', isAndroidOS ? '95%' : '100%']);

  const openTransactionHistoryDetails = useCallback(
    (item: IPayTransactionItemProps) => {
      let calculatedSnapPoint = ['95%', '100%'];
      setSnapPoint(calculatedSnapPoint);
      setTransaction(item);
      transactionRef.current?.present();
    },
    [setSnapPoint, setTransaction, transactionRef],
  );

  const closeBottomSheet = () => {
    transactionRef.current?.forceClose();
  };

  const moveToTransactionHistory = () => {
    navigate(ScreenNames.TRANSACTIONS_HISTORY, {
      transactionsData,
      isShowCard: true,
      isShowAmount: true,
    });
  };

  // Render the sections dynamically based on the current arrangement
  const renderSection = (section: string) => {
    switch (section) {
      case FeatureSections.ACTION_SECTIONS:
        return (
          <React.Fragment key={section}>
            {isBasicTier && (
              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={styles.footnoteTextStyle} text="HOME.NEED_MY_ACTION" />
                  <IPayCaption2Text style={styles.captionTextStyle} text={`3 ${t('HOME.PENDING')}`} />
                </IPayView>
                <IPayPressable style={styles.commonContainerStyle}>
                  <IPayText style={styles.subheadingTextStyle} text="COMMON.VIEW_ALL" />
                  <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
                </IPayPressable>
              </IPayView>
            )}
            {isBasicTier && (
              <IPayView style={styles.bannerActionContainer}>
                <IPayBannerAnimation onVerify={() => openProfileBottomSheet && openProfileBottomSheet()} />
              </IPayView>
            )}
          </React.Fragment>
        );
      case FeatureSections.SUGGESTED_FOR_YOU:
        return (
          <React.Fragment key={section}>
            <IPayView style={styles.suggestedContainerHeading}>
              <IPayFootnoteText style={styles.footnoteTextStyle} text="COMMON.SUGGESTED_FOR_YOU" />
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
                <IPayFootnoteText style={styles.footnoteTextStyle} text="COMMON.TRANSACTION_HISTORY" />
              </IPayView>
              <IPayPressable onPress={moveToTransactionHistory} style={styles.commonContainerStyle}>
                <IPayText style={styles.subheadingTextStyle} text="COMMON.VIEW_ALL" />
                <IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />
              </IPayPressable>
            </IPayView>
            <IPayView style={styles.listContainer}>
              <IPayFlatlist
                data={transactionsData}
                scrollEnabled={false}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={
                  isLoading ? (
                    <IPaySkeletonBuilder isLoading={isLoading} variation={IPaySkeletonEnums.TRANSACTION_LIST} />
                  ) : (
                    <IPayView style={styles.noRecordWrapper}>
                      <IPayNoResult
                        textColor={colors.natural.natural500}
                        message="TRANSACTION_HISTORY.NO_RECORDS_TRANSACTIONS_HISTORY"
                        showIcon
                        displayInRow
                      />
                    </IPayView>
                  )
                }
                renderItem={({ item, index }) => (
                  <IPayTransactionItem key={`transaction-${index + 1}`} transaction={item || []} 
                    onPressTransaction={openTransactionHistoryDetails}/>
                )}
              />
            </IPayView>
          </React.Fragment>
        );
      case FeatureSections.LATEST_OFFERS:
        return (
          <React.Fragment key={section}>
            <IPayView style={styles.headingsContainer}>
              <IPayView style={styles.commonContainerStyle}>
                <IPayFootnoteText style={styles.footnoteTextStyle} text="COMMON.LATEST_OFFER" />
              </IPayView>
              <IPayPressable onPress={() => navigate(ScreenNames.OFFERS_LIST)} style={styles.commonContainerStyle}>
                <IPayText style={styles.subheadingTextStyle} text="COMMON.VIEW_ALL" />
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
    <>
      <IPayView testID={testID} style={styles.container}>
        {arrangement?.map((section) => renderSection(section))}
        <IPayView style={[styles.commonContainerStyle, styles.rearrangeContainerStyle]}>
          <IPayText style={styles.subheadingTextStyle} text="COMMON.RE_ARRANGE_SECTIONS" />
          <IPayPressable onPress={openBottomSheet}>
            <IPayIcon icon={icons.arrange_square_2} size={18} color={colors.primary.primary600} />
          </IPayPressable>
        </IPayView>
      </IPayView>
      <IPayBottomSheet
        heading="TRANSACTION_HISTORY.TRANSACTION_DETAILS"
        onCloseBottomSheet={closeBottomSheet}
        customSnapPoint={snapPoint}
        ref={transactionRef}
        simpleHeader
        simpleBar
        cancelBnt
        bold
      >
        <IPayTransactionHistory transaction={transaction} onCloseBottomSheet={closeBottomSheet} />
      </IPayBottomSheet>
    </>
  );
};

export default IPayLatestList;
