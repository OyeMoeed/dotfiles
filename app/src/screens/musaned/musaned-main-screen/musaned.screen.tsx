import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Share from 'react-native-share';

import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayPressable, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
import { IPayButton, IPayChip, IPayHeader, IPayNoResult } from '@app/components/molecules';
import IPaySegmentedControls from '@app/components/molecules/ipay-segmented-controls/ipay-segmented-controls.component';
import { IPayMusanedAlinmaUser } from '@app/components/organism';
import { IPaySafeAreaView } from '@app/components/templates';
import ScreenNames from '@app/navigation/screen-names.navigation';
import { RequestItem } from '@app/network/services/request-management/recevied-requests/recevied-requests.interface';
import { useTypedSelector } from '@app/store/store';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants, MusanedStatus } from '@app/utilities';
import { shareOptions } from '@app/utilities/shared.util';
import { isArabic } from '@app/utilities/constants';
import { MusnaedInqueryRecords } from '@app/network/services/musaned';

import IPayPortalBottomSheet from '@app/components/organism/ipay-bottom-sheet/ipay-portal-bottom-sheet.component';
import IPayLaborerDetailsBanner from '@app/components/organism/ipay-laborer-details-banner/ipay-laborer-details-banner.component';
import { navigate } from '@app/navigation/navigation-service.navigation';
import useGetMusanedInquiry from '@app/network/services/musaned/musaned-inquiry/musaned-inquiry.hook';
import musanedStyle from './musaned.styles';

