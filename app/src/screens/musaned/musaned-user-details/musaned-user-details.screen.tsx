import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import {
  IPayCaption1Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayScrollView,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayHeader } from '@app/components/molecules';
import IPayLaborerDetailsBanner from '@app/components/organism/ipay-laborer-details-banner/ipay-laborer-details-banner.component';
import IPayLaborerInfo from '@app/components/organism/ipay-laborer-info/ipay-laborer-info.component';
import { IPaySafeAreaView } from '@app/components/templates';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { APIResponseType, buttonVariants } from '@app/utilities';
import { isArabic } from '@app/utilities/constants';
import { useRoute } from '@react-navigation/core';
import icons from '@app/assets/icons';
import IPaySkeletonBuilder from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.component';
import { IPaySkeletonEnums } from '@app/components/molecules/ipay-skeleton-loader/ipay-skeleton-loader.interface';
import IPayTransactionItem from '@app/screens/transaction-history/component/ipay-transaction.component';
import { getTransactions } from '@app/network/services/core/transaction/transactions.service';
import { TransactionItem, TransactionTrxReqType } from '@app/network/services/core/transaction/transaction.interface';

import { bottomSheetShare, getStatusStyles } from '../musaned.utils';
import MusanedUserDetailsRouteProps from './musaned-user-details.interface';
import musanedUserDetailsStyles from './musaned-user-details.style';

const MusanedUserDetails = () => {
  const { colors } = useTheme();
  const styles = musanedUserDetailsStyles(colors);
  const { t } = useTranslation();

  const { walletInfo } = useTypedSelector((state) => state.walletInfoReducer);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [transactionsData, setTransactionsData] = useState<Array<TransactionItem>>([]);

  const { params } = useRoute<MusanedUserDetailsRouteProps>();
  const {
    haveWalletFlag,
    borderNumber,
    poiExperationDate,
    poiNumber,
    payrollAmount,
    occupationAr,
    occupationEn,
    countryCode,
    nationalityAr,
    nationalityEn,
    name,
    lastPaidSalaryDate,
    paymentStatus,
    mobileNumber,
    walletNumber,
  } = params.userInfo;
  const haveWallet = haveWalletFlag;

  const { color, text, backgroundColor } = getStatusStyles(colors, paymentStatus);

  const expirationDate = moment(poiExperationDate).format('DD/M/YYYY');
  const formattedLastPaidSalaryDate = `${lastPaidSalaryDate?.split(':')[1]}/${lastPaidSalaryDate?.split(':')[0]}`;

  const getTransactionsDetails = async () => {
    const apiResponse = await getTransactions({
      walletNumber: walletInfo.walletNumber,
      maxRecords: '5',
      offset: '1',
      mobileNumber,
      targetWallet: walletNumber,
      trxReqType: TransactionTrxReqType.MUSANED,
    });

    if (apiResponse.status.type === APIResponseType.SUCCESS) {
      setTransactionsData(apiResponse.response?.transactions || []);
    }
    setIsLoadingTransactions(false);
  };

  useEffect(() => {
    setIsLoadingTransactions(true);
    getTransactionsDetails();
  }, []);

  const userData = [
    // TODO: check for mobile number in the API response
    { text: 'MUSANED.MOBILE_NUMBER', details: borderNumber.toString() },
    {
      text: 'MUSANED.NATIONALITY',
      details: isArabic ? nationalityAr : nationalityEn,
      key: countryCode,
    },
    { text: 'MUSANED.LABORER_ID', details: poiNumber.toString() },
    { text: 'MUSANED.IQAMA_EXPIRY_DATE', details: expirationDate },
  ];

  const onPayPress = () => {
    navigate(ScreenNames.MUSANED_PAY_SALARY);
  };

  const onInvitePress = () => {
    bottomSheetShare(walletInfo?.userContactInfo?.mobileNumber, t);
  };

  const ListEmptyComponent = useCallback(() => {
    if (isLoadingTransactions) {
      return <IPaySkeletonBuilder variation={IPaySkeletonEnums.TRANSACTION_LIST} isLoading={isLoadingTransactions} />;
    }
    return null;
  }, [isLoadingTransactions]);

  return (
    <IPaySafeAreaView style={styles.container}>
      <IPayHeader testID="musaned-user-details-header" backBtn title="MUSANED.LABORER_DETAILS" applyFlex />

      <IPayLaborerDetailsBanner
        titleText={name}
        amount={payrollAmount}
        testID="musaned-user-details-laborer-details-banner"
        shouldTranslateTitle={false}
        details={isArabic ? occupationAr : occupationEn}
        isDetailsBanner
        withProfileIcon
        profileIconStyle={styles.profileIcon}
      />

      <IPayScrollView style={styles.contentContainer}>
        <IPayView>
          <IPayLaborerInfo userData={userData} />

          {haveWallet && (
            <>
              <IPayView style={styles.paymentInfoContainer}>
                <IPayFootnoteText regular style={styles.containerHeadings} text="COMMON.PERSONAL_INFO" />

                <IPayView style={styles.paymentInfoCard}>
                  <IPayView>
                    <IPayFootnoteText regular text="MUSANED.PAYMENT_STATUS" />
                    <IPayCaption1Text
                      regular
                      text={`${t('MUSANED.LAST_PAYMENT')}: ${formattedLastPaidSalaryDate}`}
                      shouldTranslate={false}
                      color={colors.natural.natural500}
                    />
                  </IPayView>

                  <IPayView style={[styles.statusView, { backgroundColor }]}>
                    <IPaySubHeadlineText regular text={text} color={color} style={styles.statusText} />
                  </IPayView>
                </IPayView>
              </IPayView>

              <IPayView style={styles.headingsContainer}>
                <IPayView style={styles.commonContainerStyle}>
                  <IPayFootnoteText style={styles.footnoteTextStyle} text="CARDS.CARD_TRANSACTIONS_HISTORY" />
                </IPayView>
                <IPayButton
                  onPress={() =>
                    navigate(ScreenNames.MUSANED_HISTORY, {
                      musnaedData: params.musnaedData || [],
                      currentWalletNumber: params.userInfo.walletNumber,
                    })
                  }
                  btnType={buttonVariants.LINK_BUTTON}
                  hasRightIcon
                  rightIcon={<IPayIcon icon={icons.arrow_right_square} color={colors.primary.primary600} size={14} />}
                  medium
                  textColor={colors.primary.primary600}
                  btnText="COMMON.VIEW_ALL"
                  btnStyle={styles.viewAllButtonStyle}
                />
              </IPayView>
              <IPayFlatlist
                testID="transaction"
                data={transactionsData}
                scrollEnabled={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <IPayTransactionItem key={`transaction-${index + 1}`} transaction={item} />
                )}
                ListEmptyComponent={ListEmptyComponent}
              />
            </>
          )}
        </IPayView>
      </IPayScrollView>

      <IPayView style={styles.footer}>
        {haveWallet ? (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnText="MUSANED.PAY"
            large
            onPress={onPayPress}
            btnIconsDisabled
          />
        ) : (
          <IPayButton
            btnType={buttonVariants.PRIMARY}
            btnText="MUSANED.INVITE_NOW"
            btnColor={colors.secondary.secondary100}
            textColor={colors.secondary.secondary800}
            large
            onPress={onInvitePress}
            btnIconsDisabled
            withAlinmaLogo
          />
        )}
      </IPayView>
    </IPaySafeAreaView>
  );
};

export default MusanedUserDetails;