const MusanedScreen: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = musanedStyle(colors);

  const ALINMA_PAY_USERS = 'MUSANED.ALINMA_PAY_USERS';
  const OTHER_USERS = 'MUSANED.OTHER_USERS';
  const MUSANED_USERS_TABS = [ALINMA_PAY_USERS, OTHER_USERS];

  const [selectedTab, setSelectedTab] = useState<string>(MUSANED_USERS_TABS[0]);
  const [requestDetail, setRequestDetail] = useState<MusnaedInqueryRecords | null>(null);
  const [showDetailSheet, setShowDetailSheet] = useState<boolean>(false);
  const refBottomSheet = useRef<any>(null);

  const [alinmaPayData, setAlinmaPayData] = useState<Array<MusnaedInqueryRecords>>([]);
  const [nonAlinmaPayData, setNonAlinmaPayData] = useState<Array<MusnaedInqueryRecords>>([]);

  const dataForPaginatedFLatlist = selectedTab === ALINMA_PAY_USERS ? alinmaPayData : nonAlinmaPayData;
  const walletInfo = useTypedSelector((state) => state.walletInfoReducer.walletInfo);
  const detailsData = isArabic ? requestDetail?.occupationAr : requestDetail?.occupationEn;

  useGetMusanedInquiry({
    payload: {
      walletNumber: walletInfo.walletNumber,
    },
    onSuccess: (apiResponse) => {
      const data = apiResponse?.response?.laborersInfoList || [];

      const alinmaPayUsers = data.filter((value) => value.haveWalletFlag);
      const nonAlinmaPayUsers = data.filter((value) => !value.haveWalletFlag);

      setAlinmaPayData(alinmaPayUsers);
      setNonAlinmaPayData(nonAlinmaPayUsers);
    },
  });

  const handleSelectedTab = (tab: string) => setSelectedTab(tab);

  const openBottomSheet = (item: MusnaedInqueryRecords) => {
    setRequestDetail(item);
    setShowDetailSheet(true);
    refBottomSheet?.current?.present();
  };

  const renderItem = ({ item, index }: { item: MusnaedInqueryRecords; index: number }) => {
    const { poiExperationDate, name, paymentStatus, payrollAmount, occupationEn, occupationAr } = item;
    return (
      <IPayView style={styles.listView}>
        {selectedTab === ALINMA_PAY_USERS ? (
          <IPayMusanedAlinmaUser
            date={poiExperationDate}
            titleText={name}
            status={paymentStatus || MusanedStatus.UNPAIED}
            amount={payrollAmount}
            onPress={() => openBottomSheet(item)}
            shouldTranslateTitle={false}
            details={isArabic ? occupationAr : occupationEn}
          />
        ) : (
          <>
            {index === 0 ? (
              <IPayChip
                fullWidth
                containerStyle={styles.chipContainer}
                textValue="MUSANED.NOT_ALINMA_USERS_MESSAGE"
                headingStyles={styles.chipHeading}
              />
            ) : null}
            <IPayLaborerDetailsBanner
              titleText={name}
              amount={payrollAmount}
              onPress={() => openBottomSheet(item)}
              details={isArabic ? occupationAr : occupationEn}
              shouldTranslateTitle={false}
              withArrow
            />
          </>
        )}
      </IPayView>
    );
  };

  const noResult = () => (
    <IPayView style={styles.noResult}>
      <IPayNoResult
        textColor={colors.primary.primary800}
        iconColor={colors.primary.primary800}
        message="MUSANED.NO_LABORERS"
        showIcon
        containerStyle={styles.noResultContent}
        iconSize={40}
        icon={icons.people}
      />
    </IPayView>
  );

  const onPressHistory = () => {
    navigate(ScreenNames.MUSANED_HISTORY);
  };

  const getShareableMessage = t('MUSANED.INVITE_LABORER');

  const bottomSheetShare = async () => {
    const otherOptions = {
      subject: 'Wa',
      message: getShareableMessage,
      title: t('MUSANED.HEADER'),
      social: Share.Social.WHATSAPP,
      whatsAppNumber: walletInfo?.userContactInfo?.mobileNumber,
    };

    Share.open(shareOptions(getShareableMessage, otherOptions))
      .then(() => {})
      .catch(() => {});
  };

  const onPressPrimary = () => {
    refBottomSheet.current?.close?.();

    if (selectedTab === ALINMA_PAY_USERS) {
      navigate(ScreenNames.MUSANED_PAY_SALARY, {
        ...requestDetail,
        type: selectedTab,
      });
    } else {
      bottomSheetShare();
    }
  };

  const onPressDetails = () => {
    refBottomSheet.current?.close?.();

    navigate(ScreenNames.MUSANED_USER_DETAILS, { userInfo: requestDetail });
  };

  const onCloseBottomSheet = () => {
    refBottomSheet?.current?.close();
  };

  return (
    <>
      <IPaySafeAreaView style={styles.container}>
        <IPayHeader
          testID="request-money-header"
          backBtn
          title="MUSANED.HEADER"
          applyFlex
          rightComponent={
            <IPayPressable onPress={onPressHistory}>
              <IPayView style={styles.headerRightContent}>
                <IPayIcon icon={icons.clock_1} size={20} color={colors.primary.primary500} />
                <IPaySubHeadlineText regular color={colors.primary.primary500} text="COMMON.HISTORY" />
              </IPayView>
            </IPayPressable>
          }
        />
        <IPaySegmentedControls
          onSelect={handleSelectedTab}
          selectedTab={selectedTab}
          tabs={MUSANED_USERS_TABS}
          customStyles={styles.tabs}
          unselectedTabStyle={styles.unselectedTab}
        />
        <IPayView style={styles.listContainer}>
          <IPayFlatlist
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: RequestItem, index: number) => `${item?.targetFullName}-${index}`}
            renderItem={renderItem}
            data={dataForPaginatedFLatlist}
            ListEmptyComponent={noResult}
          />
        </IPayView>
      </IPaySafeAreaView>
      <IPayPortalBottomSheet
        simpleBar
        heading="MUSANED.SELECT"
        ref={refBottomSheet}
        isVisible={showDetailSheet}
        cancelBnt
        onCloseBottomSheet={onCloseBottomSheet}
        customSnapPoint={['43%']}
      >
        {selectedTab === ALINMA_PAY_USERS ? (
          <IPayView style={styles.secondButton}>
            <IPayMusanedAlinmaUser
              date={requestDetail?.poiExperationDate || ''}
              titleText={requestDetail?.name || ''}
              status={requestDetail?.paymentStatus || MusanedStatus.UNPAIED}
              amount={requestDetail?.payrollAmount || ''}
              details={detailsData || ''}
              withArrow={false}
            />
          </IPayView>
        ) : (
          <IPayView style={styles.secondButton}>
            <IPayLaborerDetailsBanner
              titleText={requestDetail?.name || ''}
              amount={requestDetail?.payrollAmount}
              details={detailsData || ''}
            />
          </IPayView>
        )}
        <IPayButton
          btnType={buttonVariants.PRIMARY}
          btnText={selectedTab === ALINMA_PAY_USERS ? 'MUSANED.PAY_SALARY' : 'MUSANED.INVITE_NOW'}
          rightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.natural.natural0} />}
          btnStyle={styles.primaryButton}
          large
          onPress={onPressPrimary}
        />
        <IPayButton
          btnType={buttonVariants.OUTLINED}
          btnText="MUSANED.VIEW_DETAILS"
          rightIcon={<IPayIcon icon={icons.rightArrow} size={20} color={colors.primary.primary500} />}
          btnStyle={styles.secondButton}
          onPress={onPressDetails}
          large
        />
      </IPayPortalBottomSheet>
    </>
  );
};

export default MusanedScreen;
